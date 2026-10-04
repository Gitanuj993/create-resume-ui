import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Infinity, Lock, Zap, Target, FileCheck, RefreshCw, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#202020] flex flex-col font-sans selection:bg-[#E5E5E5] selection:text-[#202020]">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#D4D4D4] shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#202020] hover:text-[#666666] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resume Builder
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#202020] mb-4 leading-tight">
            About Create Resume
          </h1>
          <p className="text-lg text-[#666666] font-medium mb-6">
            Create Professional Resumes. Simple, Fast, and Free.
          </p>
          <p className="text-base text-[#8A8A8A] max-w-2xl">
            Creating a professional resume shouldn't require complicated software, an account, or hours of formatting.
            Create Resume is a simple resume-building platform designed to help students, developers, job seekers,
            and professionals create clean, professional resumes quickly.
          </p>
        </div>

        {/* Why Create Resume */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-8">Why Create Resume?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Feature Cards */}
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <Infinity className="w-6 h-6 text-[#202020]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020] mb-2">Unlimited Resumes</h3>
                  <p className="text-sm text-[#8A8A8A]">
                    Create as many resumes as you need. Make different versions for different jobs, industries, roles,
                    or career paths without worrying about limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-[#202020]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020] mb-2">No Sign-Up Required</h3>
                  <p className="text-sm text-[#8A8A8A]">
                    You don't need to create an account or hand over your email just to build a resume. Open the
                    website and start creating.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#202020]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020] mb-2">Fast and Simple</h3>
                  <p className="text-sm text-[#8A8A8A]">
                    Add your information, organize your sections, and generate your resume without dealing with
                    complicated document formatting.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#202020]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020] mb-2">Job-Focused</h3>
                  <p className="text-sm text-[#8A8A8A]">
                    Keep the focus where it belongs: your skills, experience, projects, education, and achievements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-[#202020]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020] mb-2">Professional Output</h3>
                  <p className="text-sm text-[#8A8A8A]">
                    Create clean, structured resumes that are ready to download, share, and use for applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-[#202020]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020] mb-2">Easy to Update</h3>
                  <p className="text-sm text-[#8A8A8A]">
                    Your career changes. Your resume should be easy to change with it. Update information and create
                    new versions whenever needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Everyone */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-8">Built for Everyone</h2>
          <p className="text-base text-[#8A8A8A] mb-8">
            Whether you're creating your first resume or updating an established career profile, Create Resume is
            designed to keep the process straightforward.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-2">Students</h3>
              <p className="text-sm text-[#8A8A8A]">
                Turn education, projects, skills, certifications, and achievements into a professional resume.
              </p>
            </div>
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-2">Developers</h3>
              <p className="text-sm text-[#8A8A8A]">
                Highlight technical skills, projects, technologies, GitHub profiles, and development experience.
              </p>
            </div>
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-2">Job Seekers</h3>
              <p className="text-sm text-[#8A8A8A]">
                Create different resume versions tailored toward different roles and opportunities.
              </p>
            </div>
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-2">Professionals</h3>
              <p className="text-sm text-[#8A8A8A]">
                Maintain a clear representation of your experience and create updated versions whenever your career
                evolves.
              </p>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-8">No Account. No Resume Limits. No Unnecessary Complexity.</h2>
          <p className="text-base text-[#8A8A8A] mb-6 max-w-2xl">
            We believe creating a resume should be accessible to everyone. That's why Create Resume is built around
            three simple principles:
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-2">Create freely.</h3>
              <p className="text-sm text-[#8A8A8A]">Make unlimited resumes for different opportunities.</p>
            </div>
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-2">Start instantly.</h3>
              <p className="text-sm text-[#8A8A8A]">No registration or sign-up required.</p>
            </div>
            <div className="bg-white border border-[#D4D4D4] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-2">Keep it professional.</h3>
              <p className="text-sm text-[#8A8A8A]">
                Focus on clear content and professional presentation rather than unnecessary design complexity.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Deep Dive */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-6">Our Philosophy</h2>
          <div className="bg-white border border-[#D4D4D4] rounded-lg p-8">
            <p className="text-base text-[#8A8A8A] mb-6">
              A good resume doesn't need to be complicated. It needs to be clear, relevant, and easy to understand.
            </p>
            <p className="text-base text-[#8A8A8A] mb-6">
              The goal isn't to create the most decorated document on the internet. The goal is to help recruiters
              quickly understand who you are, what you've accomplished, and what you can bring to a role.
            </p>
            <div className="bg-[#F5F5F5] border border-[#D4D4D4] rounded p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#202020] mb-4">What We're Building</h3>
              <p className="text-sm text-[#8A8A8A] mb-4">
                Create Resume is being built as a practical career tool for people who want to present themselves
                professionally without unnecessary friction.
              </p>
              <p className="text-sm text-[#8A8A8A] mb-4 font-medium">We're focused on making resume creation:</p>
              <ul className="space-y-2 mb-4">
                <li className="text-sm text-[#8A8A8A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202020]" />
                  Accessible
                </li>
                <li className="text-sm text-[#8A8A8A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202020]" />
                  Simple
                </li>
                <li className="text-sm text-[#8A8A8A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202020]" />
                  Fast
                </li>
                <li className="text-sm text-[#8A8A8A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202020]" />
                  Professional
                </li>
                <li className="text-sm text-[#8A8A8A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202020]" />
                  Unlimited
                </li>
              </ul>
              <p className="text-sm text-[#8A8A8A]">
                Because finding an opportunity is already difficult enough. Creating the document shouldn't be another
                obstacle.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12 sm:mb-16 bg-white border border-[#D4D4D4] rounded-lg p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-4">Create Your Resume</h2>
          <p className="text-base text-[#8A8A8A] mb-8">
            No sign-up. No limits. Just create. Build your professional resume and get ready for your next opportunity.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-[#2B2B2B] text-white font-medium rounded-lg hover:bg-[#202020] transition-colors"
          >
            Start Building Now
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D4D4D4] mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 text-center text-xs text-[#8A8A8A]">
          <p>© 2024 Create Resume. No sign-up required. No limits. Simple resume building.</p>
        </div>
      </footer>
    </div>
  );
};
