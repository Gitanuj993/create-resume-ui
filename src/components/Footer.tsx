import React from 'react';
import { FileText, Github, Instagram, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
  { label: 'About Us', href: '#about-us' },
  { label: 'Contact Us', href: '#contact-us' },
  { label: 'Terms & Conditions', href: '#terms-and-conditions' },
  { label: 'Privacy Policy', href: '#privacy-policy' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Gitanuj993/create-resume-ui', icon: Github },
  { label: 'Instagram', href: '#instagram', icon: Instagram },
  { label: 'LinkedIn', href: '#linkedin', icon: Linkedin },
  { label: 'Email', href: '#contact-us', icon: Mail },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#4A4A4A] bg-gradient-to-br from-[#171717] via-[#292929] to-[#444444] text-white shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#202020] shadow-sm">
                <FileText className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                Create-Resumes
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#C4C4C4]">
              Build a polished, professional resume for software professionals, designed to keep your story clear.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h2>
            <div className="mt-3 flex flex-col items-start gap-2.5">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#C4C4C4] transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect
            </h2>
            <div className="mt-3 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={`${label} (coming soon)`}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#666666] text-[#D4D4D4] transition-colors hover:border-[#A3A3A3] hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#A3A3A3]">
              Social profiles coming soon.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-[#A3A3A3] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Create-Resumes. All rights reserved.</p>
          <p>Made for better career stories.</p>
        </div>
      </div>
    </footer>
  );
};
