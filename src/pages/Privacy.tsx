import { Link } from 'react-router-dom';
import { StaticPageLayout } from '../components/StaticPageLayout';

export const Privacy = () => (
  <StaticPageLayout title="Privacy" description="Your resume is personal. Here is what happens to your information when you use Create Resume.">
    <section>
      <h2 className="text-xl font-semibold mb-3">No account or signup</h2>
      <p className="text-sm leading-6 text-[#666666]">Create Resume does not ask you to create an account or provide an email address to use the resume builder. The frontend does not send your resume content anywhere while you edit it.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Drafts stored in your browser</h2>
      <p className="text-sm leading-6 text-[#666666]">The app automatically saves your resume and title in this browser's local storage. This data stays on the device and browser you are using; it is not synced to an account. Anyone with access to your browser profile or device may be able to access it. You can use Reset or clear this site's browser storage to remove the saved draft.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">PDF generation</h2>
      <p className="text-sm leading-6 text-[#666666]">When you request a PDF, the resume data is sent to the configured PDF generation backend so it can create the file. The backend is a separate service; its operator and hosting provider may process the request to provide this feature. Do not include information you are not comfortable submitting for PDF generation. The frontend code does not keep a server-side copy of your draft.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Technical data and third parties</h2>
      <p className="text-sm leading-6 text-[#666666]">The website host and network infrastructure may process standard technical information, such as request metadata, to deliver and secure the site. Their handling is subject to their own policies. This project does not include a user account system or resume analytics in the frontend code.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Open source</h2>
      <p className="text-sm leading-6 text-[#666666]">The frontend source is publicly available in the <a className="underline underline-offset-2 hover:text-[#202020]" href="https://github.com/Gitanuj993/create-resume-ui" target="_blank" rel="noreferrer">GitHub repository</a>. See the <Link className="underline underline-offset-2 hover:text-[#202020]" to="/terms">Terms</Link> and repository license for more information.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Questions</h2>
      <p className="text-sm leading-6 text-[#666666]">For privacy questions, visit the <Link className="underline underline-offset-2 hover:text-[#202020]" to="/contact">Contact page</Link>.</p>
    </section>
  </StaticPageLayout>
);