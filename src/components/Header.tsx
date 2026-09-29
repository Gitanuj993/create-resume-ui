import React from 'react';
import { 
  FileText, 
  Check, 
  Eye, 
  EyeOff, 
  Download, 
  RotateCcw, 
  Sparkles,
  Loader2
} from 'lucide-react';

interface HeaderProps {
  resumeTitle: string;
  onResumeTitleChange: (title: string) => void;
  isSaved: boolean;
  isPreviewVisible: boolean;
  onTogglePreview: () => void;
  onGeneratePdf: () => void;
  isGenerating: boolean;
  onLoadSample: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  resumeTitle,
  onResumeTitleChange,
  isSaved,
  isPreviewVisible,
  onTogglePreview,
  onGeneratePdf,
  isGenerating,
  onLoadSample,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D4D4D4] shadow-xs select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand and Document Name */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#2B2B2B] text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4 text-[#E5E5E5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#202020] leading-none">
                ResumeForge
              </span>
              <span className="text-[11px] text-[#8A8A8A] font-medium tracking-wide">
                Silver Edition
              </span>
            </div>
          </div>

          <div className="h-5 w-[1px] bg-[#D4D4D4] hidden sm:block" />

          {/* Editable resume title */}
          <div className="hidden md:flex items-center gap-2 group min-w-0">
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => onResumeTitleChange(e.target.value)}
              placeholder="Untitled Resume"
              className="text-sm font-medium text-[#202020] bg-transparent border border-transparent hover:border-[#D4D4D4] focus:border-[#2B2B2B] focus:bg-[#F5F5F5] rounded px-2 py-1 outline-hidden transition-colors w-52 truncate"
              title="Click to rename resume"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Save status */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#666666] font-medium mr-1">
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#202020]" />
                <span>Saved ✓</span>
              </>
            ) : (
              <span className="text-[#8A8A8A]">Saving...</span>
            )}
          </div>

          {/* Quick template actions */}
          <button
            type="button"
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#202020] bg-[#F5F5F5] hover:bg-[#E5E5E5] border border-[#D4D4D4] rounded-md transition-colors"
            title="Load comprehensive sample data (Anuj Tanwar)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#666666]" />
            <span>Sample Data</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5] rounded-md transition-colors"
            title="Clear all fields to blank template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Reset</span>
          </button>

          {/* Preview Toggle */}
          <button
            type="button"
            onClick={onTogglePreview}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              isPreviewVisible 
                ? 'bg-[#E5E5E5] text-[#202020] border-[#D4D4D4]' 
                : 'bg-white text-[#666666] hover:text-[#202020] border-[#D4D4D4] hover:bg-[#F5F5F5]'
            }`}
            title="Toggle Live Resume Preview"
          >
            {isPreviewVisible ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#666666]" />
                <span className="hidden sm:inline">Hide Preview</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#666666]" />
                <span className="hidden sm:inline">Preview</span>
              </>
            )}
          </button>

          {/* Primary Action: Generate Resume */}
          <button
            type="button"
            onClick={onGeneratePdf}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] active:bg-black rounded-md shadow-xs transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5E5E5]" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#E5E5E5]" />
                <span>Generate Resume</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
