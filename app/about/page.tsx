import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";
import SectionHeading from "@/components/SectionHeading";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About DigitalYarr",
  description:
    "About DigitalYarr — an end-to-end technology partner in Ahmedabad & Gandhinagar delivering software development, cloud, cybersecurity, AI automation, and managed IT services across Gujarat.",
  alternates: { canonical: "/about" },
};

const differentiators = [
  {
    title: "One Partner",
    description:
      "A single accountable technology partner instead of coordinating multiple vendors across development, cloud, security, and support.",
  },
  {
    title: "End-to-End Capability",
    description:
      "Technology support across the complete lifecycle — from initial build through integration, deployment, security, and ongoing management.",
  },
  {
    title: "Business-Focused",
    description:
      "Solutions designed around individual business requirements. Every engagement starts with understanding your specific challenge, not applying a generic template.",
  },
  {
    title: "Scalable",
    description:
      "Technology that is designed to evolve. Solutions are built with growth in mind, so your technology investment remains relevant as your organization scales.",
  },
];

const capabilities = [
  { tagline: "Build", title: "Software Development", href: "/services/software-development" },
  { tagline: "Connect", title: "API & Integration", href: "/services/api-integration" },
  { tagline: "Cloud", title: "Cloud & Infrastructure", href: "/services/cloud-infrastructure" },
  { tagline: "Secure", title: "Cybersecurity", href: "/services/cybersecurity" },
  { tagline: "Automate", title: "AI & Automation", href: "/services/ai-automation" },
  { tagline: "Manage", title: "Managed IT", href: "/services/managed-it" },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">About</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Your End-to-End Technology Partner
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            DigitalYarr is a technology solutions partner built around one principle — that businesses deserve a single, capable partner for their complete technology journey.
          </p>
        </div>
      </section>

      {/* Mission / positioning */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Logo + brand */}
            <div className="flex flex-col items-start gap-8">
              <div className="bg-white border border-border rounded-2xl p-10 flex items-center justify-center w-full">
                <Logo variant="stacked" width={160} />
              </div>
              <p className="text-sm text-muted leading-relaxed">
                The DigitalYarr name reflects our commitment to navigation — helping businesses chart a clear course through the complexity of modern technology.
              </p>
            </div>

            {/* Copy */}
            <div>
              <SectionHeading
                eyebrow="Who We Are"
                title="One partner for the complete technology lifecycle."
                subtitle="Technology is most effective when it works together — when the software connects to the cloud, the cloud is secured, the security is monitored, and the systems are supported. Fragmentation breaks that chain."
              />
              <p className="text-muted leading-relaxed mb-6">
                DigitalYarr was built to eliminate that fragmentation. Instead of coordinating separate vendors for development, infrastructure, security, automation, and support, organizations work with one partner that covers the entire journey.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                This integrated approach means more coherent technology decisions, faster delivery, and a single team that understands your environment end to end.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Explore Our Services
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why DigitalYarr */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why DigitalYarr"
            title={`Technology shouldn't\nfeel fragmented.`}
            subtitle="Four reasons organizations choose DigitalYarr as their technology partner."
            centered
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-2xl bg-navy-700 border border-white/8 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0" />
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Capabilities"
            title="Six disciplines. One team."
            subtitle="From the initial build through to ongoing management — DigitalYarr covers every stage."
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {capabilities.map((cap) => (
              <Link
                key={cap.href}
                href={cap.href}
                className="group p-5 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all text-center"
              >
                <span className="block text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                  {cap.tagline}
                </span>
                <span className="block text-sm font-medium text-navy group-hover:text-primary transition-colors">
                  {cap.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="A structured process from start to ongoing."
            subtitle="Every DigitalYarr engagement follows a clear, structured process."
            centered
          />
          <ProcessSteps />
        </div>
      </section>

      <CTASection
        title="Ready to work with DigitalYarr?"
        subtitle="Tell us about your technology challenge. We'll discuss how to help."
        primaryLabel="Start a Project"
        secondaryLabel="View Packages"
        secondaryHref="/packages"
      />
    </>
  );
}
