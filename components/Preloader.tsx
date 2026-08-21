"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [logoIn, setLogoIn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // On reduced motion, skip immediately — do not persist to storage
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    // Reset animation state (handles React Strict Mode double-mount in dev)
    setLogoIn(false);
    setFading(false);
    setProgress(0);

    const t1 = setTimeout(() => setLogoIn(true), 160);

    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 16 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setVisible(false), 550);
        }, 280);
      }
      setProgress(Math.min(p, 100));
    }, 65);

    return () => {
      clearTimeout(t1);
      clearInterval(tick);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading DigitalYarr"
    >
      {/* DY logo */}
      <div
        className={`transition-all duration-700 ease-out ${
          logoIn
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-3"
        }`}
      >
        <Image
          src="/images/brand/logo_d.png"
          alt="DigitalYarr"
          width={76}
          height={70}
          style={{ width: 72, height: "auto" }}
          priority
          className="object-contain"
        />
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-[88px] h-[2px] rounded-full bg-white/8 overflow-hidden relative">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Brand name */}
      <p
        className={`mt-4 text-[9px] tracking-[4px] font-semibold text-white/25 uppercase transition-opacity duration-500 ${
          logoIn ? "opacity-100" : "opacity-0"
        }`}
      >
        DIGITALYARR
      </p>
    </div>
  );
}
