"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

interface PackageCardProps {
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  includes: string[];
  highlighted?: boolean;
  index?: number;
}

export default function PackageCard({
  title,
  tagline,
  description,
  targetAudience,
  includes,
  highlighted = false,
  index = 0,
}: PackageCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: reduce ? 0 : (index % 3) * 0.1, ease: [0.33, 1, 0.68, 1] }}
      whileHover={reduce ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`relative rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        highlighted
          ? "bg-primary border border-primary shadow-2xl shadow-primary/25"
          : "bg-white border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
      }`}
    >
      {highlighted && (
        <div className="bg-accent text-navy text-xs font-bold uppercase tracking-wider text-center py-2">
          Most Popular
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-6">
          <p
            className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              highlighted ? "text-white/70" : "text-accent"
            }`}
          >
            {tagline}
          </p>
          <h3
            className={`text-xl font-bold mb-3 ${highlighted ? "text-white" : "text-navy"}`}
          >
            {title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${highlighted ? "text-white/75" : "text-muted"}`}
          >
            {description}
          </p>
        </div>

        {/* Target audience */}
        <div
          className={`text-xs mb-6 px-3 py-2 rounded-lg ${
            highlighted ? "bg-white/10 text-white/70" : "bg-surface text-muted"
          }`}
        >
          <span className="font-medium">Best for: </span>
          {targetAudience}
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-8">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check
                size={15}
                className={`mt-0.5 flex-shrink-0 ${
                  highlighted ? "text-white/80" : "text-primary"
                }`}
              />
              <span
                className={`text-sm ${highlighted ? "text-white/80" : "text-navy-600"}`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div whileHover={reduce ? {} : { scale: 1.01 }} whileTap={reduce ? {} : { scale: 0.98 }} transition={{ duration: 0.15 }}>
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all w-full ${
              highlighted
                ? "bg-white text-primary hover:bg-white/90 shadow-lg"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            Talk to Us
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
