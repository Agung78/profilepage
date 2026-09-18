"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";

/**
 * Restrained scroll cue that becomes the first section transition.
 *
 * As the page leaves the hero, the vertical cue retracts and a hairline draws
 * itself across the full width — so the affordance turns into the divider
 * rather than simply disappearing. Both halves are transform/opacity only.
 *
 * This is a continuous scroll-position readout, not an entrance choreography
 * or a pin/scrub — so per REDESIGN.md §4's division of labour it is driven by
 * a plain scroll listener + `gsap.quickTo`, not a ScrollTrigger instance
 * (ScrollTrigger is reserved for the pinned case studies, the timeline spine
 * draw and the flow-pipeline scrub).
 *
 * Under `prefers-reduced-motion` the scroll link is dropped entirely: the cue
 * and the divider both render in their resting state and no listener attaches.
 */
export function ScrollCue() {
  const reduceMotion = useMotionPrefs();
  const cueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const cue = cueRef.current;
    const line = lineRef.current;
    if (!cue || !line) return;

    const cueOpacityTo = gsap.quickTo(cue, "opacity", { duration: 0.2 });
    const cueYTo = gsap.quickTo(cue, "y", { duration: 0.2 });
    const lineScaleTo = gsap.quickTo(line, "scaleX", { duration: 0.2 });
    const lineOpacityTo = gsap.quickTo(line, "opacity", { duration: 0.2 });

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

    const onScroll = () => {
      const y = window.scrollY;
      cueOpacityTo(clamp01(1 - y / 200));
      cueYTo(clamp01(y / 200) * -14);
      const lineProgress = clamp01((y - 80) / 340);
      lineScaleTo(lineProgress);
      lineOpacityTo(lineProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion]);

  return (
    <>
      <div
        ref={cueRef}
        style={reduceMotion ? undefined : { opacity: 1, transform: "translateY(0)" }}
        className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
      >
        <span className="flex flex-col items-center gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-subtle">
            Scroll
          </span>
          {/* Track plus a single travelling dash — the same signal language as
              the hero node graph, at a much smaller scale. */}
          <span
            aria-hidden="true"
            className="relative block h-9 w-px overflow-hidden bg-ink-line"
          >
            <span
              className={`absolute inset-x-0 top-0 block h-3 bg-mint ${
                reduceMotion ? "opacity-60" : "cue-trace"
              }`}
            />
          </span>
        </span>
      </div>

      {/* The transition itself: a hairline that resolves as the hero exits. */}
      <div
        ref={lineRef}
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : { transform: "scaleX(0)", opacity: 0 }
        }
        className="rule-fade absolute inset-x-0 bottom-0 h-px origin-center"
      />
    </>
  );
}
