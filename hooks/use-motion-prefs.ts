"use client";

import { useEffect, useState } from "react";

/**
 * True only on devices with a precise, hovering pointer.
 *
 * Starts `false` so the server render and the first client render agree —
 * cursor-driven effects mount on the second pass and never trip hydration.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return fine;
}

/**
 * Single reduced-motion authority (REDESIGN.md §4).
 *
 * Starts `false` for the same hydration-safety reason as `useFinePointer` —
 * every consumer therefore renders its animated state on the very first paint
 * and then, if the OS preference is "reduce", snaps to its final state a tick
 * later. That one-frame flash is preferable to a server/client mismatch, and
 * is the same trade-off the previous `framer-motion` `useReducedMotion` hook
 * made (it also only resolves after mount).
 */
export function useMotionPrefs() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}
