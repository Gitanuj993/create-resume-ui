import React from 'react';
import { User, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface PersonalFormProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onNext: () => void;
}

export const PersonalForm: React.FC<PersonalFormProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const handleContactChange = (field: keyof ResumeData['contact'], value: string) => {
    onChange({
      contact: {
        ...data.contact,
        [field]: value,
      },
    });
  };

  const isNameEmpty = !data.full_name?.trim();
  const isEmailEmpty = !data.contact?.email?.trim();
  const isPhoneEmpty = !data.contact?.phone?.trim();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-xl border border-[#D4D4D4] shadow-xs p-6 sm:p-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020]">
          Personal Information
        </h2>
        <p className="text-sm text-[#666666] mt-1">
          Tell us the basic contact details that should appear prominently at the top of your resume.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#202020] mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8A8A]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={data.full_name || ''}
              onChange={(e) => onChange({ full_name: e.target.value })}
              placeholder="e.g. Anuj Tanwar"
              className={`w-full pl-9.5 pr-3 py-2.5 text-sm bg-white border rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all ${
                isNameEmpty 
                  ? 'border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B]' 
                  : 'border-[#D4D4D4] focus:border-[#2B2B2B]'
              }`}
            />
          </div>
          {isNameEmpty && (
            <p className="text-[11px] text-[#8A8A8A] mt-1">Full name is required for header generation.</p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#202020] mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8A8A]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={data.contact?.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="anuj@example.com"
                className="w-full pl-9.5 pr-3 py-2.5 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202020] mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8A8A]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={data.contact?.phone || ''}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="+91 9876543210"
                className="w-full pl-9.5 pr-3 py-2.5 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-[#202020] mb-1.5">
            Location <span className="text-[#8A8A8A] font-normal">(City, Country or Remote)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8A8A]">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.contact?.location || ''}
              onChange={(e) => handleContactChange('location', e.target.value)}
              placeholder="e.g. Indore, India"
              className="w-full pl-9.5 pr-3 py-2.5 text-sm bg-white border border-[#D4D4D4] focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] rounded-lg text-[#202020] placeholder-[#8A8A8A] outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-[#E5E5E5] flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2B2B2B] hover:bg-[#1A1A1A] rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <span>Continue to Social Links</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
