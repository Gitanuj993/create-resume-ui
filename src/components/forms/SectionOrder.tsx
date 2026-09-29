import React, { useState } from 'react';
import { 
  GripVertical, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw,
  Lock,
  CheckCircle2,
  FileText,
  Cpu,
  Briefcase,
  FolderGit2,
  Award,
  GraduationCap
} from 'lucide-react';
import { ResumeData, ReorderableSection } from '../../types/resume';

interface SectionOrderProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

interface SectionMeta {
  key: ReorderableSection;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTION_METAS: Record<ReorderableSection, SectionMeta> = {
  summary: {
    key: 'summary',
    title: 'Professional Summary',
    subtitle: 'Career objective, technical identity, and target focus',
    icon: FileText,
  },
  skills: {
    key: 'skills',
    title: 'Technical Skills',
    subtitle: 'Languages, frameworks, databases, and tooling capabilities',
    icon: Cpu,
  },
  experience: {
    key: 'experience',
    title: 'Work Experience',
    subtitle: 'Professional history, company roles, and bullet achievements',
    icon: Briefcase,
  },
  projects: {
    key: 'projects',
    title: 'Featured Projects',
    subtitle: 'Key technical projects, repos, and stack demonstrations',
    icon: FolderGit2,
  },
  achievements: {
    key: 'achievements',
    title: 'Honors & Achievements',
    subtitle: 'Hackathon finalist ranks, awards, and collegiate distinctions',
    icon: Award,
  },
  education: {
    key: 'education',
    title: 'Education & Academics',
    subtitle: 'Degrees, institutions, GPA/CGPA, and dates',
    icon: GraduationCap,
  },
};

const DEFAULT_ORDER: ReorderableSection[] = [
  'summary',
  'skills',
  'experience',
  'projects',
  'achievements',
  'education',
];

const STUDENT_ORDER: ReorderableSection[] = [
  'summary',
  'education',
  'skills',
  'projects',
  'experience',
  'achievements',
];

export const SectionOrder: React.FC<SectionOrderProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const currentOrder = data.section_order && data.section_order.length === 6 
    ? data.section_order 
    : DEFAULT_ORDER;

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

    const updated = [...currentOrder];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange({ section_order: updated });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...currentOrder];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    onChange({ section_order: updated });
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const setPresetOrder = (order: ReorderableSection[]) => {
    onChange({ section_order: order });
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
            Arrange Resume Sections
          </h2>
          <p className="text-sm text-[#666666] mt-1">
            Drag or use arrows to customize the section sequence for your resume.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPresetOrder(DEFAULT_ORDER)}
            className="px-2.5 py-1.5 text-xs font-medium text-[#666666] hover:text-[#202020] bg-[#F5F5F5] hover:bg-[#E5E5E5] border border-[#D4D4D4] rounded-md transition-colors cursor-pointer"
            title="Industry Standard (Skills & Experience first)"
          >
            Standard Order
          </button>
          <button
            type="button"
            onClick={() => setPresetOrder(STUDENT_ORDER)}
            className="px-2.5 py-1.5 text-xs font-medium text-[#666666] hover:text-[#202020] bg-[#F5F5F5] hover:bg-[#E5E5E5] border border-[#D4D4D4] rounded-md transition-colors cursor-pointer"
            title="Student Preset (Education & Projects prioritized)"
          >
            Student Preset
          </button>
        </div>
      </div>

      {/* Fixed Top Zone Explanation */}
      <div className="mb-4 p-3 rounded-lg bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[#8A8A8A]" />
          <span><strong>Header Information</strong> (Full Name, Contact, Social Links) is permanently anchored at the top.</span>
        </div>
        <span className="text-[11px] text-[#8A8A8A] font-mono">Fixed (Top)</span>
      </div>

      {/* Draggable Sections List */}
      <div className="space-y-2.5 mb-6">
        {currentOrder.map((sectionKey, index) => {
          const meta = SECTION_METAS[sectionKey];
          if (!meta) return null;
          const Icon = meta.icon;
          const isDragging = draggedIndex === index;

          return (
            <div
              key={sectionKey}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 select-none ${
                isDragging
                  ? 'border-[#2B2B2B] bg-[#F5F5F5] opacity-60 shadow-md'
                  : 'border-[#D4D4D4] bg-white hover:border-[#8A8A8A] shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Drag Handle */}
                <div 
                  className="cursor-grab active:cursor-grabbing text-[#8A8A8A] hover:text-[#202020] p-1 -ml-1 rounded hover:bg-[#F5F5F5] transition-colors"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Index badge */}
                <div className="w-6 h-6 rounded-md bg-[#F0F0F0] text-[#202020] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#202020] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#202020] truncate">
                    {meta.title}
                  </h4>
                  <p className="text-[11px] text-[#666666] truncate hidden sm:block">
                    {meta.subtitle}
                  </p>
                </div>
              </div>

              {/* Up / Down Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  title="Move section up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === currentOrder.length - 1}
                  className="p-1.5 rounded text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  title="Move section down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5] border border-[#D4D4D4] rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <span>Continue to Review & Generate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
