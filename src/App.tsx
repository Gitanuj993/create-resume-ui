import React, { useState, useEffect } from 'react';
import { 
  ResumeData, 
  StepId, 
  WIZARD_STEPS, 
  INITIAL_RESUME_DATA, 
  SAMPLE_RESUME_DATA 
} from './types/resume';
import { Header } from './components/Header';
import { ProgressSidebar } from './components/ProgressSidebar';
import { ResumePreview } from './components/ResumePreview';

// Step Forms
import { PersonalForm } from './components/forms/PersonalForm';
import { SocialLinksForm } from './components/forms/SocialLinksForm';
import { SummaryForm } from './components/forms/SummaryForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { ProjectsForm } from './components/forms/ProjectsForm';
import { AchievementsForm } from './components/forms/AchievementsForm';
import { EducationForm } from './components/forms/EducationForm';
import { SectionOrder } from './components/forms/SectionOrder';
import { ReviewForm } from './components/forms/ReviewForm';

import { submitResumeForPdf } from './services/resumeApi';
import { CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'resumeforge_data_v1';
const TITLE_STORAGE_KEY = 'resumeforge_title_v1';

export default function App() {
  // Load initial resume data from localStorage or default to sample data for immediate visual joy
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse error and fallback
    }
    return SAMPLE_RESUME_DATA;
  });

  const [resumeTitle, setResumeTitle] = useState<string>(() => {
    try {
      return localStorage.getItem(TITLE_STORAGE_KEY) || 'Software Engineer Resume';
    } catch {
      return 'Software Engineer Resume';
    }
  });

  const [currentStep, setCurrentStep] = useState<StepId>('personal');
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    setIsSaved(false);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        localStorage.setItem(TITLE_STORAGE_KEY, resumeTitle);
        setIsSaved(true);
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [resumeData, resumeTitle]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3500);
  };

  const handleUpdateData = (updated: Partial<ResumeData>) => {
    setResumeData((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Step navigation
  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    if (currentStepIndex < WIZARD_STEPS.length - 1) {
      setCurrentStep(WIZARD_STEPS[currentStepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(WIZARD_STEPS[currentStepIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadSample = () => {
    setResumeData(SAMPLE_RESUME_DATA);
    setResumeTitle('Software Engineer Resume - Sample');
    showToast('Loaded sample profile (Anuj Tanwar)', 'info');
  };

  const handleReset = () => {
    if (window.confirm('Clear all fields and start with an empty template?')) {
      setResumeData(INITIAL_RESUME_DATA);
      setResumeTitle('Untitled Resume');
      setCurrentStep('personal');
      showToast('Resume template cleared', 'info');
    }
  };

  const handleGeneratePdf = async (customApiUrl?: string) => {
    if (!resumeData.full_name?.trim()) {
      showToast('Please enter at least your Full Name before generating.', 'error');
      setCurrentStep('personal');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await submitResumeForPdf(resumeData, {
        apiUrl: customApiUrl || '/resume/generate',
      });
      showToast(`Resume generated successfully! (${result.filename})`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Generation failed', 'error');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  // Render current form step
  const renderCurrentForm = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalForm
            data={resumeData}
            onChange={handleUpdateData}
            onNext={handleNext}
          />
        );
      case 'social':
        return (
          <SocialLinksForm
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'achievements':
        return (
          <AchievementsForm
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'arrange':
        return (
          <SectionOrder
            data={resumeData}
            onChange={handleUpdateData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 'review':
        return (
          <ReviewForm
            data={resumeData}
            onPrev={handlePrev}
            onNavigateToStep={(s) => setCurrentStep(s)}
            onGeneratePdf={handleGeneratePdf}
            isGenerating={isGenerating}
            onTogglePreview={() => setIsPreviewVisible(!isPreviewVisible)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#202020] flex flex-col font-sans selection:bg-[#E5E5E5] selection:text-[#202020]">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className={`px-4 py-2.5 rounded-lg shadow-md border flex items-center gap-2 text-xs font-medium ${
            toastMessage.type === 'error'
              ? 'bg-red-900 text-white border-red-800'
              : toastMessage.type === 'info'
              ? 'bg-[#2B2B2B] text-white border-[#1A1A1A]'
              : 'bg-[#202020] text-white border-black'
          }`}>
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-300" />
            ) : toastMessage.type === 'info' ? (
              <Sparkles className="w-4 h-4 text-[#D4D4D4]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            )}
            <span>{toastMessage.text}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/60 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        resumeTitle={resumeTitle}
        onResumeTitleChange={setResumeTitle}
        isSaved={isSaved}
        isPreviewVisible={isPreviewVisible}
        onTogglePreview={() => setIsPreviewVisible(!isPreviewVisible)}
        onGeneratePdf={() => handleGeneratePdf()}
        isGenerating={isGenerating}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row">
        {/* Left: Compact Step Navigation Sidebar */}
        <ProgressSidebar
          currentStep={currentStep}
          onSelectStep={(s) => setCurrentStep(s)}
          resumeData={resumeData}
        />

        {/* Center: Current Form */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {renderCurrentForm()}
          </div>
        </main>

        {/* Right: Live Resume Preview Panel (Desktop-first) */}
        {isPreviewVisible && (
          <aside className="w-full lg:w-[480px] xl:w-[540px] 2xl:w-[620px] bg-white border-t lg:border-t-0 lg:border-l border-[#D4D4D4] p-3 sm:p-4 shrink-0 flex flex-col h-[600px] lg:h-[calc(100vh-64px)] sticky top-16">
            <ResumePreview
              data={resumeData}
              onGeneratePdf={() => handleGeneratePdf()}
              isGenerating={isGenerating}
            />
          </aside>
        )}
      </div>

      {/* Mobile Floating Preview Toggle Bar */}
      <div className="lg:hidden sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-[#D4D4D4] px-4 py-2.5 flex items-center justify-between z-30 shadow-md">
        <div className="text-xs font-semibold text-[#202020] truncate">
          Step {currentStepIndex + 1}: {WIZARD_STEPS[currentStepIndex].label}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#F5F5F5] border border-[#D4D4D4] text-[#202020]"
          >
            {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            type="button"
            onClick={() => handleGeneratePdf()}
            disabled={isGenerating}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#2B2B2B] text-white"
          >
            {isGenerating ? 'Generating...' : 'PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
