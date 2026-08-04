"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Restrained scroll cue that becomes the first section transition.
 *
 * As the page leaves the hero, the vertical cue retracts and a hairline draws
 * itself across the full width — so the affordance turns into the divider
 * rather than simply disappearing. Both halves are transform/opacity only.
 *
 * Under `prefers-reduced-motion` the scroll link is dropped entirely: the cue
 * and the divider both render in their resting state.
 */
export function ScrollCue() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const cueOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const cueY = useTransform(scrollY, [0, 200], [0, -14]);
  const lineScale = useTransform(scrollY, [80, 420], [0, 1]);
  const lineOpacity = useTransform(scrollY, [80, 420], [0, 1]);

  return (
    <>
      <motion.div
        style={reduceMotion ? undefined : { opacity: cueOpacity, y: cueY }}
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
      </motion.div>

      {/* The transition itself: a hairline that resolves as the hero exits. */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : { scaleX: lineScale, opacity: lineOpacity }
        }
        className="rule-fade absolute inset-x-0 bottom-0 h-px origin-center"
      />
    </>
  );
}
