/**
 * Shared motion vocabulary. One easing curve and one set of durations across
 * the page, so nothing feels like it came from a different template.
 *
 * GSAP is the motion engine (framer-motion has been removed). Every
 * component imports `gsap`/`ScrollTrigger`/`useGSAP` from here rather than
 * from the packages directly, and plugin registration happens exactly once,
 * at this module's own top level — the previous per-file `require()`-based
 * registration could run before `ScrollTrigger`'s core was initialized on
 * the specific class reference a component ended up calling `.create()` on,
 * which surfaced as `_context is not a function` / a stack overflow in
 * `Context.getTweens`.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

/** Standard ease-out. Fast start, long settle — reads as "arriving", not "sliding". */
export const EASE = "power3.out";

/** Matches the old cubic-bezier for anything that still wants the literal curve. */
export const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

/** Hero entrance. Whole sequence lands inside the ~1.4s window described in REDESIGN.md §3. */
export const HERO_STEPS = {
  nav: 0,
  name: 0.1,
  headline: 0.5,
  meta: 0.68,
  ctas: 0.8,
  strip: 0.95,
} as const;

export const HERO_STEP_DURATION = 0.7;

/** Fixed header height (h-16) plus breathing room, in px. Mirrors globals.css. */
export const HEADER_OFFSET = 88;

