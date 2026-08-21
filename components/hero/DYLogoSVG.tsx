"use client";

import { motion } from "motion/react";

/*
  DY monogram draw animation.
  ViewBox 280×180. Geometry:
  - D: left bar (32,18→32,162) + top cap (→78,18) + bottom cap (→78,162) + right arc bezier
  - Y: left arm (145,18→195,95) + right arm (265,18→195,95) + stem (→195,162)
  - Brand arrow: diagonal sweep (15,162→262,18) + arrowhead
*/

interface Segment {
  d: string;
  start: number;   // delay in seconds
  dur: number;     // duration in seconds
  stroke?: string; // default white
  width?: number;
}

const SEGMENTS: Segment[] = [
  // ── D ──
  { d: "M 32,18 L 32,162",                                                         start: 0.0,  dur: 0.48 }, // left bar
  { d: "M 32,18 L 78,18",                                                           start: 0.38, dur: 0.22 }, // top cap
  { d: "M 32,162 L 78,162",                                                         start: 0.52, dur: 0.22 }, // bottom cap
  { d: "M 78,18 C 118,18 132,50 132,90 C 132,130 118,162 78,162",                  start: 0.68, dur: 0.52 }, // right arc
  // ── Y ──
  { d: "M 145,18 L 195,95",                                                         start: 1.22, dur: 0.30 }, // left arm
  { d: "M 265,18 L 195,95",                                                         start: 1.44, dur: 0.30 }, // right arm
  { d: "M 195,95 L 195,162",                                                        start: 1.67, dur: 0.24 }, // stem
  // ── Brand arrow ──
  { d: "M 15,162 L 262,18", stroke: "#2563EB", width: 2.5,                         start: 1.92, dur: 0.28 }, // diagonal sweep
  { d: "M 247,12 L 262,18 L 255,35", stroke: "#2563EB", width: 2.5,               start: 2.18, dur: 0.16 }, // arrowhead
];

interface Props {
  phase: "logo" | "pulse";
}

export default function DYLogoSVG({ phase }: Props) {
  const isPulse = phase === "pulse";

  return (
    <div className="relative w-64 h-44 sm:w-80 sm:h-56 lg:w-96 lg:h-64">
      {/* Radial glow backdrop — grows on pulse */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(37,99,235,0.22) 0%, transparent 70%)",
        }}
        animate={{ opacity: isPulse ? 1 : 0.3, scale: isPulse ? 1.15 : 1 }}
        transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
      />

      <svg
        viewBox="0 0 280 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <filter id="dy-glow-blue">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="dy-glow-pulse">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Fine grid — barely visible technical background */}
        <line x1="0" y1="90" x2="280" y2="90" stroke="#2563EB" strokeWidth="0.3" opacity="0.08" />
        <line x1="140" y1="0" x2="140" y2="180" stroke="#2563EB" strokeWidth="0.3" opacity="0.08" />

        {/* ── Drawn segments ── */}
        {SEGMENTS.map((seg, i) => (
          <motion.path
            key={i}
            d={seg.d}
            stroke={seg.stroke ?? "rgba(255,255,255,0.88)"}
            strokeWidth={seg.width ?? 3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration: seg.dur,
                delay: seg.start,
                ease: "easeInOut",
              },
              opacity: { duration: 0.06, delay: seg.start },
            }}
          />
        ))}

        {/* Blue arrow glow layer (fires during pulse phase) */}
        {isPulse && (
          <>
            <motion.path
              d="M 15,162 L 262,18"
              stroke="#06B6D4"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              style={{ filter: "url(#dy-glow-pulse)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.75, 0] }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
            {/* Energy wave — expands from arrow center */}
            <motion.ellipse
              cx="140"
              cy="90"
              rx="60"
              ry="35"
              stroke="#2563EB"
              strokeWidth="1"
              fill="none"
              initial={{ rx: 0, ry: 0, opacity: 0.8 }}
              animate={{ rx: 160, ry: 110, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </>
        )}

        {/* Node dots at structural junction points — appear on pulse */}
        {isPulse && (
          <>
            {[
              { cx: 32, cy: 90 },
              { cx: 132, cy: 90 },
              { cx: 195, cy: 95 },
            ].map((dot, i) => (
              <motion.circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r={3}
                fill="#2563EB"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.8] }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
