"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds to stagger this element behind its siblings. */
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof TAGS;
};

/**
 * Scroll-in animation wrapper.
 *
 * Two things matter here and both were missing before:
 *  1. `prefers-reduced-motion` short-circuits to a static render.
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = TAGS[as];

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      /* Positive margin expands the observer root so elements begin animating
         before they enter the viewport. With a negative margin a fast scroll
         lands on a still-transparent screen. */
      viewport={{ once: true, margin: "180px 0px 180px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
