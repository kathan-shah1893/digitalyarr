"use client";


 

import { useEffect, useState } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";


 

/*

  Desktop-only custom cursor.

  Only activates on devices with a fine pointer (mouse).

  Renders a small blue dot (fast spring) + outer ring (slow spring).

  Ring expands when hovering interactive elements.

*/


 

export default function CustomCursor() {

  const [active, setActive] = useState(false);

  const [visible, setVisible] = useState(false);


 

  const rawX = useMotionValue(-120);

  const rawY = useMotionValue(-120);


 

  // Inner dot — fast tracking

  const dotX = useSpring(rawX, { stiffness: 700, damping: 36 });

  const dotY = useSpring(rawY, { stiffness: 700, damping: 36 });


 

  // Outer ring — slow, laggy

  const ringX = useSpring(rawX, { stiffness: 130, damping: 22 });

  const ringY = useSpring(rawY, { stiffness: 130, damping: 22 });


 

  useEffect(() => {

    if (typeof window === "undefined") return;

    if (!window.matchMedia("(pointer: fine)").matches) return;


 

    const onMove = (e: MouseEvent) => {

      rawX.set(e.clientX);

      rawY.set(e.clientY);

      if (!visible) setVisible(true);

    };


 

    // Use event delegation so dynamically added elements are covered

    const onOver = (e: MouseEvent) => {

      const t = e.target as Element | null;

      if (t?.closest("a, button, [role='button'], input, textarea, select, label")) {

        setActive(true);

      }

    };

    const onOut = (e: MouseEvent) => {

      const t = e.target as Element | null;

      if (t?.closest("a, button, [role='button'], input, textarea, select, label")) {

        setActive(false);

      }

    };


 

    document.addEventListener("mousemove", onMove, { passive: true });

    document.addEventListener("mouseover", onOver, { passive: true });

    document.addEventListener("mouseout", onOut, { passive: true });


 

    return () => {

      document.removeEventListener("mousemove", onMove);

      document.removeEventListener("mouseover", onOver);

      document.removeEventListener("mouseout", onOut);

    };

  }, []); // eslint-disable-line react-hooks/exhaustive-deps


 

  if (!visible) return null;


 

  return (

    <>

      {/* Outer ring */}

<motion.div

  aria-hidden="true"

  className="fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9990]"

  style={{

    x: ringX,

    y: ringY,

    translateX: "-50%",

    translateY: "-50%",

    boxShadow: active

      ? "0 0 20px rgba(37, 99, 235, 0.55)"

      : "0 0 12px rgba(59, 130, 246, 0.35)",

  }}

  animate={{

    width: active ? 48 : 38,

    height: active ? 48 : 38,

    opacity: active ? 0.95 : 0.85,

    borderColor: active

      ? "rgba(37, 99, 235, 1)"

      : "rgba(59, 130, 246, 0.9)",

  }}

  transition={{ duration: 0.18, ease: "easeOut" }}

/>

      {/* Inner dot */}

<motion.div

  aria-hidden="true"

  className="fixed top-0 left-0 rounded-full pointer-events-none z-[9991]"

  style={{

    x: dotX,

    y: dotY,

    translateX: "-50%",

    translateY: "-50%",

    boxShadow: active

      ? "0 0 10px rgba(96, 165, 250, 0.9)"

      : "0 0 8px rgba(255, 255, 255, 0.8)",

  }}

  animate={{

    width: active ? 7 : 8,

    height: active ? 7 : 8,

    backgroundColor: active ? "#60A5FA" : "#FFFFFF",

  }}

  transition={{ duration: 0.12 }}

/>

    </>

  );

}


 