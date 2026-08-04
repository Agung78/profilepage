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
