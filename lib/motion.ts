/**
 * Shared motion vocabulary. One easing curve and one set of durations across
 * the page, so nothing feels like it came from a different template.
 */

/** Standard ease-out. Fast start, long settle — reads as "arriving", not "sliding". */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Hero entrance. Whole sequence lands inside the 500–900ms window. */
export const HERO_STEPS = {
  badge: 0.04,
  name: 0.12,
  role: 0.22,
  meta: 0.3,
  ctas: 0.38,
  strip: 0.48,
} as const;

export const HERO_STEP_DURATION = 0.42;

/** Fixed header height (h-16) plus breathing room, in px. Mirrors globals.css. */
export const HEADER_OFFSET = 88;

/** Viewport config for "play once as it arrives" scroll reveals. */
export const ONCE_IN_VIEW = {
  once: true,
  margin: "0px 0px -12% 0px",
} as const;
