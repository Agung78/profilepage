"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { Monogram } from "@/components/monogram";
import { ScrollCue } from "@/components/scroll-cue";
import { EASE, HERO_STEPS, HERO_STEP_DURATION } from "@/lib/motion";
import { nowStrip, person } from "@/lib/content";

/**
 * Entrance step. The full sequence resolves between ~460ms and ~900ms:
 * badge → name → role → meta → CTAs → now-strip.
 */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: HERO_STEP_DURATION, delay, ease: EASE },
});

export function Hero() {
  const reduceMotion = useReducedMotion();
  const step = reduceMotion ? () => ({}) : rise;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-24 sm:pt-28"
    >
      <HeroBackdrop />
      {/* Desktop-only, fine-pointer-only. Renders null everywhere else. */}
      <CursorSpotlight />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          {...step(HERO_STEPS.badge)}
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
        </motion.div>

        <motion.h1
          {...step(HERO_STEPS.name)}
          className="mt-8 max-w-4xl text-balance text-[clamp(2.5rem,8vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-paper"
        >
          {person.name}
        </motion.h1>

        <motion.p
          {...step(HERO_STEPS.role)}
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
        </motion.p>

        <motion.dl
          {...step(HERO_STEPS.meta)}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-subtle"
        >
          <div className="flex items-center gap-2">
            <dt className="sr-only">Based in</dt>
            <MapPin className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
            <dd>{person.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Working with</dt>
            <span aria-hidden="true" className="text-ink-line">
              /
            </span>
            <dd>{person.remoteFor}</dd>
          </div>
        </motion.dl>

        <motion.div
          {...step(HERO_STEPS.ctas)}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-mint px-6 py-3.5 text-sm font-semibold text-ink transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-mint-soft hover:shadow-[0_10px_30px_-12px_rgba(61,220,151,0.55)]"
          >
            See selected systems
            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-md border border-ink-line bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-paper transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-mint/40 hover:bg-mint/[0.06]"
          >
            Start a conversation
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>

        {/* Orienting strip: fills the lower third of the hero with substance
            rather than empty space, and answers "what is he doing now?". */}
        <motion.dl
          {...step(HERO_STEPS.strip)}
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-line/70 bg-ink-line/40 sm:mt-20 sm:grid-cols-3"
        >
          {nowStrip.map((item) => (
            <div
              key={item.label}
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
        </motion.dl>
      </div>

      <ScrollCue />
    </section>
  );
}
