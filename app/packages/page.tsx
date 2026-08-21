import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import CTASection from "@/components/CTASection";
import { packages, engagementModels } from "@/data/packages";

export const metadata: Metadata = {
  title: "Technology Packages in Ahmedabad & Gandhinagar",
  description:
    "DigitalYarr technology packages for businesses in Ahmedabad & Gandhinagar — Startup Launch, Digital Business, Cloud & Infrastructure, Cybersecurity, AI & Automation, and Managed IT.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Packages</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Technology packages for every stage.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            From launching a startup to managing enterprise technology infrastructure — DigitalYarr has a structured package that fits where you are today, with room to grow.
          </p>
        </div>
      </section>

      {/* Packages grid */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technology Packages"
            title="The right package for your stage."
            subtitle="Each package combines the services most relevant to a specific technology goal. Contact DigitalYarr to tailor any package to your exact requirements."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                title={pkg.title}
                tagline={pkg.tagline}
                description={pkg.description}
                targetAudience={pkg.targetAudience}
                includes={pkg.includes}
                highlighted={pkg.highlighted}
                index={i}
              />
            ))}
          </div>

          <p className="text-center text-sm text-muted mt-10">
            All packages are customizable.{" "}
            <Link href="/contact" className="text-primary hover:text-primary-dark font-medium transition-colors">
              Contact DigitalYarr
            </Link>{" "}
            to discuss your specific requirements.
          </p>
        </div>
      </section>

      {/* Enterprise Technology Partnership */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="Enterprise"
                title="Enterprise Technology Partnership"
                subtitle="For larger organizations that require dedicated, comprehensive technology support across multiple disciplines — combine any of DigitalYarr's services into a tailored enterprise engagement."
              />

              <div className="space-y-4 mt-2">
                <p className="text-sm text-muted leading-relaxed">
                  Enterprise engagements can combine software development, cloud infrastructure, cybersecurity, AI and automation, IT support, and identity management — under one strategic technology partnership with defined SLAs and dedicated resources.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-navy hover:bg-navy-700 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  Discuss an Enterprise Requirement
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-navy mb-5">Engagement models</h3>
              {engagementModels.map((model) => (
                <div
                  key={model.id}
                  className="flex gap-4 p-5 rounded-xl border border-border hover:border-primary/30 hover:bg-surface transition-all"
                >
                  <span className="w-1 flex-shrink-0 rounded-full bg-gradient-to-b from-primary to-accent" />
                  <div>
                    <h4 className="text-sm font-bold text-navy mb-1">{model.title}</h4>
                    <p className="text-sm text-muted leading-relaxed">{model.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-style note */}
      <section className="bg-surface py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted text-sm leading-relaxed">
            DigitalYarr does not publish fixed pricing — every engagement is scoped based on your specific requirements, team size, and complexity. All packages use a{" "}
            <strong className="text-navy font-medium">&ldquo;let&rsquo;s discuss your requirements&rdquo;</strong>{" "}
            model to ensure the solution and investment are aligned with your actual needs.
          </p>
        </div>
      </section>

      <CTASection
        title="Not sure which package fits?"
        subtitle="Talk to DigitalYarr. We'll identify the right service combination for your requirements and discuss an appropriate engagement model."
        primaryLabel="Talk to DigitalYarr"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
