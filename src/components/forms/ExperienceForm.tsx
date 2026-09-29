import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  MapPin,
  ListPlus,
  X
} from 'lucide-react';
import { ResumeData, ExperienceEntry } from '../../types/resume';

interface ExperienceFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const experiences = data.experience || [];
  // Track open/collapsed state of cards. Default to the newest or first one open.
  const [expandedIndex, setExpandedIndex] = useState<number | null>(experiences.length > 0 ? 0 : null);

  const handleAddExperience = () => {
    const newEntry: ExperienceEntry = {
      company: '',
      role: '',
      location: '',
      start_date: '',
      end_date: '',
      description: [''],
    };
    const updated = [...experiences, newEntry];
    onChange({ experience: updated });
    setExpandedIndex(updated.length - 1);
  };

  const handleUpdateExperience = (index: number, fields: Partial<ExperienceEntry>) => {
    const updated = experiences.map((item, idx) => {
      if (idx === index) {
        return { ...item, ...fields };
      }
      return item;
    });
    onChange({ experience: updated });
  };

  const handleDeleteExperience = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = experiences.filter((_, idx) => idx !== index);
    onChange({ experience: updated });
    if (expandedIndex === index) {
      setExpandedIndex(updated.length > 0 ? 0 : null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  // Bullet point management
  const handleAddBullet = (expIndex: number) => {
    const currentBullets = experiences[expIndex].description || [];
    handleUpdateExperience(expIndex, {
      description: [...currentBullets, ''],
    });
  };

  const handleUpdateBullet = (expIndex: number, bulletIndex: number, val: string) => {
    const currentBullets = [...(experiences[expIndex].description || [])];
    currentBullets[bulletIndex] = val;
    handleUpdateExperience(expIndex, { description: currentBullets });
  };

  const handleRemoveBullet = (expIndex: number, bulletIndex: number) => {
    const currentBullets = (experiences[expIndex].description || []).filter((_, idx) => idx !== bulletIndex);
    handleUpdateExperience(expIndex, { description: currentBullets });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
            Work Experience
          </h2>
          <p className="text-sm text-[#666666] mt-1">
            Add full-time positions, internships, or relevant freelance roles.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-[#D4D4D4] bg-[#FAFAFA] mb-6">
          <Briefcase className="w-8 h-8 text-[#8A8A8A] mx-auto mb-2.5" />
          <h3 className="text-sm font-semibold text-[#202020]">No experience added yet</h3>
          <p className="text-xs text-[#666666] max-w-sm mx-auto mt-1 mb-4">
            If you are a student without formal experience, you can skip this step or add open-source/internship roles.
          </p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#202020] bg-white border border-[#D4D4D4] hover:bg-[#F5F5F5] rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Role</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            const title = exp.role || 'Untitled Role';
            const company = exp.company || 'Company';
            const dates = [exp.start_date, exp.end_date].filter(Boolean).join(' - ') || 'Dates';

            return (
              <div 
                key={index}
                className="border border-[#D4D4D4] rounded-xl overflow-hidden transition-all bg-white shadow-2xs"
              >
                {/* Collapsible Header */}
                <div 
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="p-4 bg-[#FBFBFB] hover:bg-[#F5F5F5] flex items-center justify-between cursor-pointer border-b border-transparent transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#202020] truncate">
                        {title}
                      </span>
                      <span className="text-[#8A8A8A]">·</span>
                      <span className="text-xs font-medium text-[#666666] truncate">
                        {company}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8A8A8A] mt-0.5 flex items-center gap-2">
                      <span>{dates}</span>
                      {exp.location && (
                        <>
                          <span>·</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteExperience(index, e)}
                      className="p-1.5 text-[#8A8A8A] hover:text-red-600 hover:bg-white rounded transition-colors"
                      title="Delete experience entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="text-[#666666]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-[#E5E5E5] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Role */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Job Role / Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleUpdateExperience(index, { role: e.target.value })}
                          placeholder="e.g. Backend Intern"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Company / Organization <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(index, { company: e.target.value })}
                          placeholder="e.g. Company A"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Location */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleUpdateExperience(index, { location: e.target.value })}
                          placeholder="e.g. Remote or Bengaluru"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* Start Date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={exp.start_date}
                          onChange={(e) => handleUpdateExperience(index, { start_date: e.target.value })}
                          placeholder="e.g. June 2026"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          value={exp.end_date}
                          onChange={(e) => handleUpdateExperience(index, { end_date: e.target.value })}
                          placeholder="e.g. August 2026 or Present"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Bullet Points / Description */}
                    <div className="pt-2 border-t border-[#EDEDED]">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-[#202020]">
                          Key Responsibilities & Achievements (Bullet Points)
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(index)}
                          className="text-[11px] font-medium text-[#202020] hover:text-[#000000] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(exp.description || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <span className="text-xs text-[#8A8A8A] select-none shrink-0">•</span>
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleUpdateBullet(index, bIdx, e.target.value)}
                              placeholder="e.g. Built REST APIs using FastAPI and integrated PostgreSQL."
                              className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-md text-[#202020] placeholder-[#8A8A8A] outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBullet(index, bIdx)}
                              className="p-1 text-[#8A8A8A] hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete bullet point"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
          <span>Continue to Projects</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
