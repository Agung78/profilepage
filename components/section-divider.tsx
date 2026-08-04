"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Section seam: a hairline that draws itself outward from the centre as it
 * arrives, with a soft accent bloom sitting on the join.
 *
 * This is the same gesture the hero's scroll cue resolves into, so the page
 * transitions read as one continuous system rather than a set of hard edges.
 */
export function SectionDivider({
  tone = "mint",
}: {
  tone?: "mint" | "signal";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto max-w-6xl px-5 sm:px-8"
    >
      <motion.div
        initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="rule-fade relative h-px origin-center"
      >
        <span
          className={`absolute left-1/2 top-1/2 h-16 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${
            tone === "mint" ? "bg-mint/[0.07]" : "bg-signal/[0.07]"
          }`}
        />
      </motion.div>
    </div>
  );
}
