"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
import { registerScrollTriggers } from "@/lib/motion";

registerScrollTriggers();

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

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh).catch(() => {});

    /* No hero media exists today (the hero is typographic — REDESIGN.md §9
       Q1's own fallback), so this selector currently never matches and the
       block below is a no-op. Left in place per §4's contract: if a hero
       image/video is ever added with `data-hero-media`, refresh timing is
       already wired for it. */
    const heroMedia = document.querySelector<HTMLImageElement>(
      "[data-hero-media]"
    );
    if (heroMedia) {
      if (heroMedia.complete) {
        refresh();
      } else {
        heroMedia.addEventListener("load", refresh, { once: true });
      }
    }

    return () => {
      if (heroMedia) heroMedia.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
