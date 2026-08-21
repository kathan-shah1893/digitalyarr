"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Code2,
  Network,
  Cloud,
  Shield,
  Bot,
  LifeBuoy,
  Lock,
  Smartphone,
  Zap,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  Network,
  Cloud,
  Shield,
  Bot,
  LifeBuoy,
  Lock,
  Smartphone,
  Zap,
};

interface ServiceCardProps {
  iconName: string;
  tagline: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  variant?: "default" | "dark";
  index?: number;
  compact?: boolean;
}

export default function ServiceCard({
  iconName,
  tagline,
  title,
  description,
  features,
  href,
  variant = "default",
  index = 0,
  compact = false,
}: ServiceCardProps) {
  const Icon = ICON_MAP[iconName] ?? Code2;
  const isDark = variant === "dark";
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: reduce ? 0 : (index % 3) * 0.1,
        ease: [0.33, 1, 0.68, 1],
      }}
      whileHover={reduce ? {} : { y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`group relative rounded-2xl p-7 sm:p-8 flex flex-col border transition-all duration-300 overflow-hidden ${
        isDark
          ? "bg-navy-800 border-white/8 hover:border-primary/45 hover:shadow-2xl hover:shadow-primary/10"
          : "bg-white border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/6"
      }`}
    >
      {/* Subtle corner glow on hover */}
      <div
        className={`absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none ${
          isDark ? "bg-primary/20" : "bg-primary/10"
        }`}
        aria-hidden="true"
      />

      {/* Tech grid texture */}
      <div
        className={`absolute inset-0 tech-grid-fine opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          isDark ? "opacity-20" : ""
        }`}
        aria-hidden="true"
      />

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
        aria-hidden="true"
      />

      {/* Icon + tagline row */}
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          whileHover={reduce ? {} : { scale: 1.1, transition: { duration: 0.18 } }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isDark
              ? "bg-gradient-to-br from-primary/15 to-accent/8 border border-primary/20"
              : "bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10"
          }`}
        >
          <Icon size={22} className="text-primary" />
        </motion.div>
        {!compact && (
          <span className="text-[10px] font-black uppercase tracking-[2.5px] text-accent">
            {tagline}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`text-xl font-bold mb-3 leading-snug transition-colors duration-200 ${
          isDark
            ? "text-white group-hover:text-primary-light"
            : "text-navy group-hover:text-primary"
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-5 ${compact ? "flex-1" : ""} ${isDark ? "text-white/55" : "text-muted"}`}>
        {description}
      </p>

      {/* Features — hidden in compact mode */}
      {!compact && (
        <ul className="space-y-2 flex-1 mb-6">
          {features.slice(0, 5).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span
                className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  isDark ? "bg-accent" : "bg-primary/60"
                }`}
              />
              <span className={`text-sm ${isDark ? "text-white/50" : "text-muted"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA link */}
      <Link
        href={href}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/link ${
          isDark
            ? "text-white/50 hover:text-accent"
            : "text-primary hover:text-primary-dark"
        }`}
        aria-label={`Learn more about ${title}`}
      >
        Learn more
        <motion.span
          className="flex items-center"
          whileHover={
            reduce ? {} : compact
              ? { x: 3, transition: { duration: 0.15 } }
              : { x: 2, y: -2, transition: { duration: 0.15 } }
          }
        >
          {compact ? <ArrowRight size={14} /> : <ArrowUpRight size={15} />}
        </motion.span>
      </Link>
    </motion.div>
  );
}
