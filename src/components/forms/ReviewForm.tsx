import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Settings2, 
  Eye, 
  FileCheck2,
  ExternalLink,
  SlidersHorizontal,
  Server
} from 'lucide-react';
import { ResumeData, StepId } from '../../types/resume';
import { JsonPreview } from '../JsonPreview';

interface ReviewFormProps {
  data: ResumeData;
  onPrev: () => void;
  onNavigateToStep: (step: StepId) => void;
  onGeneratePdf: (apiUrl?: string) => Promise<void>;
  isGenerating: boolean;
  onTogglePreview: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  summary: 'Professional Summary',
  skills: 'Technical Skills',
  experience: 'Work Experience',
  projects: 'Featured Projects',
  achievements: 'Honors & Achievements',
  education: 'Education & Academics',
};

export const ReviewForm: React.FC<ReviewFormProps> = ({
  data,
  onPrev,
  onNavigateToStep,
  onGeneratePdf,
  isGenerating,
  onTogglePreview,
}) => {
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [customApiUrl, setCustomApiUrl] = useState('/resume/generate');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);

  const isNameFilled = Boolean(data.full_name?.trim());
  const isEmailFilled = Boolean(data.contact?.email?.trim());
  const isPhoneFilled = Boolean(data.contact?.phone?.trim());

  const skillCount = 
    (data.skills?.languages?.length || 0) +
    (data.skills?.frameworks?.length || 0) +
    (data.skills?.databases?.length || 0) +
    (data.skills?.tools?.length || 0);

  const handleGenerate = async () => {
    setGenerationError(null);
    setGenerationSuccess(null);
    try {
      await onGeneratePdf(customApiUrl);
      setGenerationSuccess('Resume generated and downloaded successfully!');
    } catch (err: any) {
      setGenerationError(err.message || 'Failed to generate PDF resume.');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1">
          <FileCheck2 className="w-4 h-4 text-[#202020]" />
          <span>Final Verification</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
          Review & Generate Resume
        </h2>
        <p className="text-sm text-[#666666] mt-1">
          Verify your resume details and section hierarchy before generating the final ATS-compliant PDF document.
        </p>
      </div>

      {/* Generation Feedback Banners */}
      {generationError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Generation Error: </span>
            {generationError}
          </div>
        </div>
      )}

      {generationSuccess && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Success: </span>
            {generationSuccess}
          </div>
        </div>
      )}

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Candidate Information Overview */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#202020]">
              Candidate Header Info
            </h3>
            <button
              type="button"
              onClick={() => onNavigateToStep('personal')}
              className="text-xs text-[#666666] hover:text-[#202020] underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-[#202020]">
            <div>
              <span className="text-[#8A8A8A] w-20 inline-block">Name:</span>
              <strong className="text-sm text-[#202020]">{data.full_name || 'Not provided'}</strong>
            </div>
            <div>
              <span className="text-[#8A8A8A] w-20 inline-block">Email:</span>
              <span>{data.contact?.email || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-[#8A8A8A] w-20 inline-block">Phone:</span>
              <span>{data.contact?.phone || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-[#8A8A8A] w-20 inline-block">Location:</span>
              <span>{data.contact?.location || 'Not provided'}</span>
            </div>
          </div>

          {/* Social Links Sub-line */}
          <div className="pt-2.5 border-t border-[#E5E5E5] text-xs text-[#666666] flex flex-wrap gap-2">
            {data.social_links?.linkedin && (
              <span className="font-medium text-[#202020]">LinkedIn ✓</span>
            )}
            {data.social_links?.github && (
              <span className="font-medium text-[#202020]">GitHub ✓</span>
            )}
            {data.social_links?.portfolio && (
              <span className="font-medium text-[#202020]">Portfolio ✓</span>
            )}
            {!data.social_links?.linkedin && !data.social_links?.github && !data.social_links?.portfolio && (
              <span className="text-[#8A8A8A] italic">No social links provided (optional)</span>
            )}
          </div>
        </div>

        {/* Sections Stats & Verification */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#202020]">
              Content Sections
            </h3>
            <button
              type="button"
              onClick={onTogglePreview}
              className="text-xs text-[#666666] hover:text-[#202020] inline-flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-white rounded border border-[#E5E5E5]">
              <span className="text-[#8A8A8A] block text-[10px]">SUMMARY</span>
              <span className="font-semibold text-[#202020]">
                {data.summary?.trim() ? 'Written ✓' : 'Omitted'}
              </span>
            </div>

            <div className="p-2 bg-white rounded border border-[#E5E5E5]">
              <span className="text-[#8A8A8A] block text-[10px]">SKILLS</span>
              <span className="font-semibold text-[#202020]">
                {skillCount} {skillCount === 1 ? 'skill' : 'skills'} added
              </span>
            </div>

            <div className="p-2 bg-white rounded border border-[#E5E5E5]">
              <span className="text-[#8A8A8A] block text-[10px]">EXPERIENCE</span>
              <span className="font-semibold text-[#202020]">
                {data.experience?.length || 0} {data.experience?.length === 1 ? 'role' : 'roles'}
              </span>
            </div>

            <div className="p-2 bg-white rounded border border-[#E5E5E5]">
              <span className="text-[#8A8A8A] block text-[10px]">PROJECTS</span>
              <span className="font-semibold text-[#202020]">
                {data.projects?.length || 0} {data.projects?.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            <div className="p-2 bg-white rounded border border-[#E5E5E5]">
              <span className="text-[#8A8A8A] block text-[10px]">ACHIEVEMENTS</span>
              <span className="font-semibold text-[#202020]">
                {data.achievements?.length || 0} listed
              </span>
            </div>

            <div className="p-2 bg-white rounded border border-[#E5E5E5]">
              <span className="text-[#8A8A8A] block text-[10px]">EDUCATION</span>
              <span className="font-semibold text-[#202020]">
                {data.education?.length || 0} credentials
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Exact Final Section Order */}
      <div className="p-4 sm:p-5 rounded-xl border border-[#D4D4D4] bg-white space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#202020]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#202020]">
              Final PDF Section Order
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToStep('arrange')}
            className="text-xs text-[#666666] hover:text-[#202020] underline cursor-pointer"
          >
            Reorder
          </button>
        </div>

        <p className="text-xs text-[#666666]">
          The PDF generator will render your sections in this exact order below Header:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {data.section_order.map((key, idx) => (
            <div 
              key={key}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F5F5] border border-[#D4D4D4] text-xs font-medium text-[#202020]"
            >
              <span className="w-4 h-4 rounded-full bg-[#2B2B2B] text-white text-[10px] flex items-center justify-center font-mono">
                {idx + 1}
              </span>
              <span>{SECTION_LABELS[key] || key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* JSON Schema Preview Panel */}
      <JsonPreview data={data} defaultExpanded={false} />

      {/* Advanced API Config Toggle */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowApiConfig(!showApiConfig)}
          className="text-xs font-medium text-[#666666] hover:text-[#202020] flex items-center gap-1.5 cursor-pointer"
        >
          <Server className="w-3.5 h-3.5" />
          <span>{showApiConfig ? 'Hide Backend Endpoint Config' : 'Configure Backend API Endpoint'}</span>
          <span className="text-[#8A8A8A] font-mono text-[11px]">(default: /resume/generate)</span>
        </button>

        {showApiConfig && (
          <div className="mt-3 p-4 rounded-lg bg-[#FAFAFA] border border-[#D4D4D4] space-y-2">
            <label className="block text-xs font-semibold text-[#202020]">
              Target Endpoint URL (POST with application/json, returns application/pdf)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customApiUrl}
                onChange={(e) => setCustomApiUrl(e.target.value)}
                placeholder="/resume/generate or http://localhost:8000/resume/generate"
                className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] rounded-lg text-[#202020] outline-hidden"
              />
              <button
                type="button"
                onClick={() => setCustomApiUrl('/resume/generate')}
                className="px-2.5 py-2 text-xs bg-[#E5E5E5] hover:bg-[#D4D4D4] rounded-lg text-[#202020] font-medium"
              >
                Reset Default
              </button>
            </div>
            <p className="text-[11px] text-[#8A8A8A]">
              Connect to your external FastAPI server or utilize the integrated express middleware.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation & Generate Button */}
      <div className="pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5] border border-[#D4D4D4] rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Arrange</span>
        </button>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || !isNameFilled}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] active:bg-black rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-white" />
              <span>Generate & Download PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
