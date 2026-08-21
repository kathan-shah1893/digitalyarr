"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import DYLogoSVG from "./DYLogoSVG";
import StatsStrip from "@/components/StatsStrip";

const HeroTechVisual = dynamic(() => import("@/components/HeroTechVisual"), { ssr: false });
const NetworkBackground = dynamic(() => import("@/components/NetworkBackground"), { ssr: false });

type Phase = "logo" | "pulse" | "ecosystem" | "content";

const EASE = [0.33, 1, 0.68, 1] as const;

// ---------- Helpers ----------
function hasPlayedIntro(): boolean {
  try { return !!sessionStorage.getItem("dy:heroPlayed"); } catch { return false; }
}
function markIntroPlayed() {
  try { sessionStorage.setItem("dy:heroPlayed", "1"); } catch {}
}

// ---------- Component ----------
export default function CinematicHero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Always start consistent between server and client (avoid hydration mismatch).
  // The useEffect below immediately skips to "content" if returning visitor.
  const [phase, setPhase] = useState<Phase>(reduce ? "content" : "logo");
  const [mounted, setMounted] = useState(false);

  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 48, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 48, damping: 22 });

  // Scroll-driven hero fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0.35, 0.75], [1, 0]);
  const ecosystemScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.05]);

  // Mount
  useEffect(() => setMounted(true), []);

  // Phase sequence — runs after mount so sessionStorage is safe to read
  useEffect(() => {
    if (reduce || hasPlayedIntro()) {
      setPhase("content");
      return;
    }
    // logo → pulse → ecosystem → content
    const t1 = setTimeout(() => setPhase("pulse"),     2300);
    const t2 = setTimeout(() => setPhase("ecosystem"), 3100);
    const t3 = setTimeout(() => {
      setPhase("content");
      markIntroPlayed();
    }, 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mouse parallax listener (desktop only)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 28);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 18);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    if (reduce) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduce, handleMouseMove]);

  const showEcosystem = phase === "ecosystem" || phase === "content";
  const showContent = phase === "content";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-start lg:items-center bg-navy"
      aria-label="Hero"
    >
      {/* Background layer — overflow-hidden here keeps decoratives clipped
          without clipping the ecosystem visual in the content layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Network canvas — only once content is fully revealed */}
        {mounted && showContent && <NetworkBackground />}

        {/* Tech-grid overlay */}
        <div className="absolute inset-0 tech-grid opacity-40" />

        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 85% at 50% 50%, transparent 28%, rgba(11,18,32,0.65) 65%, rgba(11,18,32,0.97) 100%)",
          }}
        />

        {/* Primary blue glow blob — centre */}
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* ── INTRO: DY logo draw ── */}
      <AnimatePresence>
        {!reduce && (phase === "logo" || phase === "pulse") && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              transition: { duration: 0.65, ease: EASE },
            }}
          >
            <DYLogoSVG phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-24"
        style={{ opacity: heroOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.12fr] gap-12 lg:gap-6 items-center">

          {/* ── Left: copy ── */}
          <div className="max-w-xl lg:max-w-none">

            {/* Eyebrow */}
            <AnimatePresence>
              {showContent && (
                <motion.p
                  key="eyebrow"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="text-[11px] font-bold uppercase tracking-[4px] text-accent mb-5"
                >
                  Your End-to-End Technology Partner
                </motion.p>
              )}
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence>
              {showContent && (
                <motion.h1
                  key="headline"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.68, delay: 0.08, ease: EASE }}
                  className="font-black text-white leading-[1.04] tracking-tight mb-6"
                  style={{ fontSize: "clamp(2.3rem, 5.6vw, 4.2rem)" }}
                >
                  Building{" "}
                  <span
                    className="text-gradient"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Digital
                  </span>
                  <br />
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Products
                  </span>{" "}
                  That Move
                  <br />
                  Businesses Forward.
                </motion.h1>
              )}
            </AnimatePresence>

            {/* Subtext */}
            <AnimatePresence>
              {showContent && (
                <motion.p
                  key="sub"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
                  className="text-base sm:text-lg text-white/58 leading-relaxed mb-8 max-w-lg"
                >
                  We design, build, and scale digital solutions that drive innovation,
                  efficiency, and growth for your business.
                </motion.p>
              )}
            </AnimatePresence>

            {/* CTAs */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  key="ctas"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.62, delay: 0.28, ease: EASE }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-2xl shadow-primary/30 text-sm sm:text-base"
                  >
                    Start Your Project
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform duration-150"
                    />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/14 border border-white/15 hover:border-white/30 text-white font-semibold rounded-xl transition-all text-sm sm:text-base"
                  >
                    View Our Work
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                >
                  <StatsStrip />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: 6-node ecosystem ── */}
          <div className="hidden lg:flex items-center justify-center w-full">
            <motion.div style={{ x: springX, y: springY, scale: ecosystemScale }} className="w-full">
              <AnimatePresence>
                {showEcosystem && (
                  <motion.div
                    key="ecosystem"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.95, ease: EASE }}
                    className="w-full"
                  >
                    <HeroTechVisual />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Mobile ecosystem */}
        <AnimatePresence>
          {showEcosystem && (
            <motion.div
              key="mobile-eco"
              className="lg:hidden mt-10 flex justify-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 0.72, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="w-full max-w-[300px] sm:max-w-[360px] mx-auto aspect-square">
                <HeroTechVisual />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              key="scroll-cue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5"
              aria-hidden="true"
            >
              <span className="text-[9px] tracking-[4px] text-white/18 uppercase font-semibold">
                Scroll to Explore
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.85, ease: "easeInOut" }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path
                    d="M8 1 L8 16 M3 11 L8 16 L13 11"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
