import { Link } from 'react-router-dom';
import { StaticPageLayout } from '../components/StaticPageLayout';

const questions = [
  {
    question: 'Do I need to sign up or create an account?',
    answer: 'No. You can start building a resume right away. There are no accounts, registration forms, or email sign-up required.',
  },
  {
    question: 'Is Create Resume open source?',
    answer: <>Yes. The frontend source code is publicly available on <a className="underline underline-offset-2 hover:text-[#202020]" href="https://github.com/Gitanuj993/create-resume-ui" target="_blank" rel="noreferrer">GitHub</a>. The PDF generation backend is maintained in a separate <a className="underline underline-offset-2 hover:text-[#202020]" href="https://github.com/Gitanuj993/create-resume-backend" target="_blank" rel="noreferrer">repository</a>. Review each repository's license for the applicable reuse terms.</>,
  },
  {
    question: 'Do you collect my resume data?',
    answer: 'The resume builder does not upload your content while you edit. It saves your draft in this browser using local storage. If you choose to generate a PDF, your resume is sent to the configured PDF generation service to create it. Hosting providers may also process standard technical request data. See our Privacy page for details.',
  },
  {
    question: 'Where is my draft saved?',
    answer: 'Your draft is saved in local storage in the browser and on the device where you are using the app. It is not synced between devices. Clearing this site’s browser storage or switching browsers can remove or make the draft unavailable.',
  },
  {
    question: 'How do I download a PDF?',
    answer: 'Complete your resume, open the review step, and choose the PDF generation action. This sends the resume data to the configured backend and downloads the generated PDF. PDF generation requires that service to be available.',
  },
  {
    question: 'Can I create more than one resume?',
    answer: 'Yes. There is no resume count limit in the app. Your current draft is stored in the current browser; download a copy before replacing it if you want to keep multiple versions.',
  },
  {
    question: 'How can I delete my saved draft?',
    answer: 'Use Reset in the builder to clear the current resume, or clear this site’s local storage in your browser settings. Reset affects the draft in this browser; it does not delete files you have already downloaded.',
  },
  {
    question: 'How can I report a problem or contribute?',
    answer: <>Use the <Link className="underline underline-offset-2 hover:text-[#202020]" to="/contact">Contact page</Link> to get in touch, or open an issue or pull request in the public GitHub repository.</>,
  },
];

export const Faq = () => (
  <StaticPageLayout title="Frequently Asked Questions" description="Quick answers about creating, saving, and exporting your resume.">
    <section aria-label="Frequently asked questions" className="divide-y divide-[#D4D4D4] border-y border-[#D4D4D4]">
      {questions.map(({ question, answer }) => (
        <details key={question} className="group py-5">
          <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-[#202020] marker:hidden after:float-right after:-mr-8 after:text-xl after:leading-none after:content-['+'] group-open:after:content-['−']">
            {question}
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#666666]">{answer}</p>
        </details>
      ))}
    </section>
  </StaticPageLayout>
);