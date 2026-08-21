import type { Metadata } from "next";
import Link from "next/link";
import { LifeBuoy, Check, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

const SERVICE_NAME = "IT Support & Managed Services";
const SERVICE_PATH = "/services/managed-it";
const SERVICE_DESCRIPTION =
  "IT support & managed services in Ahmedabad & Gandhinagar — helpdesk, server management, Active Directory, and Microsoft 365 administration to keep your business running.";

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  alternates: { canonical: SERVICE_PATH },
};

const features = [
  "Helpdesk / IT support",
  "Server support",
  "Active Directory management",
  "User account management",
  "Access and permissions management",
  "Microsoft 365 / business application support",
  "Monitoring and maintenance",
];

const details = [
  {
    title: "Helpdesk & IT Support",
    description:
      "Responsive helpdesk support for your team — resolving day-to-day technology issues so your staff can focus on their work.",
  },
  {
    title: "Server Support",
    description:
      "Ongoing server management including patching, configuration, performance monitoring, and troubleshooting.",
  },
  {
    title: "Active Directory Management",
    description:
      "Structured management of your Active Directory environment — users, groups, policies, and organizational units maintained correctly.",
  },
  {
    title: "User Account Management",
    description:
      "Provisioning, deprovisioning, and lifecycle management of user accounts across your systems and applications.",
  },
  {
    title: "Access & Permissions Management",
    description:
      "Consistent management of access rights and permissions, ensuring users have appropriate access — and nothing more.",
  },
  {
    title: "Microsoft 365 & Application Support",
    description:
      "Administration and support for Microsoft 365, Exchange, SharePoint, Teams, and other business applications your organization relies on.",
  },
];

export default function ManagedITPage() {
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
            <span className="text-accent">Managed IT</span>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-4">Manage</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            IT Support & Managed Services
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Ongoing technology support and managed services so your business keeps running reliably.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="Your technology, reliably managed."
                subtitle="DigitalYarr provides structured IT support and managed services so businesses can focus on their core work. From helpdesk support to Active Directory management and Microsoft 365 administration, we keep your technology environment stable and your team productive."
              />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Discuss Managed IT
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <LifeBuoy size={22} className="text-primary" />
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
        title="Ready to simplify IT management?"
        subtitle="Talk to DigitalYarr about a managed IT arrangement suited to your organization's size and requirements."
        primaryLabel="Talk to Us"
        secondaryLabel="View Packages"
        secondaryHref="/packages"
      />
    </>
  );
}
