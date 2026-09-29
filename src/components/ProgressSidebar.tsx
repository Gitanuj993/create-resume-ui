import React from 'react';
import { 
  Check, 
  User, 
  Globe, 
  FileText, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  Award, 
  GraduationCap, 
  ArrowUpDown, 
  FileCheck2 
} from 'lucide-react';
import { StepId, WIZARD_STEPS, ResumeData } from '../types/resume';

interface ProgressSidebarProps {
  currentStep: StepId;
  onSelectStep: (step: StepId) => void;
  resumeData: ResumeData;
}

const STEP_ICONS: Record<StepId, React.ComponentType<{ className?: string }>> = {
  personal: User,
  social: Globe,
  summary: FileText,
  skills: Cpu,
  experience: Briefcase,
  projects: FolderGit2,
  achievements: Award,
  education: GraduationCap,
  arrange: ArrowUpDown,
  review: FileCheck2,
};

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  currentStep,
  onSelectStep,
  resumeData,
}) => {
  // Determine completion of each step
  const isStepComplete = (stepId: StepId): boolean => {
    switch (stepId) {
      case 'personal':
        return Boolean(
          resumeData.full_name?.trim() && 
          resumeData.contact?.email?.trim() && 
          resumeData.contact?.phone?.trim()
        );
      case 'social':
        return Boolean(
          resumeData.social_links?.linkedin?.trim() || 
          resumeData.social_links?.github?.trim() || 
          resumeData.social_links?.portfolio?.trim()
        );
      case 'summary':
        return Boolean(resumeData.summary?.trim());
      case 'skills': {
        const { languages = [], frameworks = [], databases = [], tools = [] } = resumeData.skills || {};
        return (languages.length + frameworks.length + databases.length + tools.length) > 0;
      }
      case 'experience':
        return Boolean(resumeData.experience && resumeData.experience.length > 0);
      case 'projects':
        return Boolean(resumeData.projects && resumeData.projects.length > 0);
      case 'achievements':
        return Boolean(resumeData.achievements && resumeData.achievements.length > 0);
      case 'education':
        return Boolean(resumeData.education && resumeData.education.length > 0);
      case 'arrange':
        return Boolean(resumeData.section_order && resumeData.section_order.length > 0);
      case 'review':
        return isStepComplete('personal');
      default:
        return false;
    }
  };

  const completedCount = WIZARD_STEPS.filter(s => isStepComplete(s.id)).length;
  const progressPercent = Math.round((completedCount / WIZARD_STEPS.length) * 100);

  return (
    <aside className="w-full lg:w-64 xl:w-72 bg-white border-b lg:border-b-0 lg:border-r border-[#D4D4D4] flex flex-col shrink-0">
      {/* Progress header */}
      <div className="p-4 sm:p-5 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between text-xs font-semibold text-[#202020] mb-2">
          <span>Resume Progress</span>
          <span className="text-[#666666] font-mono tabular-nums">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#2B2B2B] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-[11px] text-[#8A8A8A]">
          <span>{completedCount} of {WIZARD_STEPS.length} sections</span>
          <span>{progressPercent === 100 ? 'Ready to export' : 'In progress'}</span>
        </div>
      </div>

      {/* Steps List */}
      <nav className="p-2 sm:p-3 space-y-1 overflow-x-auto lg:overflow-y-auto flex lg:flex-col gap-1 lg:gap-0">
        {WIZARD_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[step.id] || FileText;
          const isActive = currentStep === step.id;
          const completed = isStepComplete(step.id);

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between group cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                isActive
                  ? 'bg-[#2B2B2B] text-white shadow-xs font-semibold'
                  : completed
                  ? 'text-[#202020] hover:bg-[#F5F5F5]'
                  : 'text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Step number or completed check icon */}
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : completed
                      ? 'bg-[#E5E5E5] text-[#202020]'
                      : 'bg-[#F0F0F0] text-[#8A8A8A]'
                  }`}
                >
                  {completed ? (
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="truncate flex items-center gap-1.5">
                    <span>{step.label}</span>
                    {step.isOptional && (
                      <span className={`text-[10px] ${isActive ? 'text-white/60' : 'text-[#8A8A8A]'}`}>
                        (Opt)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status bullet or arrow */}
              <div className="shrink-0 ml-2 hidden lg:block">
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom info footer */}
      <div className="p-4 border-t border-[#E5E5E5] mt-auto hidden lg:block text-[11px] text-[#8A8A8A] leading-relaxed">
        <p>Auto-saving to browser storage.</p>
        <p className="mt-1 text-[#666666]">Target: <span className="font-mono text-[#202020]">POST /resume/generate</span></p>
      </div>
    </aside>
  );
};
