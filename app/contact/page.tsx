import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — IT Company in Ahmedabad & Gandhinagar",
  description:
    "Contact DigitalYarr in Ahmedabad & Gandhinagar to start a technology project or discuss your requirements. Call +91 98981 17731 or email support@digitalyarr.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* Page header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Start a Project
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Have a technology challenge? Tell us about it — DigitalYarr will discuss how we can
            help you build, connect, secure, automate, and manage your technology.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left sidebar */}
            <div className="lg:col-span-2 space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Let&apos;s discuss your requirements.
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  Whether you are starting a new project, migrating to cloud, securing your
                  organisation, or looking for ongoing IT support — DigitalYarr is ready to help.
                </p>
              </div>

              {/* Direct contact details */}
              <div className="rounded-2xl border border-border bg-white p-6 space-y-4">
                <h3 className="text-sm font-bold text-navy">Direct enquiries</h3>

                <a
                  href="tel:+919898117731"
                  className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  aria-label="Call DigitalYarr"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-navy group-hover:text-primary transition-colors">
                      +91 98981 17731
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:support@digitalyarr.com"
                  className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  aria-label="Email DigitalYarr"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5">Email</p>
                    <p className="text-sm font-medium text-navy group-hover:text-primary transition-colors">
                      support@digitalyarr.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5">Location</p>
                    <p className="text-sm font-medium text-navy">
                      Ahmedabad, Gujarat, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Areas served — local SEO signal */}
              <p className="text-sm text-muted leading-relaxed">
                Based in <span className="font-medium text-navy">Ahmedabad</span>, DigitalYarr
                serves businesses across <span className="font-medium text-navy">Ahmedabad</span>,{" "}
                <span className="font-medium text-navy">Gandhinagar</span> and the wider Gujarat
                region — and works with clients remotely across India.
              </p>

              {/* What to expect */}
              <div className="space-y-5">
                {[
                  {
                    Icon: MessageSquare,
                    title: "Tell us about your project",
                    desc: "Describe your technology challenge, the service you need, and your timeline — the more context, the better we can help.",
                  },
                  {
                    Icon: Mail,
                    title: "We’ll respond promptly",
                    desc: "A member of the DigitalYarr team will be in touch to discuss your requirements and how we can help.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.Icon size={18} className="text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy mb-1">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Services quick reference */}
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="text-sm font-bold text-navy mb-4">We can help with</h3>
                <ul className="space-y-2" role="list">
                  {[
                    "Software & Application Development",
                    "API & Integration",
                    "Cloud & Infrastructure",
                    "Cybersecurity",
                    "AI & Automation",
                    "IT Support & Managed Services",
                    "Identity & Access Management",
                  ].map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-muted">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-border p-8 sm:p-10">
                <h2 className="text-xl font-bold text-navy mb-7">Project Enquiry</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
