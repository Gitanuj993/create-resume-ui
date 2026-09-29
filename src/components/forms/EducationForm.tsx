import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { ResumeData, EducationEntry } from '../../types/resume';

interface EducationFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const educations = data.education || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(educations.length > 0 ? 0 : null);

  const handleAddEducation = () => {
    const newEdu: EducationEntry = {
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      grade: '',
    };
    const updated = [...educations, newEdu];
    onChange({ education: updated });
    setExpandedIndex(updated.length - 1);
  };

  const handleUpdateEducation = (index: number, fields: Partial<EducationEntry>) => {
    const updated = educations.map((item, idx) => {
      if (idx === index) {
        return { ...item, ...fields };
      }
      return item;
    });
    onChange({ education: updated });
  };

  const handleDeleteEducation = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = educations.filter((_, idx) => idx !== index);
    onChange({ education: updated });
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
            Education & Academics
          </h2>
          <p className="text-sm text-[#666666] mt-1">
            List your college, university degrees, or significant academic credentials.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddEducation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-[#D4D4D4] bg-[#FAFAFA] mb-6">
          <GraduationCap className="w-8 h-8 text-[#8A8A8A] mx-auto mb-2.5" />
          <h3 className="text-sm font-semibold text-[#202020]">No education listed yet</h3>
          <p className="text-xs text-[#666666] max-w-sm mx-auto mt-1 mb-4">
            Degrees and university credentials are required on standard resumes.
          </p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#202020] bg-white border border-[#D4D4D4] hover:bg-[#F5F5F5] rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {educations.map((edu, index) => {
            const isExpanded = expandedIndex === index;
            const degreeField = [edu.degree, edu.field_of_study].filter(Boolean).join(' in ') || 'Degree';
            const inst = edu.institution || 'Institution';
            const dates = [edu.start_date, edu.end_date].filter(Boolean).join(' - ');

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
                        {degreeField}
                      </span>
                      <span className="text-[#8A8A8A]">·</span>
                      <span className="text-xs font-medium text-[#666666] truncate">
                        {inst}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8A8A8A] mt-0.5 flex items-center gap-2">
                      {dates && <span>{dates}</span>}
                      {edu.grade && (
                        <>
                          <span>·</span>
                          <span>{edu.grade}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteEducation(index, e)}
                      className="p-1.5 text-[#8A8A8A] hover:text-red-600 hover:bg-white rounded transition-colors"
                      title="Delete education entry"
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
                    {/* Institution */}
                    <div>
                      <label className="block text-xs font-semibold text-[#202020] mb-1">
                        College / University / School <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducation(index, { institution: e.target.value })}
                        placeholder="e.g. Shri Dadaji Institute of Technology and Science"
                        className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Degree */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Degree Level <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(index, { degree: e.target.value })}
                          placeholder="e.g. B.Tech, M.S., B.S."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* Field of Study */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Field of Study / Major
                        </label>
                        <input
                          type="text"
                          value={edu.field_of_study}
                          onChange={(e) => handleUpdateEducation(index, { field_of_study: e.target.value })}
                          placeholder="e.g. Computer Science and Engineering"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Start Date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Start Year
                        </label>
                        <input
                          type="text"
                          value={edu.start_date}
                          onChange={(e) => handleUpdateEducation(index, { start_date: e.target.value })}
                          placeholder="e.g. 2023"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          End Year (or Expected)
                        </label>
                        <input
                          type="text"
                          value={edu.end_date}
                          onChange={(e) => handleUpdateEducation(index, { end_date: e.target.value })}
                          placeholder="e.g. 2027"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* Grade */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Grade / CGPA
                        </label>
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => handleUpdateEducation(index, { grade: e.target.value })}
                          placeholder="e.g. 8.0 CGPA"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
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
          <span>Continue to Arrange Sections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
