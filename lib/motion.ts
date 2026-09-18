/**
 * Shared motion vocabulary. One easing curve and one set of durations across
 * the page, so nothing feels like it came from a different template.
 *
 * GSAP is the motion engine (framer-motion has been removed). This file
 * exports plain tokens — no GSAP import at module scope — so it stays safe
 * to read from server components / metadata code if ever needed.
 */

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

/**
 * Registers the GSAP plugins this page depends on (ScrollTrigger, and the
 * `useGSAP` hook itself, which GSAP's own docs register the same way).
 * Every module that creates a ScrollTrigger or calls `useGSAP` calls this
 * first, at module scope — it's a no-op on the server and idempotent on the
 * client, so calling it from several files is safe and keeps each file
 * self-contained.
 */
export function registerScrollTriggers() {
  if (typeof window === "undefined") return;
  // Deferred require keeps this file import-safe on the server.
  const { gsap } = require("gsap");
  const { ScrollTrigger } = require("gsap/ScrollTrigger");
  const { useGSAP } = require("@gsap/react");
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  return ScrollTrigger;
}
