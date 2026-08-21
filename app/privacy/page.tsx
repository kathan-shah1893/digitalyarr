import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "DigitalYarr's Privacy Policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "17 August 2026";

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">

            <p className="text-muted leading-relaxed text-sm">
              DigitalYarr (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard personal information when you visit our website{" "}
              <strong className="text-navy">digitalyarr.com</strong> or submit an enquiry to us.
              Please read this policy carefully. By using our Site, you consent to the practices
              described in this Policy.
            </p>

            <LegalSection title="1. Information We Collect">
              <p>
                We may collect the following categories of personal information from you:
              </p>
              <ul>
                <li>
                  <strong>Contact information</strong> — your name, company name, email address,
                  and phone number provided through enquiry forms.
                </li>
                <li>
                  <strong>Project information</strong> — details about your technology requirements,
                  estimated budget, and project timeline that you voluntarily provide.
                </li>
                <li>
                  <strong>Usage data</strong> — standard server log data including your IP address,
                  browser type, referring URL, and pages visited, collected automatically when you
                  access the Site.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and discuss your technology requirements.</li>
                <li>Provide, operate, and improve our services and website.</li>
                <li>Send you information relevant to your enquiry or engagement.</li>
                <li>Comply with legal obligations.</li>
                <li>Detect and prevent fraud or abuse of our services.</li>
              </ul>
              <p>
                We will not use your personal information for unsolicited marketing communications
                without your explicit consent.
              </p>
            </LegalSection>

            <LegalSection title="3. Legal Basis for Processing">
              <p>
                We process your personal information on the following legal bases:
              </p>
              <ul>
                <li>
                  <strong>Consent</strong> — where you have given us consent by submitting an
                  enquiry form and agreeing to this Privacy Policy.
                </li>
                <li>
                  <strong>Legitimate interests</strong> — where processing is necessary for our
                  legitimate business interests, such as responding to business enquiries.
                </li>
                <li>
                  <strong>Legal obligation</strong> — where we are required to process information
                  to comply with applicable law.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Sharing of Information">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We
                may share information with trusted service providers who assist us in operating
                our website and delivering our services, subject to confidentiality agreements.
                We may also disclose information when required by law or to protect the rights,
                property, or safety of DigitalYarr, our clients, or others.
              </p>
            </LegalSection>

            <LegalSection title="5. Data Retention">
              <p>
                We retain personal information for as long as is necessary to fulfil the purposes
                for which it was collected, or as required by applicable law. Enquiry data is
                retained for the duration of a business relationship and for a reasonable period
                thereafter for legitimate business and legal purposes.
              </p>
            </LegalSection>

            <LegalSection title="6. Data Security">
              <p>
                We implement appropriate technical and organisational measures to protect your
                personal information from unauthorised access, disclosure, alteration, or
                destruction. However, no method of transmission over the internet or electronic
                storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </LegalSection>

            <LegalSection title="7. Cookies">
              <p>
                This Site may use cookies and similar tracking technologies to enhance your
                experience. Cookies are small data files placed on your device. You can control
                or disable cookies through your browser settings, though this may affect certain
                Site functionality.
              </p>
            </LegalSection>

            <LegalSection title="8. Your Rights">
              <p>
                Depending on your jurisdiction, you may have the following rights regarding your
                personal information:
              </p>
              <ul>
                <li>The right to access the personal information we hold about you.</li>
                <li>The right to request correction of inaccurate information.</li>
                <li>The right to request deletion of your personal information.</li>
                <li>The right to withdraw consent at any time (where processing is based on consent).</li>
                <li>The right to object to or restrict our processing of your information.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the details below.
              </p>
            </LegalSection>

            <LegalSection title="9. Third-Party Websites">
              <p>
                Our Site may contain links to third-party websites. This Privacy Policy applies
                only to our Site. We are not responsible for the privacy practices of any
                third-party websites and encourage you to review their privacy policies.
              </p>
            </LegalSection>

            <LegalSection title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise
                the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to
                review this Policy periodically to stay informed about how we protect your
                information.
              </p>
            </LegalSection>

            <LegalSection title="11. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy,
                please contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@digitalyarr.com"
                    className="text-primary hover:text-primary-dark underline underline-offset-2"
                  >
                    support@digitalyarr.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+919898117731"
                    className="text-primary hover:text-primary-dark underline underline-offset-2"
                  >
                    +91 98981 17731
                  </a>
                </li>
              </ul>
            </LegalSection>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/terms"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Terms &amp; Conditions →
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Contact DigitalYarr →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-navy mb-3">{title}</h2>
      <div className="space-y-3 text-muted leading-relaxed text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </div>
  );
}
