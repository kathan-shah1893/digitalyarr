"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  title = "Let's Build Something Amazing Together",
  subtitle =
    "Have a project in mind? Let's discuss how we can help you achieve your goals.",
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
  secondaryLabel = "Talk to DigitalYarr",
  secondaryHref = "/contact",
}: CTASectionProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-navy py-24 sm:py-32 overflow-hidden">
      {/* - Animated background layers - */}

      {/* Tech grid */}
      <div className="absolute inset-0 tech-grid opacity-30" aria-hidden="true" />

      {/* Animated glow blobs */}
      <div
        className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full ${reduce ? "" : "animate-float"}`}
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "0s",
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full ${reduce ? "" : "animate-float-reverse"}`}
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "1.5s",
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute top-1/2 right-1/6 w-[240px] h-[240px] rounded-full ${reduce ? "" : "animate-float"}`}
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
          filter: "blur(24px)",
          animationDelay: "0.8s",
        }}
        aria-hidden="true"
      />

      {/* Thin top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(37,99,235,0.5) 30%, rgba(6,182,212,0.5) 60%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* - Content - */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Value prop pill */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-white/50">
            One Partner. Complete Technology.
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.33, 1, 0.68, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.33, 1, 0.68, 1] }}
          className="text-base sm:text-lg text-white/55 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={reduce ? {} : { scale: 1.03 }}
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all shadow-2xl shadow-primary/30 text-base"
            >
              {primaryLabel}
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            whileHover={reduce ? {} : { scale: 1.03 }}
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/6 hover:bg-white/12 border border-white/15 hover:border-white/30 text-white font-semibold rounded-xl transition-all text-base"
            >
              {secondaryLabel}
            </Link>
          </motion.div>
        </motion.div>

        {/* Contact nudge */}
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-10 text-xs text-white/25"
        >
          Email us at{" "}
          <a
            href="mailto:support@digitalyarr.com"
            className="text-white/40 hover:text-accent transition-colors underline underline-offset-2"
          >
            support@digitalyarr.com
          </a>{" "}
          or call{" "}
          <a
            href="tel:+919898117731"
            className="text-white/40 hover:text-accent transition-colors underline underline-offset-2"
          >
            +91 9898117731
          </a>
        </motion.p>
      </div>
    </section>
  );
}
