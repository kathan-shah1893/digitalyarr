"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface LocomotiveInstance {
  destroy: () => void;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const instanceRef = useRef<LocomotiveInstance | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Destroy any existing instance before re-initialising
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    let cancelled = false;

    (async () => {
      try {
        const { default: LocomotiveScroll } = await import("locomotive-scroll");
        if (cancelled) return;

        // Scroll back to top on route change
        window.scrollTo(0, 0);

        instanceRef.current = new (LocomotiveScroll as unknown as new (opts: Record<string, unknown>) => LocomotiveInstance)({
          lerp: 0.08,
          duration: 1.4,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });
      } catch {
        // Locomotive Scroll unavailable — native scrolling is a fine fallback
      }
    })();

    return () => {
      cancelled = true;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
