"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import HeroTechVisual from "./HeroTechVisual";
import StatsStrip from "./StatsStrip";

const NetworkBackground = dynamic(() => import("./NetworkBackground"), { ssr: false });

const EASE = [0.33, 1, 0.68, 1] as const;

interface HItemProps {
  delay: number;
  children: React.ReactNode;
  className?: string;
}

function HItem({ delay, children, className }: HItemProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? {} : { duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative min-h-screen flex items-center bg-navy overflow-hidden"
      aria-label="Hero"
    >
      {/* - Background layers - */}
      {mounted && <NetworkBackground />}

      {/* Dot grid */}
      <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, rgba(11,18,32,0.7) 70%, rgba(11,18,32,0.97) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Blue glow orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-[560px] h-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[360px] h-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />

      {/* - Content - */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-6 items-center">

          {/* Left: text */}
          <div className="max-w-xl lg:max-w-none">

            {/* Heading */}
            <HItem delay={0.22}>
              <h1
                className="font-black text-white leading-[1.06] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.1rem)" }}
              >
                Building{" "}
                <span className="text-primary">Digital</span>
                <br />
                <span className="text-primary">Products</span> That Move
                <br />
                Businesses{" "}
                <span
                  className="relative inline-block"
                  style={{
                    WebkitTextStroke: "0px",
                  }}
                >
                  Forward.
                </span>
              </h1>
            </HItem>

            {/* Subtext */}
            <HItem delay={0.38}>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                We design, build, and scale digital solutions that drive innovation,
                efficiency, and growth for your business.
              </p>
            </HItem>

            {/* CTAs */}
            <HItem delay={0.52} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-2xl shadow-primary/30 text-sm sm:text-base"
                >
                  Start Your Project
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/14 border border-white/15 hover:border-white/30 text-white font-semibold rounded-xl transition-all text-sm sm:text-base"
                >
                  View Our Work
                </Link>
              </motion.div>
            </HItem>

            {/* Stats strip */}
            <HItem delay={0.68}>
              <StatsStrip />
            </HItem>
          </div>

          {/* Right: technology visual (desktop) */}
          <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <HeroTechVisual />
          </div>
        </div>

        {/* Mobile visual */}
        <div className="lg:hidden mt-10 flex justify-center opacity-75">
          <div className="w-64 h-64 sm:w-80 sm:h-80">
            <HeroTechVisual />
          </div>
        </div>

        {/* Scroll cue */}
        
      </div>
    </section>
  );
}
