"use client";

import { useEffect, useState } from "react";

/** Overlay animating the favicon mark, server-rendered so it covers the first
 * paint. Once-per-session / reduced-motion gating is the inline script in
 * layout.tsx (sets html[data-splash=skip]). Page content renders underneath. */
export function Splash() {
  const [gone, setGone] = useState(false);

  // Fallback if animationend never fires (e.g. animations disabled).
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;
  return (
    <div
      aria-hidden="true"
      onAnimationEnd={(e) => e.target === e.currentTarget && setGone(true)}
      className="splash pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-paper"
    >
      <svg viewBox="0 0 64 64" className="h-24 w-24">
        <rect id="splash-tile" className="splash-tile" width="64" height="64" rx="14" fill="#17150F" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        <path id="splash-a" className="splash-a" pathLength={1} d="M17 49 32 14l15 35" fill="none" stroke="#EEE9DE" strokeWidth="7" strokeLinejoin="miter" strokeMiterlimit="10" />
        <path id="splash-bar" className="splash-bar" d="M24.5 38h15" fill="none" stroke="#E8603B" strokeWidth="6" />
      </svg>
    </div>
  );
}
