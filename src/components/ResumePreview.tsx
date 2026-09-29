import React, { useState } from 'react';
import { 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Maximize2,
  Minimize2,
  Download,
  Loader2
} from 'lucide-react';
import { ResumeData, ReorderableSection } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  onGeneratePdf?: () => void;
  isGenerating?: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  onGeneratePdf,
  isGenerating,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isExpandedFull, setIsExpandedFull] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 130));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));
  const handleResetZoom = () => setZoom(100);

  const {
    full_name,
    contact = { email: '', phone: '', location: '' },
    social_links = { linkedin: '', github: '', portfolio: '' },
    summary = '',
    skills = { languages: [], frameworks: [], databases: [], tools: [] },
    experience = [],
    projects = [],
    achievements = [],
    education = [],
    section_order = [
      'summary',
      'skills',
      'experience',
      'projects',
      'achievements',
      'education',
    ],
  } = data;

  // Render individual sections
  const renderSection = (sectionKey: ReorderableSection) => {
    switch (sectionKey) {
      case 'summary':
        if (!summary?.trim()) return null;
        return (
          <div key="summary" className="mb-4">
            <h3 className="text-[11px] font-bold tracking-wider text-[#202020] uppercase border-b border-[#D4D4D4] pb-0.5 mb-1.5 font-sans">
              Professional Summary
            </h3>
            <p className="text-[10px] text-[#2B2B2B] leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        );

      case 'skills': {
        const { languages = [], frameworks = [], databases = [], tools = [] } = skills || {};
        const hasSkills = languages.length + frameworks.length + databases.length + tools.length > 0;
        if (!hasSkills) return null;

        return (
          <div key="skills" className="mb-4">
            <h3 className="text-[11px] font-bold tracking-wider text-[#202020] uppercase border-b border-[#D4D4D4] pb-0.5 mb-1.5 font-sans">
              Technical Skills
            </h3>
            <div className="space-y-1 text-[10px] text-[#2B2B2B]">
              {languages.length > 0 && (
                <div>
                  <strong className="text-[#202020] font-semibold">Languages: </strong>
                  <span className="text-[#404040]">{languages.join(', ')}</span>
                </div>
              )}
              {frameworks.length > 0 && (
                <div>
                  <strong className="text-[#202020] font-semibold">Frameworks & Libraries: </strong>
                  <span className="text-[#404040]">{frameworks.join(', ')}</span>
                </div>
              )}
              {databases.length > 0 && (
                <div>
                  <strong className="text-[#202020] font-semibold">Databases & Storage: </strong>
                  <span className="text-[#404040]">{databases.join(', ')}</span>
                </div>
              )}
              {tools.length > 0 && (
                <div>
                  <strong className="text-[#202020] font-semibold">Tools & Technologies: </strong>
                  <span className="text-[#404040]">{tools.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4">
            <h3 className="text-[11px] font-bold tracking-wider text-[#202020] uppercase border-b border-[#D4D4D4] pb-0.5 mb-2 font-sans">
              Experience
            </h3>
            <div className="space-y-3">
              {experience.map((exp, idx) => {
                if (!exp.role && !exp.company) return null;
                const dates = [exp.start_date, exp.end_date].filter(Boolean).join(' – ');
                const subMeta = [exp.company, exp.location].filter(Boolean).join(' · ');

                return (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between text-[10.5px]">
                      <span className="font-bold text-[#202020]">{exp.role || 'Role'}</span>
                      {dates && <span className="text-[9.5px] text-[#666666] font-mono">{dates}</span>}
                    </div>
                    {subMeta && (
                      <div className="text-[9.5px] italic text-[#555555] mb-1">
                        {subMeta}
                      </div>
                    )}
                    {exp.description && exp.description.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[9.5px] text-[#2B2B2B] leading-snug">
                        {exp.description.map((bullet, bIdx) => (
                          bullet.trim() ? <li key={bIdx}>{bullet}</li> : null
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4">
            <h3 className="text-[11px] font-bold tracking-wider text-[#202020] uppercase border-b border-[#D4D4D4] pb-0.5 mb-2 font-sans">
              Projects
            </h3>
            <div className="space-y-2.5">
              {projects.map((proj, idx) => {
                if (!proj.name) return null;
                return (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between text-[10.5px]">
                      <div className="flex items-center gap-1.5 font-bold text-[#202020]">
                        <span>{proj.name}</span>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <span className="font-normal text-[9px] text-[#666666]">
                            | {proj.technologies.join(', ')}
                          </span>
                        )}
                      </div>
                      {proj.link && (
                        <span className="text-[9px] text-[#555555] font-mono">
                          {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-[9.5px] text-[#2B2B2B] leading-snug mt-0.5">
                        {proj.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-4">
            <h3 className="text-[11px] font-bold tracking-wider text-[#202020] uppercase border-b border-[#D4D4D4] pb-0.5 mb-2 font-sans">
              Honors & Achievements
            </h3>
            <div className="space-y-1.5">
              {achievements.map((ach, idx) => {
                if (!ach.title) return null;
                return (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between text-[10.5px]">
                      <span className="font-bold text-[#202020]">{ach.title}</span>
                      {ach.date && <span className="text-[9.5px] text-[#666666] font-mono">{ach.date}</span>}
                    </div>
                    {ach.description && (
                      <p className="text-[9.5px] text-[#2B2B2B] leading-snug">
                        {ach.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="mb-4">
            <h3 className="text-[11px] font-bold tracking-wider text-[#202020] uppercase border-b border-[#D4D4D4] pb-0.5 mb-2 font-sans">
              Education
            </h3>
            <div className="space-y-2">
              {education.map((edu, idx) => {
                if (!edu.institution && !edu.degree) return null;
                const degreeField = [edu.degree, edu.field_of_study].filter(Boolean).join(' in ');
                const dates = [edu.start_date, edu.end_date].filter(Boolean).join(' – ');

                return (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between text-[10.5px]">
                      <span className="font-bold text-[#202020]">{degreeField || edu.institution}</span>
                      {dates && <span className="text-[9.5px] text-[#666666] font-mono">{dates}</span>}
                    </div>
                    <div className="flex items-baseline justify-between text-[9.5px] text-[#555555]">
                      <span>{edu.institution}</span>
                      {edu.grade && <span className="font-medium text-[#202020]">Grade: {edu.grade}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Format contact line
  const contactItems: string[] = [];
  if (contact.email) contactItems.push(contact.email);
  if (contact.phone) contactItems.push(contact.phone);
  if (contact.location) contactItems.push(contact.location);
  if (social_links.linkedin) contactItems.push(social_links.linkedin.replace(/^https?:\/\/(www\.)?/, ''));
  if (social_links.github) contactItems.push(social_links.github.replace(/^https?:\/\/(www\.)?/, ''));
  if (social_links.portfolio) contactItems.push(social_links.portfolio.replace(/^https?:\/\/(www\.)?/, ''));

  return (
    <div className={`flex flex-col bg-[#EDEDED] border border-[#D4D4D4] rounded-xl overflow-hidden ${
      isExpandedFull ? 'fixed inset-4 z-50 shadow-2xl' : 'h-full shadow-xs'
    }`}>
      {/* Preview Toolbar */}
      <div className="bg-white border-b border-[#D4D4D4] px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#202020] uppercase tracking-wider">
            Live Preview
          </span>
          <span className="text-[10px] text-[#8A8A8A] font-mono hidden sm:inline">
            A4 Standard
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-[#F5F5F5] rounded-md border border-[#E0E0E0] p-0.5 text-xs text-[#666666]">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 hover:text-[#202020] rounded hover:bg-white transition-colors cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-[#202020] tabular-nums">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 hover:text-[#202020] rounded hover:bg-white transition-colors cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1 hover:text-[#202020] rounded hover:bg-white transition-colors cursor-pointer ml-0.5"
              title="Reset zoom to 100%"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Direct Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-1.5 text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5] rounded-md border border-[#E0E0E0] transition-colors cursor-pointer"
            title="Print or Save PDF directly from browser"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* Full-screen expander */}
          <button
            type="button"
            onClick={() => setIsExpandedFull(!isExpandedFull)}
            className="p-1.5 text-[#666666] hover:text-[#202020] hover:bg-[#F5F5F5] rounded-md border border-[#E0E0E0] transition-colors cursor-pointer"
            title={isExpandedFull ? 'Exit full screen' : 'Expand preview full screen'}
          >
            {isExpandedFull ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Quick PDF button */}
          {onGeneratePdf && (
            <button
              type="button"
              onClick={onGeneratePdf}
              disabled={isGenerating}
              className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-md transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
              title="Generate PDF file"
            >
              {isGenerating ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Download className="w-3 h-3" />
              )}
              <span className="hidden sm:inline">PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Preview Scrollable Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start bg-[#EAEAEA]">
        <div 
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150"
        >
          {/* Printable A4 Paper Sheet */}
          <div className="resume-paper w-[595px] min-h-[842px] bg-white text-[#202020] p-10 shadow-lg border border-[#D4D4D4] rounded-sm select-text font-serif">
            {/* Header / Name */}
            <div className="text-center mb-3">
              <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] font-sans uppercase">
                {full_name || 'Your Full Name'}
              </h1>

              {contactItems.length > 0 ? (
                <div className="text-[9.5px] text-[#555555] font-sans mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 leading-relaxed">
                  {contactItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <span>{item}</span>
                      {idx < contactItems.length - 1 && (
                        <span className="text-[#A0A0A0]">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="text-[9px] text-[#8A8A8A] italic mt-1 font-sans">
                  Email, phone, and location will appear here.
                </div>
              )}

              {/* Decorative divider hairline */}
              <hr className="mt-3 border-[#D4D4D4]" />
            </div>

            {/* Sections in dynamic user order */}
            <div className="font-sans">
              {section_order.map((secKey) => renderSection(secKey))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
