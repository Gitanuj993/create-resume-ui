import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight,
  FolderGit2,
  ExternalLink,
  X
} from 'lucide-react';
import { ResumeData, ProjectEntry } from '../../types/resume';

interface ProjectsFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  data,
  onChange,
  onPrev,
  onNext,
}) => {
  const projects = data.projects || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(projects.length > 0 ? 0 : null);
  const [techInput, setTechInput] = useState<string>('');

  const handleAddProject = () => {
    const newProject: ProjectEntry = {
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    const updated = [...projects, newProject];
    onChange({ projects: updated });
    setExpandedIndex(updated.length - 1);
  };

  const handleUpdateProject = (index: number, fields: Partial<ProjectEntry>) => {
    const updated = projects.map((item, idx) => {
      if (idx === index) {
        return { ...item, ...fields };
      }
      return item;
    });
    onChange({ projects: updated });
  };

  const handleDeleteProject = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = projects.filter((_, idx) => idx !== index);
    onChange({ projects: updated });
    if (expandedIndex === index) {
      setExpandedIndex(updated.length > 0 ? 0 : null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const handleAddTech = (projIndex: number) => {
    const trimmed = techInput.trim();
    if (!trimmed) return;
    const currentTech = projects[projIndex].technologies || [];
    if (!currentTech.includes(trimmed)) {
      handleUpdateProject(projIndex, {
        technologies: [...currentTech, trimmed],
      });
    }
    setTechInput('');
  };

  const handleRemoveTech = (projIndex: number, techIdx: number) => {
    const currentTech = (projects[projIndex].technologies || []).filter((_, idx) => idx !== techIdx);
    handleUpdateProject(projIndex, { technologies: currentTech });
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
            Featured Projects
          </h2>
          <p className="text-sm text-[#666666] mt-1">
            Showcase your best software, open-source work, or academic capstone projects.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-[#D4D4D4] bg-[#FAFAFA] mb-6">
          <FolderGit2 className="w-8 h-8 text-[#8A8A8A] mx-auto mb-2.5" />
          <h3 className="text-sm font-semibold text-[#202020]">No projects added yet</h3>
          <p className="text-xs text-[#666666] max-w-sm mx-auto mt-1 mb-4">
            Projects are high-signal for technical recruiters to evaluate real coding ability.
          </p>
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#202020] bg-white border border-[#D4D4D4] hover:bg-[#F5F5F5] rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Project</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {projects.map((proj, index) => {
            const isExpanded = expandedIndex === index;
            const name = proj.name || 'Untitled Project';

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
                        {name}
                      </span>
                      {proj.link && (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#8A8A8A] hover:text-[#202020] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-[11px] text-[#666666] mt-0.5 truncate">
                        {proj.technologies.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteProject(index, e)}
                      className="p-1.5 text-[#8A8A8A] hover:text-red-600 hover:bg-white rounded transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="text-[#666666]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Form Content */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-[#E5E5E5] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Project Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleUpdateProject(index, { name: e.target.value })}
                          placeholder="e.g. Resume Generator"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>

                      {/* Link */}
                      <div>
                        <label className="block text-xs font-semibold text-[#202020] mb-1">
                          Project URL or Repository <span className="text-[#8A8A8A] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => handleUpdateProject(index, { link: e.target.value })}
                          placeholder="https://github.com/example/project"
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Technologies Tagging */}
                    <div>
                      <label className="block text-xs font-semibold text-[#202020] mb-1">
                        Technologies Used
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTech(index);
                            }
                          }}
                          placeholder="Type tech and press Enter (e.g. Python, FastAPI, Docker)"
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-md text-[#202020] placeholder-[#8A8A8A] outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTech(index)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#202020] bg-[#E5E5E5] hover:bg-[#D4D4D4] rounded-md transition-colors cursor-pointer shrink-0"
                        >
                          + Add
                        </button>
                      </div>

                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium text-[#202020] bg-[#F5F5F5] border border-[#D4D4D4] rounded"
                            >
                              <span>{tech}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTech(index, tIdx)}
                                className="text-[#8A8A8A] hover:text-red-600 transition-colors cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-[#202020] mb-1">
                        Project Description
                      </label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(index, { description: e.target.value })}
                        placeholder="e.g. A service that generates PDF resumes from structured JSON using FastAPI and ReportLab. Includes asynchronous rendering pipeline."
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
          <span>Continue to Achievements</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
