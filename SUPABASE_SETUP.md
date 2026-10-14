# Supabase setup for Create-Resume UI

This document explains how to configure Supabase so the signup flow (src/pages/Signup.tsx) works locally and in production.

Summary
- The app uses the client-side Supabase JS library via src/lib/supabase.ts.
- The Vite client needs two environment variables exposed to the browser:
  - VITE_SUPABASE_URL — your Supabase project URL (e.g. https://abcd1234.supabase.co)
  - VITE_SUPABASE_PUBLISHABLE_KEY — the anon / public "anon" key for your project

Quick local setup
1. Create a Supabase project at https://app.supabase.com
2. In the project, go to Settings → API and copy:
   - Project URL (use as VITE_SUPABASE_URL)
   - anon/public API key (use as VITE_SUPABASE_PUBLISHABLE_KEY)
3. (Optional, recommended) Configure Email settings so Supabase can send confirmation emails:
   - Settings → Email → set SMTP provider (or use the built-in provider). If you rely on confirmation emails, ensure SMTP is configured.
4. Create a local .env file at the project root (not checked into git). Example:

VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-publishable-key"

5. Start the dev server: npm run dev (Vite will expose VITE_ prefixed vars to the client)
6. Open /signup and try creating an account. The app calls supabase.auth.signUp and will show a confirmation message if configured.

Notes for production / hosting (Vercel, Netlify, Cloud Run, etc.)
- Set the same environment variables in your hosting provider's environment settings (do NOT use service_role keys in the browser).
- Use the anon/public key (not the service_role key). The service_role key has full privileges and must remain server-side only.
- If you use email confirmations, configure Supabase SMTP in the project settings and set the "SITE URL" (Settings → Auth → Site URL) to your deployed site URL so confirmation links point to the right place.
- If you want to allow OAuth providers (Google/GitHub), configure them in Supabase Auth and set the correct redirect URIs.

Security and privacy
- Vite exposes only variables prefixed with VITE_ to client-side code. Keep server-only secrets off the client and use a backend if you need service_role keys.
- The frontend currently stores resume drafts in local storage and does not sync resume content to Supabase by default. The signup flow only creates an authenticated user; if you plan to persist user data, add server-side API endpoints and avoid exposing the service_role key in the frontend.

Troubleshooting
- "Account creation is not configured yet": this message comes from src/pages/Signup.tsx when the supabase client is null (missing env vars). Verify VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set and redeploy.
- Confirmation emails not received: check Supabase Email settings (SMTP), verify the Site URL, and check the project's Logs → Auth to see errors.
- CORS or 401 errors: ensure the project URL matches and that you're using the anon key.

Related files
- src/lib/supabase.ts — the Supabase client uses import.meta.env.VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.
- src/pages/Signup.tsx — signup form; calls supabase.auth.signUp
- .env.example — example environment variables (updated in repo root)

If you'd like, I can:
- Add a small runtime check UI that explains missing env vars more verbosely,
- Wire signup to persist user profiles into a Supabase table (serverless function + row-level security), or
- Configure OAuth provider docs for Google/GitHub and example redirect URIs.

