import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Check, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

const SERVICE_NAME = "Software & Application Development";
const SERVICE_PATH = "/services/software-development";
const SERVICE_DESCRIPTION =
  "Custom software & application development in Ahmedabad & Gandhinagar — web apps, mobile apps, API development, legacy modernization, and database design for businesses across Gujarat.";

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  alternates: { canonical: SERVICE_PATH },
};

const features = [
  "Custom software development",
  "Web application development",
  "Mobile app development",
  "API development & integration",
  "Legacy application modernization",
  "Database design and development",
];

const details = [
  {
    title: "Custom Software Development",
    description:
      "Business-specific software built from the ground up — designed to solve the exact problems your organization faces, not a generic product stretched to fit.",
  },
  {
    title: "Web Application Development",
    description:
      "Scalable, performant web applications built with modern frameworks and architectures. From internal tools to customer-facing platforms.",
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android, designed for real users with real workflows.",
  },
  {
    title: "API Development & Integration",
    description:
      "Well-designed APIs that expose your business logic cleanly, enabling integration with third-party services and partner systems.",
  },
  {
    title: "Legacy Application Modernization",
    description:
      "Structured assessment and modernization of aging applications — reducing technical debt without disrupting the operations that depend on them.",
  },
  {
    title: "Database Design and Development",
    description:
      "Relational and NoSQL database design, optimization, and migration to support reliable data management at any scale.",
  },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: SERVICE_NAME,
          description: SERVICE_DESCRIPTION,
          path: SERVICE_PATH,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SERVICE_NAME, path: SERVICE_PATH },
        ])}
      />

      {/* Header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-accent">Software Development</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Build</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Software & Application Development
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            From concept through deployment — custom software built precisely to your business requirements.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="Technology built around your business."
                subtitle="DigitalYarr designs and builds custom software that solves real business problems. We work across web, mobile, and backend platforms to deliver scalable, maintainable applications your team can rely on — long after the initial build."
              />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Start a Project
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Code2 size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-5">What&apos;s included</h3>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detail cards */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="What we deliver"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 bg-white transition-all"
              >
                <h3 className="text-base font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
