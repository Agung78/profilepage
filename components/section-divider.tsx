"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE, registerScrollTriggers } from "@/lib/motion";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";

registerScrollTriggers();

/**
 * Section seam: a hairline that draws itself outward from the centre as it
 * arrives, with a soft accent bloom sitting on the join.
 *
 * This is the same gesture the hero's scroll cue resolves into, so the page
 * transitions read as one continuous system rather than a set of hard edges.
 * A one-shot entrance, not a scrub or a pin, so it's an IntersectionObserver
 * driving a paused GSAP tween rather than a ScrollTrigger.
 */
export function SectionDivider({
  tone = "mint",
}: {
  tone?: "mint" | "signal";
}) {
  const reduceMotion = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const el = ref.current;
      const tween = gsap.fromTo(
        el,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: EASE, paused: true }
      );

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          tween.play();
          observer.disconnect();
        },
        { threshold: 0, rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(el);

      return () => {
        observer.disconnect();
        tween.kill();
      };
    },
    { dependencies: [reduceMotion] }
  );

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto max-w-6xl px-5 sm:px-8"
    >
      <div
        ref={ref}
        style={reduceMotion ? undefined : { transform: "scaleX(0)", opacity: 0 }}
        className="rule-fade relative h-px origin-center"
      >
        <span
          className={`absolute left-1/2 top-1/2 h-16 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${
            tone === "mint" ? "bg-mint/[0.07]" : "bg-signal/[0.07]"
          }`}
        />
      </div>
    </div>
  );
}
