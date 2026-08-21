"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import statsData from "@/data/stats.json";

function parseValue(v: string): { num: number; suffix: string } | null {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? { num: parseInt(m[1]), suffix: m[2] } : null;
}

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const reduce = useReducedMotion();
  const parsed = parseValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce || !parsed) return;
    const t = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(eased * parsed.num));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const display = parsed
    ? reduce
      ? value
      : `${count}${parsed.suffix}`
    : value;

  return (
    <div>
      <p className="text-2xl font-black text-white tabular-nums">{display}</p>
      <p className="text-[10px] text-white/40 uppercase tracking-[2px] mt-0.5">{label}</p>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 pt-8 border-t border-white/10 mt-6">
      {statsData.stats.map((stat, i) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          delay={900 + i * 180}
        />
      ))}
    </div>
  );
}
