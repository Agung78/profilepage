"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useFinePointer, useMotionPrefs } from "@/hooks/use-motion-prefs";

const SIZE = 620;

/**
 * Soft spotlight that trails the cursor across its parent element.
 *
 * Renders nothing at all on touch devices or under `prefers-reduced-motion`,
 * so no listeners are attached and no extra layer is composited there. The
 * parent's rect is cached and refreshed on scroll/resize rather than measured
 * on every pointer move, which keeps the move handler free of layout reads.
 *
 * Pure CSS hover affordance in spirit — the "division of labour" in
 * REDESIGN.md §4 puts hover/tracking effects like this under GSAP quicksetters
 * rather than a spring library, since it is continuous per-frame interpolation
 * rather than a one-shot entrance.
 */
export function CursorSpotlight() {
  const holder = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const reduceMotion = useMotionPrefs();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;
    const host = holder.current?.parentElement;
    const el = dot.current;
    if (!host || !el) return;

    let rect = host.getBoundingClientRect();
    const measure = () => {
      rect = host.getBoundingClientRect();
    };

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const opacityTo = gsap.quickTo(el, "opacity", {
      duration: 0.3,
      ease: "power2",
    });

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX - rect.left - SIZE / 2);
      yTo(event.clientY - rect.top - SIZE / 2);
      opacityTo(1);
    };
    const onLeave = () => opacityTo(0);

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
  }, [enabled]);

  return (
    <div ref={holder} aria-hidden="true" className="pointer-events-none">
      {enabled ? (
        <div
          ref={dot}
          style={{
            transform: `translate(${-SIZE}px, ${-SIZE}px)`,
            opacity: 0,
            width: SIZE,
            height: SIZE,
          }}
          className="absolute left-0 top-0 rounded-full bg-[radial-gradient(circle,rgba(61,220,151,0.10)_0%,rgba(78,168,245,0.05)_38%,transparent_70%)]"
        />
      ) : null}
    </div>
  );
}
