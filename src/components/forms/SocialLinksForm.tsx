import React from 'react';
import { Linkedin, Github, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface SocialLinksFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const handleSocialChange = (field: keyof ResumeData['social_links'], value: string) => {
    onChange({
      social_links: {
        ...data.social_links,
        [field]: value,
      },
    });
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
          Social & Portfolio Links
        </h2>
        <p className="text-sm text-[#666666] mt-1">
          Add your professional profiles. All fields here are optional and will be formatted in the resume header.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-[#202020] mb-1.5">
            LinkedIn URL <span className="text-[#8A8A8A] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8A8A]">
              <Linkedin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.social_links?.linkedin || ''}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full pl-9.5 pr-3 py-2.5 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-[#202020] mb-1.5">
            GitHub URL <span className="text-[#8A8A8A] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8A8A]">
              <Github className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.social_links?.github || ''}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full pl-9.5 pr-3 py-2.5 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-xs font-semibold text-[#202020] mb-1.5">
            Personal Website or Portfolio <span className="text-[#8A8A8A] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8A8A]">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.social_links?.portfolio || ''}
              onChange={(e) => handleSocialChange('portfolio', e.target.value)}
              placeholder="https://yourname.me"
              className="w-full pl-9.5 pr-3 py-2.5 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
            />
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
            <span>Continue to Summary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
