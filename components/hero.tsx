"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { Monogram } from "@/components/monogram";
import { nowStrip, person } from "@/lib/content";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const reduceMotion = useReducedMotion();
  const step = reduceMotion ? () => ({}) : rise;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* Radial node field: the "systems map" signature, drawn once in SVG. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 800"
        /* Hidden under sm: at narrow widths it sits behind the headline and
           reads as noise rather than texture. */
        className="pointer-events-none absolute top-1/2 hidden h-[46rem] w-[46rem] -translate-y-1/2 opacity-50 sm:right-[-12rem] sm:block lg:right-[-6rem]"
      >
        <g stroke="#22222C" fill="none">
          <circle cx="400" cy="400" r="120" />
          <circle cx="400" cy="400" r="200" strokeDasharray="3 7" />
          <circle cx="400" cy="400" r="290" strokeDasharray="3 7" />
          <circle cx="400" cy="400" r="380" />
        </g>
        <g stroke="#3DDC97" strokeWidth="1.25" fill="none" opacity="0.55">
          <path
            d="M400 20 400 120 M400 680 400 780 M20 400 120 400 M680 400 780 400"
            strokeDasharray="14 226"
            className={reduceMotion ? undefined : "animate-stream"}
          />
        </g>
        <circle cx="400" cy="400" r="4" fill="#3DDC97" />
        <circle cx="400" cy="200" r="3" fill="#4EA8F5" />
        <circle cx="590" cy="510" r="3" fill="#4EA8F5" />
        <circle cx="230" cy="330" r="3" fill="#4EA8F5" />
      </svg>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div {...step(0.05)} className="flex items-center gap-3">
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
          {...step(0.12)}
          className="mt-8 max-w-4xl text-balance text-[clamp(2.5rem,8vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-paper"
        >
          {person.name}
        </motion.h1>

        <motion.p
          {...step(0.2)}
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
          {...step(0.28)}
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
          {...step(0.36)}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-mint px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-mint-soft"
          >
            See selected systems
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-ink-line bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-mint/40 hover:bg-mint/[0.06]"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>

        {/* Orienting strip: fills the lower third of the hero with substance
            rather than empty space, and answers "what is he doing now?". */}
        <motion.dl
          {...step(0.46)}
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-line/70 bg-ink-line/40 sm:mt-20 sm:grid-cols-3"
        >
          {nowStrip.map((item) => (
            <div key={item.label} className="bg-ink/70 px-5 py-4">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mint">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-pretty text-sm leading-snug text-muted">
                {item.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
