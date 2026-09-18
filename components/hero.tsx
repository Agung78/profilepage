"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { Monogram } from "@/components/monogram";
import { ScrollCue } from "@/components/scroll-cue";
import { SplitHeading } from "@/components/split-heading";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
import {
  EASE,
  HERO_STEPS,
  HERO_STEP_DURATION,
  gsap,
  useGSAP,
} from "@/lib/motion";
import { nowStrip, person } from "@/lib/content";

/**
 * Hero, rebuilt typographic per REDESIGN.md §9 Q1's own stated fallback: no
 * photograph of the subject exists, so there is no portrait, no duotone
 * grade, and no Three.js displacement pass (§5 is dropped entirely rather
 * than faked). The name itself is the hero's one focal asset, held at full
 * bleed — the GSAP intro timeline from §3 still runs in full, minus the
 * shader/portrait steps.
 */
export function Hero() {
  const reduceMotion = useMotionPrefs();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduceMotion || !root.current) return;

      const nameWords = root.current.querySelectorAll("[data-hero-name] [data-split-word]");
      const rise = root.current.querySelectorAll("[data-hero-rise]");
      const strip = root.current.querySelectorAll("[data-hero-strip-item]");

      /* Everything below is opacity/transform only — nav, headline and CTAs
         stay usable and clickable at every point in the sequence, never
         gated behind `visibility` or `pointer-events`. Total sequence lands
         inside the ~1.4s window described in §3. */
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      if (nameWords.length) {
        tl.fromTo(
          nameWords,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
          },
          HERO_STEPS.name
        );
      }

      rise.forEach((el) => {
        const step = Number((el as HTMLElement).dataset.heroRise) || 0;
        tl.fromTo(
          el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: HERO_STEP_DURATION },
          step
        );
      });

      if (strip.length) {
        tl.fromTo(
          strip,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
          },
          HERO_STEPS.strip
        );
      }

      return () => {
        tl.kill();
      };
    },
    { scope: root, dependencies: [reduceMotion] }
  );

  /* Under reduced motion, or before the effect above has run, every animated
     element must already be in its resting (visible) state — never an
     un-animated opacity:0. */
  const restState = reduceMotion ? { opacity: 1 } : undefined;

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-24 sm:pt-28"
    >
      {/* Desktop-only, fine-pointer-only. Renders null everywhere else. */}
      <CursorSpotlight />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div
          data-hero-rise={HERO_STEPS.nav}
          style={restState}
          className="flex items-center gap-3"
        >
          <Monogram size={52} className="shrink-0" />
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/[0.07] px-3 py-1.5 font-mono text-xs text-mint-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-mint ${
                  reduceMotion ? "" : "animate-breathe"
                }`}
              />
            </span>
            {person.availability}
          </span>
        </div>

        {/* Full-bleed typographic focal point — the hero's one authored
            "asset" in place of the unavailable portrait (REDESIGN.md §9 Q1).
            No entrance-triggered layout shift: the split wrapper reserves the
            same box whether or not JS has run. */}
        <div data-hero-name>
          <SplitHeading
            as="h1"
            text={person.name}
            className="mt-8 max-w-5xl text-balance text-[clamp(2.75rem,9.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-paper"
          />
        </div>

        <p
          data-hero-rise={HERO_STEPS.headline}
          style={restState}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
        >
          Full-stack engineer working across product UX, cloud infrastructure,
          fintech and data platforms — currently{" "}
          <strong className="font-medium text-paper">
            {person.currentRole} at {person.currentCompany}
          </strong>{" "}
          and{" "}
          <strong className="font-medium text-paper">
            {person.concurrentRole} at {person.concurrentCompany}
          </strong>
          .
        </p>

        <dl
          data-hero-rise={HERO_STEPS.meta}
          style={restState}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-subtle"
        >
          <div className="flex items-center gap-2">
            <dt className="sr-only">Based in</dt>
            <Icon
              icon="solar:map-point-linear"
              className="h-3.5 w-3.5 text-mint"
              aria-hidden="true"
            />
            <dd>{person.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Working with</dt>
            <span aria-hidden="true" className="text-ink-line">
              /
            </span>
            <dd>{person.remoteFor}</dd>
          </div>
        </dl>

        <div
          data-hero-rise={HERO_STEPS.ctas}
          style={restState}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-mint px-6 py-3.5 text-sm font-semibold text-ink transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-mint-soft hover:shadow-[0_10px_30px_-12px_rgba(61,220,151,0.55)]"
          >
            See selected systems
            <Icon
              icon="solar:arrow-down-linear"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-md border border-ink-line bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-paper transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-mint/40 hover:bg-mint/[0.06]"
          >
            Start a conversation
            <Icon
              icon="solar:arrow-right-up-linear"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Orienting strip: fills the lower third of the hero with substance
            rather than empty space, and answers "what is he doing now?". */}
        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-line/70 bg-ink-line/40 sm:mt-20 sm:grid-cols-3">
          {nowStrip.map((item) => (
            <div
              key={item.label}
              data-hero-strip-item
              style={restState}
              className="group bg-ink/70 px-5 py-4 transition-colors duration-300 hover:bg-ink-raised/80"
            >
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mint">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-pretty text-sm leading-snug text-muted transition-colors duration-300 group-hover:text-paper">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ScrollCue />
    </section>
  );
}
