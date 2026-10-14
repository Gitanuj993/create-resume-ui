import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, Eye, EyeOff, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Those passwords do not match.');
      return;
    }

    if (!supabase) {
      setErrorMessage('Account creation is not configured yet. Please try again later.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: fullName.trim() } },
      });

      if (error) throw error;
      setIsRegistered(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'We could not create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#202020] lg:grid lg:grid-cols-2">
      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-14">
        <Link to="/" className="inline-flex w-fit items-center gap-2.5" aria-label="Create-Resumes home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#2B2B2B] text-white">
            <FileText className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-[15px] font-bold text-[#202020]">Create-Resumes</span>
        </Link>

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-[420px]">
            {isRegistered ? (
              <div role="status" aria-live="polite">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EEE8] text-[#315A3C]">
                  <Check className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mb-3 text-xs font-semibold uppercase text-[#666666]">One last step</p>
                <h1 className="text-3xl font-bold leading-tight">Check your inbox</h1>
                <p className="mt-3 text-sm leading-6 text-[#666666]">
                  We sent a confirmation link to <span className="font-semibold text-[#202020]">{email}</span>. Open it to finish creating your account.
                </p>
                <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#202020] hover:text-[#666666]">
                  Continue to the resume builder <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                <p className="mb-3 text-xs font-semibold uppercase text-[#666666]">Your next chapter</p>
                <h1 className="text-3xl font-bold leading-tight sm:text-[34px]">Create your account</h1>
                <p className="mt-3 text-sm leading-6 text-[#666666]">Keep your resume work close and pick up where you left off.</p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="full-name" className="mb-2 block text-sm font-medium">Full name</label>
                    <input
                      id="full-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="h-11 w-full rounded-md border border-[#D4D4D4] bg-white px-3.5 text-sm outline-none transition focus:border-[#555555] focus:ring-2 focus:ring-[#202020]/10"
                      placeholder="Jordan Lee"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">Email address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-11 w-full rounded-md border border-[#D4D4D4] bg-white px-3.5 text-sm outline-none transition focus:border-[#555555] focus:ring-2 focus:ring-[#202020]/10"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        type={passwordVisible ? 'text' : 'password'}
                        name="new-password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="h-11 w-full rounded-md border border-[#D4D4D4] bg-white px-3.5 pr-11 text-sm outline-none transition focus:border-[#555555] focus:ring-2 focus:ring-[#202020]/10"
                        placeholder="At least 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible((visible) => !visible)}
                        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                        title={passwordVisible ? 'Hide password' : 'Show password'}
                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#666666] hover:text-[#202020]"
                      >
                        {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">Confirm password</label>
                    <input
                      id="confirm-password"
                      type={passwordVisible ? 'text' : 'password'}
                      name="confirm-password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className="h-11 w-full rounded-md border border-[#D4D4D4] bg-white px-3.5 text-sm outline-none transition focus:border-[#555555] focus:ring-2 focus:ring-[#202020]/10"
                      placeholder="Enter your password again"
                    />
                  </div>

                  {errorMessage && (
                    <p role="alert" className="rounded-md border border-[#E6C9C9] bg-[#FBF2F2] px-3.5 py-3 text-sm leading-5 text-[#8A3030]">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#2B2B2B] px-4 text-sm font-semibold text-white transition hover:bg-[#444444] disabled:cursor-wait disabled:opacity-60"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-[#666666]">
                  Prefer to start now? <Link to="/" className="font-semibold text-[#202020] underline underline-offset-4 hover:text-[#666666]">Build without an account</Link>
                </p>
                <p className="mt-8 text-center text-xs leading-5 text-[#8A8A8A]">
                  By creating an account, you agree to our <Link to="/terms" className="underline underline-offset-2 hover:text-[#202020]">Terms</Link> and <Link to="/privacy" className="underline underline-offset-2 hover:text-[#202020]">Privacy Policy</Link>.
                </p>
              </>
            )}
          </div>
        </div>

        <p className="text-xs text-[#8A8A8A]">© {new Date().getFullYear()} Create-Resumes</p>
      </section>

      <aside className="relative hidden min-h-screen overflow-hidden bg-[#292929] px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase text-[#C4C4C4]">A clearer way forward</p>
          <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight xl:text-[46px]">Make your experience easy to see.</h2>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[430px] rotate-[-2deg] rounded-sm bg-white p-8 text-[#202020] shadow-2xl xl:p-10">
          <div className="border-b border-[#E5E5E5] pb-5">
            <div className="h-3 w-36 rounded-sm bg-[#303030]" />
            <div className="mt-3 h-2 w-48 rounded-sm bg-[#B8B8B8]" />
            <div className="mt-4 flex gap-3">
              <div className="h-1.5 w-20 rounded-sm bg-[#D4D4D4]" />
              <div className="h-1.5 w-20 rounded-sm bg-[#D4D4D4]" />
              <div className="h-1.5 w-20 rounded-sm bg-[#D4D4D4]" />
            </div>
          </div>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-[9px] font-bold uppercase text-[#555555]">Experience</p>
              <div className="mt-2 h-2 w-40 rounded-sm bg-[#505050]" />
              <div className="mt-2 h-1.5 w-full rounded-sm bg-[#D4D4D4]" />
              <div className="mt-1.5 h-1.5 w-[88%] rounded-sm bg-[#D4D4D4]" />
              <div className="mt-1.5 h-1.5 w-[72%] rounded-sm bg-[#D4D4D4]" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase text-[#555555]">Selected work</p>
              <div className="mt-2 h-2 w-32 rounded-sm bg-[#505050]" />
              <div className="mt-2 h-1.5 w-full rounded-sm bg-[#D4D4D4]" />
              <div className="mt-1.5 h-1.5 w-[80%] rounded-sm bg-[#D4D4D4]" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase text-[#555555]">Education</p>
              <div className="mt-2 h-2 w-36 rounded-sm bg-[#505050]" />
              <div className="mt-2 h-1.5 w-[75%] rounded-sm bg-[#D4D4D4]" />
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-[#B8B8B8]">Your story, thoughtfully put together.</p>
      </aside>
    </main>
  );
}