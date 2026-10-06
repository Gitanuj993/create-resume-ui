import { Link } from 'react-router-dom';
import { StaticPageLayout } from '../components/StaticPageLayout';

export const Terms = () => (
  <StaticPageLayout title="Terms of Use" description="A few practical terms for using this resume-building tool.">
    <section>
      <h2 className="text-xl font-semibold mb-3">Using the service</h2>
      <p className="text-sm leading-6 text-[#666666]">You may use Create Resume to prepare and export your own resume content. You are responsible for the accuracy, legality, and permissions for any information you enter, and for reviewing the generated document before using it.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Your content and downloads</h2>
      <p className="text-sm leading-6 text-[#666666]">You retain responsibility for your resume content. The app stores your working draft in your browser and sends it to the configured backend only when you request PDF generation. Keep your own copies of exported files and any drafts you need.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Availability and output</h2>
      <p className="text-sm leading-6 text-[#666666]">The app and PDF generation service are provided as available. Features may change or be unavailable, and generated output should be checked for accuracy and formatting. No guarantee is made that a resume will result in an interview, employment, or any particular outcome.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Open-source code</h2>
      <p className="text-sm leading-6 text-[#666666]">The source code is available in the <a className="underline underline-offset-2 hover:text-[#202020]" href="https://github.com/Gitanuj993/create-resume-ui" target="_blank" rel="noreferrer">public GitHub repository</a>. Reuse of the code is governed by the license included in that repository, if any; these terms do not replace it.</p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Related information</h2>
      <p className="text-sm leading-6 text-[#666666]">See the <Link className="underline underline-offset-2 hover:text-[#202020]" to="/privacy">Privacy page</Link> for how resume data is handled, or visit <Link className="underline underline-offset-2 hover:text-[#202020]" to="/contact">Contact</Link> with questions.</p>
    </section>
  </StaticPageLayout>
);