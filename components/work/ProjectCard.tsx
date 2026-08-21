"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/validation/project-schema";

function CategoryDot({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    "Web Development": "bg-primary",
    "Mobile Apps": "bg-accent",
    "Cloud Solutions": "bg-blue-400",
    "DevOps & CI/CD": "bg-emerald-400",
    "AI & Automation": "bg-violet-400",
    "Cybersecurity": "bg-red-400",
    "Other": "bg-white/40",
  };
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colorMap[category] ?? "bg-white/40"}`}
    />
  );
}

function ImagePlaceholder({ title, category }: { title: string; category: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-navy-700 via-navy-800 to-navy">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
        <span className="text-xl font-bold text-primary/50">DY</span>
      </div>
      <p className="text-xs text-white/20 text-center px-4 leading-tight">{category}</p>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.1,
        ease: [0.33, 1, 0.68, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-navy-800 hover:border-primary/40 transition-colors flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-navy-800 flex-shrink-0">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder title={project.title} category={project.category} />
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-navy/85 text-white/80 backdrop-blur-sm rounded-full border border-white/10">
            <CategoryDot category={project.category} />
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 text-xs font-bold bg-primary text-white rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-xs text-white/40">
          <span>{project.year}</span>
          {project.industry && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
              <span>{project.industry}</span>
            </>
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {project.title}
        </h3>

        <p className="text-sm text-white/55 leading-relaxed mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Technologies — min-h prevents height jumps when few/no tags */}
        <div className="flex flex-wrap gap-1.5 min-h-[26px] mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-medium bg-white/5 text-white/50 rounded border border-white/8 h-[22px] flex items-center"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-[11px] font-medium bg-white/5 text-white/35 rounded border border-white/8 h-[22px] flex items-center">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Spacer — absorbs remaining height, keeps CTA pinned to bottom */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8 mt-4">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            View Project
            <motion.span
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
              className="flex items-center"
            >
              <ArrowRight size={14} />
            </motion.span>
          </Link>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/70 transition-colors"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <Github size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/70 transition-colors"
                aria-label={`Live site for ${project.title}`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
