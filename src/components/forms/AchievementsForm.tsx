import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight,
  Award
} from 'lucide-react';
import { ResumeData, AchievementEntry } from '../../types/resume';

interface AchievementsFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const achievements = data.achievements || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(achievements.length > 0 ? 0 : null);

  const handleAddAchievement = () => {
    const newAch: AchievementEntry = {
      title: '',
      description: '',
      date: '',
    };
    const updated = [...achievements, newAch];
    onChange({ achievements: updated });
    setExpandedIndex(updated.length - 1);
  };

  const handleUpdateAchievement = (index: number, fields: Partial<AchievementEntry>) => {
    const updated = achievements.map((item, idx) => {
      if (idx === index) {
        return { ...item, ...fields };
      }
      return item;
    });
    onChange({ achievements: updated });
  };

  const handleDeleteAchievement = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = achievements.filter((_, idx) => idx !== index);
    onChange({ achievements: updated });
    if (expandedIndex === index) {
      setExpandedIndex(updated.length > 0 ? 0 : null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
            Honors & Achievements
          </h2>
          <p className="text-sm text-[#666666] mt-1">
            Include hackathon wins, academic scholarships, competitive programming, or professional awards.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddAchievement}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-[#D4D4D4] bg-[#FAFAFA] mb-6">
          <Award className="w-8 h-8 text-[#8A8A8A] mx-auto mb-2.5" />
          <h3 className="text-sm font-semibold text-[#202020]">No achievements added yet</h3>
          <p className="text-xs text-[#666666] max-w-sm mx-auto mt-1 mb-4">
            This section is optional. You can add one now or continue directly to education.
          </p>
          <button
            type="button"
            onClick={handleAddAchievement}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#202020] bg-white border border-[#D4D4D4] hover:bg-[#F5F5F5] rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Achievement</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {achievements.map((ach, index) => {
            const isExpanded = expandedIndex === index;
            const title = ach.title || 'Untitled Achievement';

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
                      {ach.date && (
                        <>
                          <span className="text-[#8A8A8A]">·</span>
                          <span className="text-xs text-[#666666]">{ach.date}</span>
                        </>
                      )}
                    </div>
                    {ach.description && (
                      <div className="text-[11px] text-[#8A8A8A] mt-0.5 truncate">
                        {ach.description}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteAchievement(index, e)}
                      className="p-1.5 text-[#8A8A8A] hover:text-red-600 hover:bg-white rounded transition-colors"
                      title="Delete achievement"
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Title */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Honor / Achievement Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={ach.title}
                          onChange={(e) => handleUpdateAchievement(index, { title: e.target.value })}
                          placeholder="e.g. Hackathon Finalist"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Date / Year
                        </label>
                        <input
                          type="text"
                          value={ach.date}
                          onChange={(e) => handleUpdateAchievement(index, { date: e.target.value })}
                          placeholder="e.g. 2026 or March 2026"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-[#202020] mb-1">
                        Details & Context
                      </label>
                      <textarea
                        rows={2}
                        value={ach.description}
                        onChange={(e) => handleUpdateAchievement(index, { description: e.target.value })}
                        placeholder="e.g. Reached the final round of a national hackathon among 2,400+ participants."
                        className="w-full p-3 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden leading-relaxed"
                      />
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
          <span>Continue to Education</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
