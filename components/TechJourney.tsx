"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Code2,
  Network,
  Cloud,
  Shield,
  Bot,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";

const items = [
  {
    step: "01",
    tagline: "Build",
    title: "Software Development",
    desc: "Design and engineer robust digital products.",
    href: "/services/software-development",
    Icon: Code2,
    accent: "#2563EB",
  },
  {
    step: "02",
    tagline: "Connect",
    title: "API & Integration",
    desc: "Seamlessly connect systems, data and services.",
    href: "/services/api-integration",
    Icon: Network,
    accent: "#06B6D4",
  },
  {
    step: "03",
    tagline: "Cloud",
    title: "Cloud & Infrastructure",
    desc: "Scale with cloud-native architecture.",
    href: "/services/cloud-infrastructure",
    Icon: Cloud,
    accent: "#2563EB",
  },
  {
    step: "04",
    tagline: "Secure",
    title: "Cybersecurity",
    desc: "Protect systems with enterprise-grade security.",
    href: "/services/cybersecurity",
    Icon: Shield,
    accent: "#06B6D4",
  },
  {
    step: "05",
    tagline: "Automate",
    title: "AI & Automation",
    desc: "Streamline operations with AI and automation.",
    href: "/services/ai-automation",
    Icon: Bot,
    accent: "#2563EB",
  },
  {
    step: "06",
    tagline: "Manage",
    title: "Managed IT",
    desc: "24/7 monitoring and managed IT support.",
    href: "/services/managed-it",
    Icon: LifeBuoy,
    accent: "#06B6D4",
  },
];

function TechNode({
  item,
  index,
  reduce,
}: {
  item: (typeof items)[0];
  index: number;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px 0px" });
  const isBlue = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : reduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: reduce ? 0 : index * 0.09, ease: [0.33, 1, 0.68, 1] }}
      className="flex flex-col items-center text-center group"
    >
      {/* Step badge */}
      <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center mb-3 relative z-10">
        <span className="text-[9px] font-bold text-white/30">{item.step}</span>
      </div>

      {/* Icon container */}
      <motion.div
        animate={
          active
            ? {
                backgroundColor: isBlue ? "rgba(37,99,235,0.18)" : "rgba(6,182,212,0.14)",
                borderColor: isBlue ? "rgba(37,99,235,0.5)" : "rgba(6,182,212,0.5)",
                boxShadow: active
                  ? isBlue
                    ? "0 0 20px rgba(37,99,235,0.2), 0 0 40px rgba(37,99,235,0.08)"
                    : "0 0 20px rgba(6,182,212,0.15), 0 0 40px rgba(6,182,212,0.06)"
                  : "none",
              }
            : {
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.10)",
                boxShadow: "none",
              }
        }
        transition={{ duration: 0.45, delay: index * 0.09 + 0.2, ease: "easeOut" }}
        className="w-16 h-16 rounded-2xl border flex items-center justify-center mb-4 relative z-10 bg-white/4 transition-all"
      >
        <motion.span
          animate={
            active
              ? { color: isBlue ? "#3b82f6" : "#06B6D4", scale: 1 }
              : { color: "rgba(255,255,255,0.28)", scale: 0.9 }
          }
          transition={{ duration: 0.4, delay: index * 0.09 + 0.25 }}
          className="flex items-center justify-center"
        >
          <item.Icon size={24} />
        </motion.span>
      </motion.div>

      {/* Tagline */}
      <motion.span
        animate={active ? { color: isBlue ? "#3b82f6" : "#06B6D4" } : { color: "rgba(255,255,255,0.25)" }}
        transition={{ duration: 0.4, delay: index * 0.09 + 0.3 }}
        className="text-[10px] font-black uppercase tracking-[2.5px] mb-1.5"
      >
        {item.tagline}
      </motion.span>

      <h3 className="text-sm font-bold text-white/85 mb-1.5 leading-snug hidden sm:block">
        {item.title}
      </h3>

      <p className="text-[11px] text-white/38 leading-relaxed mb-3 hidden md:block max-w-[130px]">
        {item.desc}
      </p>

      <Link
        href={item.href}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/30 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
        aria-label={`Learn about ${item.title}`}
      >
        Explore
        <ArrowRight size={10} />
      </Link>
    </motion.div>
  );
}

export default function TechJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="mt-14">
      {/* Desktop: horizontal row with illuminating line */}
      <div className="hidden lg:block relative">
        {/* Track (background) line */}
        <div
          className="absolute top-[5.5rem] left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-white/6"
          aria-hidden="true"
        />
        {/* Animated glow dots along the track */}
        <div
          className="absolute top-[5.5rem] left-[calc(100%/12)] right-[calc(100%/12)] h-px"
          aria-hidden="true"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(37,99,235,0.05) 0px, rgba(37,99,235,0.05) 4px, transparent 4px, transparent 20px)",
          }}
        />
        {/* Scroll-linked progress line */}
        {!reduce && (
          <motion.div
            className="absolute top-[5.5rem] left-[calc(100%/12)] right-[calc(100%/12)] h-px origin-left"
            style={{
              scaleX,
              background: "linear-gradient(90deg, #2563EB 0%, #06B6D4 50%, #2563EB 100%)",
              boxShadow: "0 0 8px rgba(37,99,235,0.5)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="grid grid-cols-6 gap-4">
          {items.map((item, i) => (
            <TechNode key={item.tagline} item={item} index={i} reduce={reduce} />
          ))}
        </div>
      </div>

      {/* Mobile / tablet: 2-3 col grid */}
      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <TechNode key={item.tagline} item={item} index={i} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}
