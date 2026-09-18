"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
import { EASE, gsap, useGSAP } from "@/lib/motion";

const TAGS = ["div", "li", "section"] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds to stagger this element behind its siblings. */
  delay?: number;
  y?: number;
  className?: string;
  as?: (typeof TAGS)[number];
};

/**
 * Scroll-in animation wrapper.
 *
 * This is plain entrance choreography, not a scrub or a pin, so per
 * REDESIGN.md §4's division of labour it is driven by an IntersectionObserver
 * + a GSAP tween — ScrollTrigger itself is reserved for the three scrub/pin
 * uses the page allows (the pinned case studies, the timeline spine draw and
 * the flow-pipeline scrub).
 *
 * Two things matter here and both were true under framer-motion and stay true
 * under GSAP:
 *  1. `prefers-reduced-motion` short-circuits to a static, already-visible
 *     render (final state immediately, not a shortened tween).
 *  2. Every instance carries `data-reveal`, which the `<noscript>` rule in
 *     layout.tsx forces back to visible — so a JS failure or a crawler that
 *     doesn't execute scripts never sees an opacity-0 page.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useMotionPrefs();
  const ref = useRef<HTMLElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const el = ref.current;
      const tween = gsap.fromTo(
        el,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration: 0.6, delay, ease: EASE, paused: true }
      );

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          tween.play();
          observer.disconnect();
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" }
      );
      observer.observe(el);

      return () => {
        observer.disconnect();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [reduceMotion, delay, y] }
  );

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      data-reveal=""
      className={className}
      style={reduceMotion ? undefined : { opacity: 0 }}
    >
      {children}
    </Tag>
  );
}
