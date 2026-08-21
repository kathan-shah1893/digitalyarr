"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/*
  Page transition wrapper — Next.js App Router template.tsx.
  Remounts on every navigation, providing a branded enter animation.

  Design: crisp opacity + y lift on enter.
  A thin electric-blue progress line sweeps left-to-right then
  fades away — the DigitalYarr connection motif applied to navigation.
*/

export default function Template({ children }: { children: React.ReactNode }) {
  const [linePhase, setLinePhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const t = setTimeout(() => setLinePhase("out"), 380);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 9 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.26, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Sweep line */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[9995] pointer-events-none origin-left"
        style={{
          background: "linear-gradient(90deg, #2563EB 0%, #06B6D4 50%, #2563EB 100%)",
        }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={
          linePhase === "in"
            ? { scaleX: 1, opacity: 1, transition: { duration: 0.34, ease: [0.76, 0, 0.24, 1] } }
            : { scaleX: 1, opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }
        }
      />

      {children}
    </motion.div>
  );
}
