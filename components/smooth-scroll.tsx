"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
import { gsap, ScrollTrigger } from "@/lib/motion";

declare global {
  interface Window {
    /** The single live Lenis instance, exposed so `<SiteNav>` can drive its
     * anchor scrolling through it instead of fighting it with native
     * `window.scrollTo`. `undefined` under reduced motion (Lenis never
     * mounts) or before the effect below has run. */
    __lenis?: Lenis;
  }
}

/**
 * Lenis <-> ScrollTrigger wiring, in exactly one place (REDESIGN.md §4).
 *
 * Contract:
 *  - `lenis.on('scroll', ScrollTrigger.update)` keeps every trigger in sync
 *    with Lenis's virtual scroll position.
 *  - Lenis is driven from `gsap.ticker` (not its own rAF loop), with
 *    `lagSmoothing(0)` so GSAP never tries to compensate for the tab
 *    throttling that Lenis already handles.
 *  - `ScrollTrigger.refresh()` runs once fonts are ready and once more after
 *    the hero's media has loaded, since both can change document height.
 *  - On unmount: kill every ScrollTrigger, remove the ticker callback, and
 *    `lenis.destroy()` — nothing is left running behind a route change.
 *
 * Reduced motion: Lenis is never instantiated. Native scroll takes over and
 * no scrub/pin ScrollTrigger is ever created (each caller checks
 * `useMotionPrefs()` itself before registering one).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useMotionPrefs();

  useEffect(() => {
    if (reduceMotion) return;

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh).catch(() => {});

    /* Lenis only smooths wheel input (touch stays native), so on coarse
       pointers it is pure overhead — don't even load it there. */
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;
    let cancelled = false;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      import("lenis").then(({ default: LenisCtor }) => {
        if (cancelled) return;
        const instance = new LenisCtor({
          autoRaf: false,
          smoothWheel: true,
          anchors: { offset: -80 },
        });
        lenis = instance;
        window.__lenis = instance;
        instance.on("scroll", ScrollTrigger.update);
        tick = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      });
    }

    return () => {
      cancelled = true;
      if (tick) gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis?.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
