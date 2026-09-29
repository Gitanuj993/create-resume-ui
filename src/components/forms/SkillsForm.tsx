import React, { useState } from 'react';
import { Plus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { ResumeData, SkillCategories } from '../../types/resume';

interface SkillsFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

type SkillKey = keyof SkillCategories;

interface CategoryConfig {
  key: SkillKey;
  label: string;
  placeholder: string;
  suggestions: string[];
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'languages',
    label: 'Programming Languages',
    placeholder: 'e.g. Python, C++, TypeScript',
    suggestions: ['Python', 'C++', 'Java', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'SQL'],
  },
  {
    key: 'frameworks',
    label: 'Frameworks & Libraries',
    placeholder: 'e.g. FastAPI, React, Node.js',
    suggestions: ['FastAPI', 'React', 'Node.js', 'Express', 'Django', 'Next.js', 'Tailwind CSS', 'PyTorch'],
  },
  {
    key: 'databases',
    label: 'Databases & Storage',
    placeholder: 'e.g. PostgreSQL, Redis, MongoDB',
    suggestions: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL', 'SQLite', 'Elasticsearch', 'Supabase'],
  },
  {
    key: 'tools',
    label: 'Tools & Technologies',
    placeholder: 'e.g. Git, Docker, Linux',
    suggestions: ['Git', 'Docker', 'Kubernetes', 'Linux', 'AWS', 'GitHub Actions', 'Postman', 'Figma'],
  },
];

export const SkillsForm: React.FC<SkillsFormProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const [inputs, setInputs] = useState<Record<SkillKey, string>>({
    languages: '',
    frameworks: '',
    databases: '',
    tools: '',
  });

  const handleAddSkill = (catKey: SkillKey, skillToAdd?: string) => {
    const rawVal = skillToAdd !== undefined ? skillToAdd : inputs[catKey];
    const trimmed = rawVal.trim();
    if (!trimmed) return;

    const currentList = data.skills?.[catKey] || [];
    if (!currentList.includes(trimmed)) {
      onChange({
        skills: {
          ...data.skills,
          [catKey]: [...currentList, trimmed],
        },
      });
    }

    if (skillToAdd === undefined) {
      setInputs((prev) => ({ ...prev, [catKey]: '' }));
    }
  };

  const handleRemoveSkill = (catKey: SkillKey, indexToRemove: number) => {
    const currentList = data.skills?.[catKey] || [];
    const updated = currentList.filter((_, idx) => idx !== indexToRemove);
    onChange({
      skills: {
        ...data.skills,
        [catKey]: updated,
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, catKey: SkillKey) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(catKey);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
          Categorized Skills
        </h2>
        <p className="text-sm text-[#666666] mt-1">
          Group your technical capabilities into standard resume categories. Press Enter or click + to add skills.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {CATEGORIES.map((cat) => {
          const skillsList = data.skills?.[cat.key] || [];
          const inputValue = inputs[cat.key];

          return (
            <div key={cat.key} className="p-4 rounded-lg bg-[#FBFBFB] border border-[#E5E5E5] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#202020] uppercase tracking-wide">
                  {cat.label}
                </label>
                <span className="text-[11px] text-[#8A8A8A] font-mono tabular-nums">
                  {skillsList.length} added
                </span>
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputs({ ...inputs, [cat.key]: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, cat.key)}
                  placeholder={cat.placeholder}
                  className="flex-1 px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(cat.key)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#202020] bg-[#E5E5E5] hover:bg-[#D4D4D4] rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Current Tag Chips */}
              {skillsList.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skillsList.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#202020] bg-white border border-[#D4D4D4] rounded-md shadow-2xs group"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(cat.key, idx)}
                        className="text-[#8A8A8A] hover:text-red-600 transition-colors cursor-pointer"
                        title={`Remove ${skill}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-[11px] text-[#8A8A8A] italic">No skills added yet in this category.</div>
              )}

              {/* Quick suggestions */}
              <div className="pt-2 border-t border-[#EDEDED] flex flex-wrap items-center gap-1 text-[11px] text-[#666666]">
                <span className="text-[#8A8A8A] mr-1">Suggestions:</span>
                {cat.suggestions
                  .filter((s) => !skillsList.includes(s))
                  .slice(0, 5)
                  .map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleAddSkill(cat.key, s)}
                      className="px-2 py-0.5 rounded bg-white hover:bg-[#E5E5E5] border border-[#E0E0E0] text-[#666666] hover:text-[#202020] transition-colors cursor-pointer"
                    >
                      + {s}
                    </button>
                  ))}
              </div>
            </div>
          );
        })}

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
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <span>Continue to Experience</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
