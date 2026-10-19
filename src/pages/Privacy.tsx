
import { Link } from 'react-router-dom';
import { StaticPageLayout } from '../components/StaticPageLayout';

export const Privacy = () => (
  <StaticPageLayout
    title="Privacy Policy"
    description="Your resume is personal. Learn how Create Resume handles your information."
  >
    <section>
      <h2 className="text-xl font-semibold mb-3">
        No account required
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        You can use the resume builder without creating an account
        or providing an email address. We aim to collect only the
        information necessary to provide and improve the service.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">
        Drafts stored in your browser
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        Your resume draft and title are automatically saved in
        your browser's local storage. They are not automatically
        synced to an account. Anyone with access to your browser
        profile or device may be able to access these drafts.
        Use Reset or clear this site's browser storage to remove
        locally saved data.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">
        PDF generation
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        When you request a PDF, your resume data is sent to our
        configured PDF generation backend to create the file.
        The backend and its hosting provider may process request
        data to provide this functionality. We do not intentionally
        retain resume drafts on the server after generation.
        Do not submit information you are uncomfortable sending
        to the service.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">
        Analytics and website usage
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        We may use Google Analytics 4 (GA4) to understand how
        visitors use Create Resume, including page visits,
        navigation patterns, and interactions with features.
        Depending on the configuration and your consent choices,
        Google Analytics may process information such as page
        URLs, referrer information, browser and device details,
        approximate location, cookies or online identifiers,
        and interaction events.
      </p>
      <p className="text-sm leading-6 text-[#666666] mt-3">
        We do not intentionally send resume text, names, email
        addresses, phone numbers, employment history, or other
        resume field values to Google Analytics. Analytics data
        is used to understand product usage and improve the
        service, not to store or generate resumes.
      </p>
      <p className="text-sm leading-6 text-[#666666] mt-3">
        Google processes information under its own privacy
        policies and applicable service terms. For more
        information, see the{' '}
        <a
          className="underline underline-offset-2 hover:text-[#202020]"
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Google Privacy Policy
        </a>.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">
        Hosting and third-party services
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        Our hosting provider, network infrastructure, and PDF
        generation service may process technical information
        necessary to operate, maintain, and secure the website.
        These providers handle information under their respective
        policies and service terms.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">
        Your privacy choices
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        You can remove a locally saved draft using Reset or by
        clearing this site's browser storage. Where analytics
        consent controls are provided, you can use them to manage
        your analytics preferences. You may also use browser
        settings or available Google opt-out tools. Blocking
        analytics does not prevent the core resume builder from
        working.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">
        Open source
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        The frontend source code is publicly available in our{' '}
        <a
          className="underline underline-offset-2 hover:text-[#202020]"
          href="https://github.com/Gitanuj993/create-resume-ui"
          target="_blank"
          rel="noreferrer"
        >
          GitHub repository
        </a>.
        See our <Link
          className="underline underline-offset-2 hover:text-[#202020]"
          to="/terms"
        >
          Terms
        </Link>{' '}
        for additional service conditions.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">
        Contact
      </h2>
      <p className="text-sm leading-6 text-[#666666]">
        For privacy-related questions or requests, visit our{' '}
        <Link
          className="underline underline-offset-2 hover:text-[#202020]"
          to="/contact"
        >
          Contact page
        </Link>.
      </p>
    </section>
  </StaticPageLayout>
);
          
