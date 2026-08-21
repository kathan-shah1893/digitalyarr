import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Check, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

const SERVICE_NAME = "AI, ML & Automation";
const SERVICE_PATH = "/services/ai-automation";
const SERVICE_DESCRIPTION =
  "AI, ML & automation services in Ahmedabad & Gandhinagar — machine learning solutions, business process automation, chatbots, and data-driven applications to reduce manual work.";

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  alternates: { canonical: SERVICE_PATH },
};

const features = [
  "AI/ML solutions",
  "Business process automation",
  "AI-powered applications",
  "Workflow automation",
  "Chatbots and intelligent assistants",
  "Data-driven solutions",
];

const details = [
  {
    title: "AI & ML Solutions",
    description:
      "Machine learning models and AI systems designed for your specific data and business context — classification, prediction, recommendation, and more.",
  },
  {
    title: "Business Process Automation",
    description:
      "Identify repetitive, rule-based processes and automate them — freeing your team for higher-value work without increasing headcount.",
  },
  {
    title: "AI-Powered Applications",
    description:
      "Applications enhanced with AI capabilities — intelligent search, content generation, document processing, and decision support built in.",
  },
  {
    title: "Workflow Automation",
    description:
      "End-to-end workflow automation across teams and systems — eliminating manual handoffs, reducing errors, and accelerating throughput.",
  },
  {
    title: "Chatbots & Intelligent Assistants",
    description:
      "Conversational AI designed around your specific use cases — customer support, internal knowledge, triage, and guided processes.",
  },
  {
    title: "Data-Driven Solutions",
    description:
      "Pipelines and platforms that turn your raw data into structured insight — dashboards, automated reporting, and predictive analytics.",
  },
];

export default function AIAutomationPage() {
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
            <span className="text-accent">AI & Automation</span>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-4">Automate</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            AI, ML & Automation
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            Apply artificial intelligence and automation to reduce manual effort and make smarter business decisions.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="AI that's practical and results-driven."
                subtitle="DigitalYarr helps organizations identify where AI and automation can deliver the most value — then builds and deploys those solutions. We focus on practical implementations that reduce operational burden and improve outcomes."
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
                <Bot size={22} className="text-primary" />
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
