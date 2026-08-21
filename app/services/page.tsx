import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services, identityAccessService } from "@/data/services";

export const metadata: Metadata = {
  title: "IT Services in Ahmedabad & Gandhinagar",
  description:
    "End-to-end IT services in Ahmedabad & Gandhinagar — software development, API integration, cloud infrastructure, cybersecurity, AI automation, managed IT, and identity management for businesses across Gujarat.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            Services
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Complete Technology. Every Capability.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            DigitalYarr brings together six core technology disciplines under one integrated partner — so you can build, connect, secure, automate, and manage your technology without managing multiple vendors.
          </p>
        </div>
      </section>

      {/* Core services grid */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Services"
            title="Six disciplines. One partner."
            subtitle="Every service is delivered with a business-first mindset — focused on outcomes, not just technology outputs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                iconName={service.iconName}
                tagline={service.tagline}
                title={service.shortTitle}
                description={service.description}
                features={service.features}
                href={`/services/${service.slug}`}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Identity & Access Management */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Identity & Access
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-5 leading-tight">
                Identity & Access Management
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                {identityAccessService.longDescription}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Discuss Requirements
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Lock size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-6">What&apos;s included</h3>
              <ul className="space-y-4">
                {identityAccessService.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Not sure which service fits?"
        subtitle="Talk to DigitalYarr about your technology challenge. We'll identify the right approach and service combination for your requirements."
        primaryLabel="Start a Conversation"
        secondaryLabel="View Packages"
        secondaryHref="/packages"
      />
    </>
  );
}
