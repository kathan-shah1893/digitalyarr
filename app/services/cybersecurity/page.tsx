import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Check, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

const SERVICE_NAME = "Cybersecurity";
const SERVICE_PATH = "/services/cybersecurity";
const SERVICE_DESCRIPTION =
  "Cybersecurity services in Ahmedabad & Gandhinagar — vulnerability assessment, penetration testing (VAPT), security hardening, endpoint security, and monitoring to reduce your organization's risk exposure.";

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  alternates: { canonical: SERVICE_PATH },
};

const features = [
  "Vulnerability Assessment & Penetration Testing (VAPT)",
  "Security assessment",
  "Network and application security",
  "Security hardening",
  "Endpoint security",
  "Security monitoring and remediation",
];

const details = [
  {
    title: "Vulnerability Assessment & Penetration Testing",
    description:
      "Structured VAPT engagements that identify exploitable vulnerabilities in your network, applications, and infrastructure before malicious actors can.",
  },
  {
    title: "Security Assessment",
    description:
      "A thorough review of your current security posture — policies, controls, configurations, and practices — with clear, prioritized findings.",
  },
  {
    title: "Network & Application Security",
    description:
      "Assessment and hardening of network configurations, firewall rules, and application-layer controls to reduce your attack surface.",
  },
  {
    title: "Security Hardening",
    description:
      "Baseline hardening of servers, endpoints, and applications following industry standards to reduce risk across your environment.",
  },
  {
    title: "Endpoint Security",
    description:
      "Review and improvement of endpoint protection across your device fleet — ensuring visibility, control, and consistent protection.",
  },
  {
    title: "Security Monitoring & Remediation",
    description:
      "Ongoing monitoring for security events and anomalies, with defined processes for investigation and remediation when issues arise.",
  },
];

export default function CybersecurityPage() {
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
            <span className="text-accent">Cybersecurity</span>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-4">Secure</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Cybersecurity
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Identify, reduce, and manage security risks across your network, applications, and endpoints.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="Security is not optional."
                subtitle="DigitalYarr delivers structured security assessments, penetration testing, and remediation support to help organizations understand their exposure and take targeted action to reduce risk — without unnecessary complexity."
              />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Discuss Security Requirements
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield size={22} className="text-primary" />
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

      <CTASection
        title="Ready to assess your security posture?"
        subtitle="Talk to DigitalYarr about a security assessment or VAPT engagement for your organization."
        primaryLabel="Start a Conversation"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
