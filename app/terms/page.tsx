import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing the use of DigitalYarr's website and technology services.",
  alternates: { canonical: "/terms" },
};

const lastUpdated = "17 August 2026";

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-white/50 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">

            <p className="text-muted leading-relaxed mb-8">
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the
              DigitalYarr website located at{" "}
              <strong className="text-navy">digitalyarr.com</strong> (the &ldquo;Site&rdquo;) and any
              services provided by <strong className="text-navy">DigitalYarr</strong>{" "}
              (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing this Site or
              submitting an enquiry, you agree to be bound by these Terms.
            </p>

            <LegalSection title="1. Use of the Website">
              <p>
                You may use this Site for lawful purposes only. You agree not to use the Site in
                any way that is unlawful, harmful, fraudulent, or that violates the rights of
                third parties. Unauthorised use of the Site, including but not limited to
                attempting to gain unauthorised access to any part of the Site or its related
                systems, is strictly prohibited.
              </p>
            </LegalSection>

            <LegalSection title="2. Intellectual Property">
              <p>
                All content on this Site, including but not limited to text, graphics, logos,
                images, icons, and software, is the property of DigitalYarr or its content
                suppliers and is protected by applicable intellectual property laws. You may not
                reproduce, distribute, modify, or create derivative works of any content from this
                Site without our prior written permission.
              </p>
            </LegalSection>

            <LegalSection title="3. Services and Enquiries">
              <p>
                Submission of an enquiry form on this Site does not constitute a binding contract
                or guarantee of services. All engagements, pricing, and deliverables are confirmed
                only through a separate written agreement between DigitalYarr and the client.
              </p>
              <p>
                DigitalYarr reserves the right to accept or decline any enquiry or engagement at
                its discretion.
              </p>
            </LegalSection>

            <LegalSection title="4. Accuracy of Information">
              <p>
                We endeavour to keep the information on this Site accurate and up to date.
                However, we make no warranty or representation, express or implied, regarding the
                completeness, accuracy, or fitness for a particular purpose of the information
                provided. Information on this Site should not be relied upon as professional
                advice without independent verification.
              </p>
            </LegalSection>

            <LegalSection title="5. Third-Party Links">
              <p>
                This Site may contain links to third-party websites. These links are provided for
                your convenience only. DigitalYarr does not endorse and is not responsible for the
                content, privacy practices, or accuracy of any third-party websites.
              </p>
            </LegalSection>

            <LegalSection title="6. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, DigitalYarr shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages arising
                from your use of or inability to use this Site, including any reliance on
                information obtained from this Site.
              </p>
            </LegalSection>

            <LegalSection title="7. Privacy">
              <p>
                Your use of this Site is also governed by our{" "}
                <Link href="/privacy" className="text-primary hover:text-primary-dark underline underline-offset-2">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
            </LegalSection>

            <LegalSection title="8. Modifications">
              <p>
                DigitalYarr reserves the right to modify these Terms at any time. Updated Terms
                will be posted on this page with a revised &ldquo;Last updated&rdquo; date.
                Continued use of the Site following any such changes constitutes your acceptance
                of the revised Terms.
              </p>
            </LegalSection>

            <LegalSection title="9. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of
                India. Any disputes arising in connection with these Terms shall be subject to the
                exclusive jurisdiction of the courts of India.
              </p>
            </LegalSection>

            <LegalSection title="10. Contact">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@digitalyarr.com"
                    className="text-primary hover:text-primary-dark"
                  >
                    support@digitalyarr.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+919898117731" className="text-primary hover:text-primary-dark">
                    +91 98981 17731
                  </a>
                </li>
              </ul>
            </LegalSection>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/privacy"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Privacy Policy →
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
    <div className="mb-8">
      <h2 className="text-lg font-bold text-navy mb-3">{title}</h2>
      <div className="space-y-3 text-muted leading-relaxed text-sm [&_a]:text-primary [&_a:hover]:text-primary-dark [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
