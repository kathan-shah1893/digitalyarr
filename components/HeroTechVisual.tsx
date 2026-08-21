"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";

const CX = 280;
const CY = 280;
const NODE_ORBIT = 182;
const NODE_R = 44;

const NODES = [
  { id: "build",    label: "BUILD",    angle: 270, blue: true  },
  { id: "connect",  label: "CONNECT",  angle: 330, blue: false },
  { id: "cloud",    label: "CLOUD",    angle: 30,  blue: true  },
  { id: "secure",   label: "SECURE",   angle: 90,  blue: false },
  { id: "automate", label: "AUTOMATE", angle: 150, blue: true  },
  { id: "manage",   label: "MANAGE",   angle: 210, blue: false },
] as const;

function polarToXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function HeroTechVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.3, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
      className="relative mx-auto select-none"
      style={{ width: "min(640px, calc(100vh - 240px))", maxWidth: "100%" }}
      aria-hidden="true"
    >
      {/* Ambient outer glow */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl scale-75" />

      <svg
        viewBox="0 0 560 560"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-auto"
      >
        <defs>
          <radialGradient id="htv-bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0f1a2e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="htv-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="70%"  stopColor="#2563EB" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="htv-line-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="htv-line-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#06B6D4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
          </linearGradient>

          <filter id="htv-glow-sm" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="htv-glow-md" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="htv-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background radial */}
        <circle cx={CX} cy={CY} r={280} fill="url(#htv-bg-glow)" />

        {/* - Outer decorative rings - */}
        <circle
          cx={CX} cy={CY} r={252}
          fill="none"
          stroke="rgba(37,99,235,0.07)"
          strokeWidth="1"
          strokeDasharray="3 14"
          className={reduce ? undefined : "animate-spin-slow"}
        />
        <circle
          cx={CX} cy={CY} r={232}
          fill="none"
          stroke="rgba(6,182,212,0.04)"
          strokeWidth="0.5"
          strokeDasharray="1 28"
        />

        {/* - Node orbit ring - */}
        <circle
          cx={CX} cy={CY} r={NODE_ORBIT}
          fill="none"
          stroke="rgba(37,99,235,0.1)"
          strokeWidth="1"
        />

        {/* - Hexagonal outline between nodes - */}
        {NODES.map((node, i) => {
          const a = polarToXY(node.angle, NODE_ORBIT);
          const b = polarToXY(NODES[(i + 1) % NODES.length].angle, NODE_ORBIT);
          return (
            <line
              key={`hex-${node.id}`}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke="rgba(37,99,235,0.07)"
              strokeWidth="0.75"
            />
          );
        })}

        {/* - Connection lines: center → nodes - */}
        {NODES.map((node, i) => {
          const pos = polarToXY(node.angle, NODE_ORBIT);
          return (
            <line
              key={`line-${node.id}`}
              x1={CX} y1={CY}
              x2={pos.x} y2={pos.y}
              stroke={node.blue ? "url(#htv-line-blue)" : "url(#htv-line-cyan)"}
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* - Secondary inner ring - */}
        <circle cx={CX} cy={CY} r={105} fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="0.75" />

        {/* - Center glow - */}
        <circle cx={CX} cy={CY} r={100} fill="url(#htv-center-glow)" />

        {/* - Center pulse rings - */}
        {!reduce && (
          <>
            <circle
              cx={CX} cy={CY} r="70"
              fill="none"
              stroke="rgba(37,99,235,0.3)"
              strokeWidth="1"
              filter="url(#htv-glow-sm)"
            >
              <animate attributeName="r"       values="70;106"  dur="2.8s" repeatCount="indefinite" calcMode="ease-out" />
              <animate attributeName="opacity" values="0.6;0"   dur="2.8s" repeatCount="indefinite" calcMode="ease-out" />
            </circle>
            <circle
              cx={CX} cy={CY} r="70"
              fill="none"
              stroke="rgba(37,99,235,0.2)"
              strokeWidth="1"
            >
              <animate attributeName="r"       values="70;112"  dur="2.8s" begin="1.4s" repeatCount="indefinite" calcMode="ease-out" />
              <animate attributeName="opacity" values="0.4;0"   dur="2.8s" begin="1.4s" repeatCount="indefinite" calcMode="ease-out" />
            </circle>
          </>
        )}

        {/* - Center circle - */}
        <circle
          cx={CX} cy={CY} r={68}
          fill="rgba(11,18,32,0.96)"
          stroke="rgba(37,99,235,0.55)"
          strokeWidth="1.5"
          filter="url(#htv-glow-sm)"
        />
        <circle cx={CX} cy={CY} r={58} fill="rgba(37,99,235,0.07)" />

        {/* - Center DY text - */}
        <text
          x={CX} y={CY - 7}
          textAnchor="middle" dominantBaseline="middle"
          fill="white"
          fontSize="26"
          fontWeight="800"
          fontFamily="Satoshi, Inter, sans-serif"
          letterSpacing="-0.5"
        >
          DY
        </text>
        <text
          x={CX} y={CY + 16}
          textAnchor="middle"
          fill="rgba(37,99,235,0.85)"
          fontSize="6.5"
          fontWeight="700"
          fontFamily="Satoshi, Inter, sans-serif"
          letterSpacing="3.5"
        >
          DIGITALYARR
        </text>

        {/* - Service nodes - */}
        {NODES.map((node, i) => {
          const pos = polarToXY(node.angle, NODE_ORBIT);
          const stroke = node.blue ? "rgba(37,99,235,0.65)" : "rgba(6,182,212,0.55)";
          const innerFill = node.blue ? "rgba(37,99,235,0.1)" : "rgba(6,182,212,0.08)";
          const dotColor = node.blue ? "#3b82f6" : "#06B6D4";

          return (
            <g key={node.id}>
              {/* Outer ambient glow */}
              <circle
                cx={pos.x} cy={pos.y} r={NODE_R + 18}
                fill={node.blue ? "rgba(37,99,235,0.05)" : "rgba(6,182,212,0.04)"}
              />

              {/* Node circle */}
              <circle
                cx={pos.x} cy={pos.y} r={NODE_R}
                fill="rgba(11,18,32,0.93)"
                stroke={stroke}
                strokeWidth="1.5"
                filter="url(#htv-glow-sm)"
              />
              <circle cx={pos.x} cy={pos.y} r={NODE_R - 9} fill={innerFill} />

              {/* Node label */}
              <text
                x={pos.x} y={pos.y + 4}
                textAnchor="middle" dominantBaseline="middle"
                fill="white"
                fontSize="8.5"
                fontWeight="700"
                fontFamily="Satoshi, Inter, sans-serif"
                letterSpacing="1.8"
              >
                {node.label}
              </text>

              {/* Pulsing dot at node center */}
              <circle cx={pos.x} cy={pos.y} r="3" fill={dotColor} filter="url(#htv-glow-sm)">
                {!reduce && (
                  <animate
                    attributeName="opacity"
                    values="1;0.25;1"
                    dur={`${1.8 + i * 0.28}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>

              {/* Data particle moving center → node */}
              {!reduce && (
                <circle r="2.5" fill={dotColor} filter="url(#htv-glow-sm)" opacity="0.85">
                  <animateMotion
                    dur={`${2.4 + i * 0.38}s`}
                    begin={`${i * 0.42}s`}
                    repeatCount="indefinite"
                    path={`M${CX},${CY} L${pos.x},${pos.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* - Mid-orbit data dots (extra visual richness) - */}
        {!reduce &&
          NODES.map((node, i) => {
            const pos = polarToXY(node.angle, NODE_ORBIT * 0.55);
            return (
              <circle
                key={`mid-${node.id}`}
                cx={pos.x} cy={pos.y}
                r="2"
                fill={node.blue ? "#2563EB" : "#06B6D4"}
                opacity="0.5"
                filter="url(#htv-glow-sm)"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;0.1;0.5"
                  dur={`${2.2 + i * 0.35}s`}
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}

        {/* - Ambient floating particles - */}
        {!reduce &&
          [
            { cx: 190, cy: 138, d: "4.2s", b: "0s",    c: "#2563EB" },
            { cx: 400, cy: 118, d: "5.1s", b: "1.1s",  c: "#06B6D4" },
            { cx: 468, cy: 286, d: "3.7s", b: "0.5s",  c: "#2563EB" },
            { cx: 396, cy: 448, d: "4.8s", b: "1.6s",  c: "#06B6D4" },
            { cx: 152, cy: 440, d: "3.9s", b: "0.8s",  c: "#2563EB" },
            { cx: 100, cy: 262, d: "4.4s", b: "0.3s",  c: "#06B6D4" },
            { cx: 290, cy: 48,  d: "3.5s", b: "1.3s",  c: "#3b82f6" },
            { cx: 468, cy: 200, d: "5.5s", b: "0.7s",  c: "#22d3ee" },
          ].map((p, i) => (
            <circle key={`fp-${i}`} cx={p.cx} cy={p.cy} r="1.5" fill={p.c}>
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur={p.d} begin={p.b} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${p.cy};${p.cy - 7};${p.cy}`} dur={p.d} begin={p.b} repeatCount="indefinite" />
            </circle>
          ))}
      </svg>
    </motion.div>
  );
}
