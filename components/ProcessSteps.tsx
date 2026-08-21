"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Search,
  Map,
  Code2,
  Network,
  Rocket,
  Shield,
  Bot,
  Settings,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business requirement, current environment, and desired outcome.",
    Icon: Search,
  },
  {
    number: "02",
    title: "Plan",
    description: "Define the solution architecture, approach, timeline, and success criteria.",
    Icon: Map,
  },
  {
    number: "03",
    title: "Build",
    description: "Develop and configure the technology to specification, with regular checkpoints.",
    Icon: Code2,
  },
  {
    number: "04",
    title: "Connect",
    description: "Integrate APIs, business systems, and workflows so everything works together.",
    Icon: Network,
  },
  {
    number: "05",
    title: "Deploy",
    description: "Deploy into the appropriate environment with proper testing and validation.",
    Icon: Rocket,
  },
  {
    number: "06",
    title: "Secure",
    description: "Apply security practices, hardening, and assessments appropriate to the solution.",
    Icon: Shield,
  },
  {
    number: "07",
    title: "Automate",
    description: "Identify and improve repetitive processes where automation adds value.",
    Icon: Bot,
  },
  {
    number: "08",
    title: "Manage",
    description: "Provide ongoing support, monitoring, and maintenance to keep systems running.",
    Icon: Settings,
  },
];

const ACCENT_COLORS = ["#2563EB", "#06B6D4", "#2563EB", "#06B6D4", "#2563EB", "#06B6D4", "#2563EB", "#06B6D4"];

export default function ProcessSteps() {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {steps.map((step, index) => {
        const accent = ACCENT_COLORS[index];
        const isBlue = index % 2 === 0;
        const { Icon } = step;

        return (
          <motion.div
            key={step.number}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.55,
              delay: reduce ? 0 : (index % 4) * 0.09,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="relative group"
          >
            {/* Horizontal connector (within each row) */}
            {index < steps.length - 1 && (index + 1) % 4 !== 0 && (
              <div
                className="hidden lg:block absolute top-[2.25rem] left-[calc(100%+1px)] w-full h-px z-0"
                aria-hidden="true"
                style={{
                  background: `linear-gradient(90deg, ${accent}40 0%, transparent 100%)`,
                }}
              />
            )}

            <motion.div
              whileHover={reduce ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative h-full p-6 sm:p-7 rounded-2xl border border-border bg-white hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/6 transition-all duration-300 overflow-hidden"
            >
              {/* Large ghost step number */}
              <span
                className="absolute -top-2 -right-1 text-[72px] font-black leading-none select-none pointer-events-none"
                style={{ color: `${accent}08` }}
              >
                {step.number}
              </span>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
                style={{
                  background: `linear-gradient(90deg, ${accent}, transparent)`,
                }}
                aria-hidden="true"
              />

              {/* Step badge */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mb-5 border"
                style={{
                  borderColor: `${accent}30`,
                  background: `${accent}0d`,
                }}
              >
                <span className="text-[9px] font-bold" style={{ color: accent }}>
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${accent}15, ${accent}06)`,
                  border: `1px solid ${accent}20`,
                }}
              >
                <Icon
                  size={20}
                  style={{ color: isBlue ? "#2563EB" : "#06B6D4" }}
                  className="transition-colors duration-200 group-hover:opacity-100 opacity-70"
                />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-navy mb-2 group-hover:text-primary transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
