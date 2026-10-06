import { Github, Mail } from 'lucide-react';
import { StaticPageLayout } from '../components/StaticPageLayout';

export const Contact = () => (
  <StaticPageLayout title="Contact" description="Questions, feedback, and contributions are welcome.">
    <section className="flex flex-col gap-5">
      <a href="mailto:anujtawar42@gmail.com" className="inline-flex items-center gap-3 text-sm font-medium text-[#202020] hover:text-[#666666]">
        <Mail className="h-5 w-5" aria-hidden="true" />
        Email the project maintainer
      </a>
      <a href="https://github.com/Gitanuj993/create-resume-ui" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm font-medium text-[#202020] hover:text-[#666666]">
        <Github className="h-5 w-5" aria-hidden="true" />
        Report an issue or contribute on GitHub
      </a>
    </section>
  </StaticPageLayout>
);