"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProjectCard from "./ProjectCard";
import type { Project, ProjectCategory } from "@/lib/validation/project-schema";
import { PROJECT_CATEGORIES } from "@/lib/validation/project-schema";

const ALL = "All" as const;
type Filter = typeof ALL | ProjectCategory;

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>(ALL);

  const filtered =
    active === ALL ? projects : projects.filter((p) => p.category === active);

  // Only show categories that have published projects
  const available = new Set(projects.map((p) => p.category));
  const filters: Filter[] = [
    ALL,
    ...PROJECT_CATEGORIES.filter((c) => available.has(c)),
  ];

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2 mb-12"
        role="group"
        aria-label="Filter projects by category"
      >
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                isActive
                  ? "text-white"
                  : "bg-white/6 text-white/55 hover:text-white border border-white/10 hover:border-white/25"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-bg"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          );
        })}
      </div>

      {/* Count */}
      <p className="text-sm text-white/35 mb-8">
        {filtered.length === 1
          ? "1 project"
          : `${filtered.length} projects`}
        {active !== ALL && ` in ${active}`}
      </p>

      {/* Project grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/35 text-sm">No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
