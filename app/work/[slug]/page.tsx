import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, Building2 } from "lucide-react";
import { getProjectBySlug, getPublishedProjects } from "@/lib/project-service";
import CTASection from "@/components/CTASection";
import AnimateIn from "@/components/AnimateIn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.title} | DigitalYarr`,
      description: project.shortDescription,
      type: "article",
      images: project.image ? [{ url: project.image, alt: project.title }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-8">
            <Link href="/work" className="hover:text-white/70 transition-colors">
              Our Work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/60 truncate max-w-[200px]">{project.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 text-xs font-semibold bg-primary/15 text-primary border border-primary/25 rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-xs font-bold bg-accent/15 text-accent border border-accent/25 rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-8">
            {project.shortDescription}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
            {project.industry && (
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-accent" aria-hidden="true" />
                {project.industry}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-accent" aria-hidden="true" />
              {project.year}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent hover:text-accent-light transition-colors font-medium"
              >
                <ExternalLink size={14} />
                Live site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {project.image && (
        <div className="bg-navy-800 border-y border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-64 sm:h-96 lg:h-[480px] rounded-none overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} — project cover`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <AnimateIn>
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-4">Overview</h2>
                  <div className="text-muted leading-relaxed space-y-4">
                    {project.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {/* Challenge */}
              {project.challenge && (
                <AnimateIn delay={0.1}>
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-4">The Challenge</h2>
                    <p className="text-muted leading-relaxed">{project.challenge}</p>
                  </div>
                </AnimateIn>
              )}

              {/* Solution */}
              {project.solution && (
                <AnimateIn delay={0.1}>
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-4">Our Solution</h2>
                    <p className="text-muted leading-relaxed">{project.solution}</p>
                  </div>
                </AnimateIn>
              )}

              {/* Results */}
              {project.results.length > 0 && (
                <AnimateIn delay={0.1}>
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-6">Results</h2>
                    <ul className="space-y-3">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                          <span className="text-muted leading-relaxed">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
              )}

              {/* Gallery */}
              {project.gallery.length > 0 && (
                <AnimateIn delay={0.1}>
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.gallery.map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border border-border aspect-video bg-surface">
                          <img
                            src={img}
                            alt={`${project.title} — screenshot ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <AnimateIn delay={0.15}>
                {/* Technology stack */}
                <div className="rounded-2xl border border-border p-6">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-5">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium bg-surface text-navy-600 border border-border rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {/* Project details */}
              <AnimateIn delay={0.2}>
                <div className="rounded-2xl border border-border p-6 space-y-4">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-5">
                    Project Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Category</span>
                      <span className="font-medium text-navy text-right">{project.category}</span>
                    </div>
                    {project.industry && (
                      <div className="flex justify-between">
                        <span className="text-muted">Industry</span>
                        <span className="font-medium text-navy text-right">{project.industry}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted">Year</span>
                      <span className="font-medium text-navy">{project.year}</span>
                    </div>
                    {project.client && (
                      <div className="flex justify-between">
                        <span className="text-muted">Client</span>
                        <span className="font-medium text-navy text-right">{project.client}</span>
                      </div>
                    )}
                  </div>
                </div>
              </AnimateIn>

              {/* Links */}
              {(project.liveUrl || project.githubUrl) && (
                <AnimateIn delay={0.25}>
                  <div className="space-y-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        <ExternalLink size={15} />
                        View Live Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-border hover:border-primary/30 text-navy hover:text-primary text-sm font-semibold rounded-xl transition-all"
                      >
                        <Github size={15} />
                        View on GitHub
                      </a>
                    )}
                  </div>
                </AnimateIn>
              )}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-16 pt-10 border-t border-border">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Our Work
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Like what you see?"
        subtitle="Tell us about your technology challenge. We will discuss how DigitalYarr can deliver the same quality for your project."
        primaryLabel="Start a Project"
        secondaryLabel="View All Work"
        secondaryHref="/work"
      />
    </>
  );
}
