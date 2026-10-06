import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

interface StaticPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const StaticPageLayout = ({ title, description, children }: StaticPageLayoutProps) => (
  <div className="min-h-screen bg-[#F5F5F5] text-[#202020] flex flex-col font-sans selection:bg-[#E5E5E5] selection:text-[#202020]">
    <header className="sticky top-0 z-40 bg-white border-b border-[#D4D4D4] shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#202020] hover:text-[#666666] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Resume Builder
        </Link>
      </div>
    </header>
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#202020] mb-4 leading-tight">{title}</h1>
        <p className="text-base sm:text-lg text-[#666666] max-w-2xl">{description}</p>
      </header>
      <div className="space-y-8">{children}</div>
    </main>
    <Footer />
  </div>
);