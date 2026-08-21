import type { Metadata } from "next";
import Link from "next/link";
import { Network, Check, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

const SERVICE_NAME = "API & System Integration";
const SERVICE_PATH = "/services/api-integration";
const SERVICE_DESCRIPTION =
  "API development & system integration services in Ahmedabad & Gandhinagar — third-party integrations, database integration, and system-to-system connectivity for businesses across Gujarat.";

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  alternates: { canonical: SERVICE_PATH },
};

const features = [
  "API development",
  "Third-party integrations",
  "Database integration",
  "Connected business systems",
  "System-to-system integration",
  "Workflow data exchange",
];

const details = [
  {
    title: "API Development",
    description:
      "Well-structured RESTful and GraphQL APIs that expose your data and business logic cleanly, reliably, and securely to internal and external consumers.",
  },
  {
    title: "Third-Party Integrations",
    description:
      "Connect your platforms to payment gateways, CRM systems, ERP tools, communication platforms, and other services that your business already depends on.",
  },
  {
    title: "Database Integration",
    description:
      "Bridge your application layer and data stores — ensuring data flows correctly between systems, formats, and schemas.",
  },
  {
    title: "Connected Business Systems",
    description:
      "Link sales, operations, finance, and support tools so your teams work from consistent, up-to-date data across all platforms.",
  },
  {
    title: "System-to-System Integration",
    description:
      "Enterprise-grade integration between internal systems — ensuring data moves reliably and accurately across your technology stack.",
  },
  {
    title: "Workflow Data Exchange",
    description:
      "Automated data exchange triggers and pipelines that eliminate manual data entry and reduce operational overhead.",
  },
];

export default function APIIntegrationPage() {
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

      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-accent">API & Integration</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Connect</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            API & System Integration
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Connect your systems, data, and third-party services into a cohesive, reliable technology environment.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="Systems that talk to each other."
                subtitle="Modern businesses run on connected systems. DigitalYarr builds and integrates APIs that allow your platforms, third-party tools, and data sources to work together as a single, unified operation — eliminating data silos and manual overhead."
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
                <Network size={22} className="text-primary" />
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

      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Capabilities" title="What we deliver" />
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
