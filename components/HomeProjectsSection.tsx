"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/work/ProjectCard";
import type { Project } from "@/lib/validation/project-schema";

const CATEGORIES = [
  "All",
  "Web Development",
  "Mobile Apps",
  "Cloud Solutions",
  "AI & Automation",
];

export default function HomeProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-white border border-border text-muted hover:border-primary/30 hover:text-navy"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects grid — key change forces re-animation on filter */}
      <div
        key={active}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      >
        {filtered.length > 0 ? (
          filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-16 text-center"
          >
            <p className="text-muted text-sm">No projects in this category yet.</p>
          </motion.div>
        )}
      </div>

      {/* View All button */}
      <div className="flex justify-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-border hover:border-primary/35 bg-white hover:bg-surface text-navy font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm"
        >
          View All Projects
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
