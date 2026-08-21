import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedProjects } from "@/lib/project-service";
import ProjectsClient from "@/components/work/ProjectsClient";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore DigitalYarr's portfolio of technology projects — web development, mobile apps, cloud infrastructure, AI automation, and cybersecurity for clients in Ahmedabad, Gandhinagar & beyond.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            Our Work
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
            Digital products we&apos;re proud of.
          </h1>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            A selection of projects across software development, cloud infrastructure, AI
            automation, and more. Each project represents a real technology challenge solved
            for a real business.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <ProjectsClient projects={projects} />
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-primary/50">DY</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Case studies coming soon</h2>
              <p className="text-white/50 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                We are currently preparing detailed case studies. In the meantime, contact us
                to discuss your technology challenge and how we can help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Discuss Your Project
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Have a project in mind?"
        subtitle="Tell us about your technology challenge. We will discuss the best approach and how DigitalYarr can help."
        primaryLabel="Start a Project"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
