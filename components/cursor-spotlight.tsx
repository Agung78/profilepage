"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useFinePointer } from "@/hooks/use-motion-prefs";

const SIZE = 620;
const SPRING = { stiffness: 90, damping: 24, mass: 0.6 } as const;

/**
 * Soft spotlight that trails the cursor across its parent element.
 *
 * Renders nothing at all on touch devices or under `prefers-reduced-motion`,
 * so no listeners are attached and no extra layer is composited there. The
 * parent's rect is cached and refreshed on scroll/resize rather than measured
 * on every pointer move, which keeps the move handler free of layout reads.
 */
export function CursorSpotlight() {
  const holder = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduceMotion;

  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const opacity = useMotionValue(0);
  const smoothX = useSpring(x, SPRING);
  const smoothY = useSpring(y, SPRING);
  const smoothOpacity = useSpring(opacity, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!enabled) return;
    const host = holder.current?.parentElement;
    if (!host) return;

    let rect = host.getBoundingClientRect();
    const measure = () => {
      rect = host.getBoundingClientRect();
    };

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - rect.left - SIZE / 2);
      y.set(event.clientY - rect.top - SIZE / 2);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [enabled, x, y, opacity]);

  return (
    <div ref={holder} aria-hidden="true" className="pointer-events-none">
      {enabled ? (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            opacity: smoothOpacity,
            width: SIZE,
            height: SIZE,
          }}
          className="absolute left-0 top-0 rounded-full bg-[radial-gradient(circle,rgba(61,220,151,0.10)_0%,rgba(78,168,245,0.05)_38%,transparent_70%)]"
        />
      ) : null}
    </div>
  );
}
