import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  User,
  Globe,
  FileText,
  Cpu,
  Briefcase,
  FolderGit2,
  Award,
  GraduationCap,
  ArrowUpDown,
  FileCheck2,
} from 'lucide-react';
import { StepId, WIZARD_STEPS, ResumeData } from '../types/resume';

interface FormNavigatorProps {
  currentStep: StepId;
  onSelectStep: (step: StepId) => void;
  resumeData: ResumeData;
  isOpen: boolean;
  onClose: () => void;
}

const STEP_ICONS: Record<StepId, React.ComponentType<{ className?: string }>> = {
  personal: User,
  social: Globe,
  summary: FileText,
  skills: Cpu,
  experience: Briefcase,
  projects: FolderGit2,
  achievements: Award,
  education: GraduationCap,
  arrange: ArrowUpDown,
  review: FileCheck2,
};

export const FormNavigator: React.FC<FormNavigatorProps> = ({
  currentStep,
  onSelectStep,
  resumeData,
  isOpen,
  onClose,
}) => {
  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);

  // Determine completion of each step
  const isStepComplete = (stepId: StepId): boolean => {
    switch (stepId) {
      case 'personal':
        return Boolean(
          resumeData.full_name?.trim() &&
          resumeData.contact?.email?.trim() &&
          resumeData.contact?.phone?.trim()
        );
      case 'social':
        return Boolean(
          resumeData.social_links?.linkedin?.trim() ||
          resumeData.social_links?.github?.trim() ||
          resumeData.social_links?.portfolio?.trim()
        );
      case 'summary':
        return Boolean(resumeData.summary?.trim());
      case 'skills': {
        const { languages = [], frameworks = [], databases = [], tools = [] } = resumeData.skills || {};
        return (languages.length + frameworks.length + databases.length + tools.length) > 0;
      }
      case 'experience':
        return Boolean(resumeData.experience && resumeData.experience.length > 0);
      case 'projects':
        return Boolean(resumeData.projects && resumeData.projects.length > 0);
      case 'achievements':
        return Boolean(resumeData.achievements && resumeData.achievements.length > 0);
      case 'education':
        return Boolean(resumeData.education && resumeData.education.length > 0);
      case 'arrange':
        return Boolean(resumeData.section_order && resumeData.section_order.length > 0);
      case 'review':
        return isStepComplete('personal');
      default:
        return false;
    }
  };

  const handleStepSelect = (stepId: StepId) => {
    onSelectStep(stepId);
    onClose();
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      handleStepSelect(WIZARD_STEPS[currentStepIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < WIZARD_STEPS.length - 1) {
      handleStepSelect(WIZARD_STEPS[currentStepIndex + 1].id);
    }
  };

  return (
    <>
      {/* Mobile Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer / Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[#D4D4D4] z-50 lg:hidden transition-all duration-300 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#D4D4D4] p-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#202020]">
            All Form Steps
          </h3>
          <button
            onClick={onClose}
            className="text-[#666666] hover:text-[#202020] p-1 rounded-md hover:bg-[#F5F5F5] transition-colors"
            aria-label="Close"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Step List */}
        <div className="p-4 space-y-2">
          {WIZARD_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[step.id];
            const isComplete = isStepComplete(step.id);
            const isCurrent = step.id === currentStep;

            return (
              <button
                key={step.id}
                onClick={() => handleStepSelect(step.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  isCurrent
                    ? 'bg-[#2B2B2B] text-white shadow-sm'
                    : 'bg-white border border-[#D4D4D4] text-[#202020] hover:bg-[#F5F5F5]'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded ${
                    isCurrent
                      ? 'bg-white text-[#2B2B2B]'
                      : isComplete
                      ? 'bg-[#A3E635] text-white'
                      : 'bg-[#D4D4D4] text-[#666666]'
                  }`}
                >
                  {isComplete ? (
                    <span className="text-xs font-bold">✓</span>
                  ) : (
                    <span className="text-xs font-bold">{idx + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${
                    isCurrent ? 'text-white' : 'text-[#202020]'
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-xs ${
                    isCurrent ? 'text-white/70' : 'text-[#8A8A8A]'
                  }`}>
                    Step {idx + 1} of {WIZARD_STEPS.length}
                  </p>
                </div>
                <Icon className={`w-5 h-5 flex-shrink-0 ${
                  isCurrent ? 'text-white' : 'text-[#8A8A8A]'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-[#D4D4D4] p-4 flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-[#D4D4D4] text-[#202020] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === WIZARD_STEPS.length - 1}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#2B2B2B] text-white hover:bg-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
