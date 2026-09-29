import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Code2, Download } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface JsonPreviewProps {
  data: ResumeData;
  defaultExpanded?: boolean;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({
  data,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  // Construct exact Pydantic schema JSON payload
  const formattedPayload = JSON.stringify(
    {
      full_name: data.full_name || '',
      contact: {
        email: data.contact?.email || '',
        phone: data.contact?.phone || '',
        location: data.contact?.location || '',
      },
      social_links: {
        linkedin: data.social_links?.linkedin || '',
        github: data.social_links?.github || '',
        portfolio: data.social_links?.portfolio || '',
      },
      summary: data.summary || '',
      skills: {
        languages: data.skills?.languages || [],
        frameworks: data.skills?.frameworks || [],
        databases: data.skills?.databases || [],
        tools: data.skills?.tools || [],
      },
      experience: (data.experience || []).map(({ id, ...rest }) => ({
        ...rest,
        description: rest.description || [],
      })),
      projects: (data.projects || []).map(({ id, ...rest }) => ({
        ...rest,
        technologies: rest.technologies || [],
      })),
      achievements: (data.achievements || []).map(({ id, ...rest }) => rest),
      education: (data.education || []).map(({ id, ...rest }) => rest),
      section_order: data.section_order || [
        'summary',
        'skills',
        'experience',
        'projects',
        'achievements',
        'education',
      ],
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([formattedPayload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.full_name || 'resume').toLowerCase().replace(/\s+/g, '_')}_payload.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="rounded-xl border border-[#D4D4D4] bg-white overflow-hidden shadow-2xs">
      {/* Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-3 bg-[#FBFBFB] hover:bg-[#F5F5F5] border-b border-[#E5E5E5] flex items-center justify-between cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#2B2B2B] text-white flex items-center justify-center">
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#202020]">Backend JSON Payload</span>
            <span className="ml-2 text-[11px] text-[#8A8A8A] font-mono">schema: Pydantic Resume</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isExpanded && (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#202020] bg-white border border-[#D4D4D4] hover:bg-[#F5F5F5] rounded transition-colors cursor-pointer"
                title="Copy formatted JSON to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#666666]" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadJson}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#666666] hover:text-[#202020] bg-white border border-[#D4D4D4] hover:bg-[#F5F5F5] rounded transition-colors cursor-pointer"
                title="Download JSON file"
              >
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          )}

          <div className="text-[#8A8A8A] p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Code Container */}
      {isExpanded && (
        <div className="relative bg-[#1A1A1A] p-4 text-slate-200 overflow-x-auto max-h-96 text-xs font-mono leading-relaxed">
          <pre>
            <code>{formattedPayload}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
