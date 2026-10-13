"use client";

import { useRef } from "react";
import { Icon } from "@/lib/icons";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
import { EASE, gsap, useGSAP } from "@/lib/motion";
import { nowStrip, person, summary } from "@/lib/content";

/**
 * The page's one authored motion: headline lines rise out of a clip, then the
 * ledger rows fade in. Everything is visible by default; JS only animates from
 * the hidden state, and reduced motion skips it entirely.
 */
export function Hero() {
  const reduce = useMotionPrefs();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: EASE } })
        .from("[data-line]", { yPercent: 105, duration: 0.9, stagger: 0.12 })
        .from("[data-fade]", { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, "-=0.4");
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section id="top" ref={root} className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
      <p data-fade className="font-mono text-xs text-mute">
        {person.name} · {person.location}
      </p>

      <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,8.2vw,6rem)] font-light leading-[1.02] tracking-[-0.03em] text-ink">
        <span className="sr-only">{person.name}, {person.currentRole} — </span>
        <span className="block overflow-hidden pb-[0.08em]">
          <span data-line className="block">Forward deployed.</span>
        </span>
        <span className="block overflow-hidden pb-[0.08em]">
          <span data-line className="block">
            Shipped to <em className="text-flare">production</em>.
          </span>
        </span>
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
        <div data-fade>
          <p className="max-w-[34rem] text-pretty text-xl leading-snug text-ink">{summary[0]}</p>
          <p className="mt-5 max-w-[34rem] text-pretty leading-relaxed">{summary[1]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-flare"
            >
              Start a conversation
              <Icon icon="solar:arrow-down-linear" className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 border border-ink px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              See deployments
            </a>
          </div>
        </div>

        <div className="on-ink self-start bg-ink p-6 text-paper sm:p-8">
          <p className="font-mono text-xs text-flare-bright">Current deployment</p>
          <dl>
          {nowStrip.map((item) => (
            <div key={item.label} data-fade className="mt-5 border-t border-paper/15 pt-4">
              <dt className="font-mono text-xs text-[#B9B2A2]">{item.label}</dt>
              <dd className="mt-1 text-pretty">{item.value}</dd>
            </div>
          ))}
          </dl>
          <p data-fade className="mt-6 border-t border-paper/15 pt-4 text-sm text-paper">
            {person.availability}.
          </p>
        </div>
      </div>
    </section>
  );
}
