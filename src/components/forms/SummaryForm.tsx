import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface SummaryFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const charCount = (data.summary || '').length;
  const wordCount = (data.summary || '').trim() ? (data.summary || '').trim().split(/\s+/).length : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
          Professional Summary
        </h2>
        <p className="text-sm text-[#666666] mt-1">
          Write a concise 2–4 sentence summary highlighting your core expertise, key achievements, and target roles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#202020]">
              Summary Statement <span className="text-[#8A8A8A] font-normal">(Optional but recommended)</span>
            </label>
            <span className="text-[11px] text-[#8A8A8A] font-mono tabular-nums">
              {wordCount} words · {charCount} chars
            </span>
          </div>
          
          <textarea
            rows={5}
            value={data.summary || ''}
            onChange={(e) => onChange({ summary: e.target.value })}
            placeholder="e.g. Computer Science graduate and software engineer specializing in backend infrastructure, distributed systems, and RESTful API architecture. Proven track record in high-performance database design with PostgreSQL and FastAPI."
            className="w-full p-3.5 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden leading-relaxed resize-y min-h-[140px] transition-all"
          />
        </div>

        {/* Guidance tip box in silver/grey style */}
        <div className="p-3.5 rounded-lg bg-[#F5F5F5] border border-[#E5E5E5] flex items-start gap-2.5 text-xs text-[#666666]">
          <Lightbulb className="w-4 h-4 text-[#202020] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#202020]">Pro Tip:</span> Lead with your role title and years of experience or academic background. Highlight 1–2 quantifiable impacts or core tech proficiencies.
          </div>
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
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <span>Continue to Skills</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
