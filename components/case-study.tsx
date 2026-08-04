"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SystemDiagram } from "@/components/system-diagram";
import { EASE } from "@/lib/motion";
import { systemFlows, type CaseStudy as CaseStudyData } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Disclosed detail. The challenge stays visible so every card reads on its own. */
const DISCLOSED = [
  { key: "approach", label: "Approach" },
  { key: "impact", label: "Impact" },
] as const;

export function CaseStudy({
  study,
  index,
}: {
  study: CaseStudyData;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  /* First card opens by default: the section should never read as a wall of
     collapsed rows. */
  const [open, setOpen] = useState(index === 0);
  const panelId = `case-panel-${index}`;
  const accent = study.tone === "emerald" ? "text-mint" : "text-signal";
  const rail = study.tone === "emerald" ? "bg-mint" : "bg-signal";

  return (
    <Reveal
      as="li"
      delay={0.05}
      className="group relative overflow-hidden rounded-2xl border border-ink-line/80 bg-ink-raised/60 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-ink-line hover:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] focus-within:border-mint/30"
    >
      {/* Hairline that lights along the top edge on hover — signal accent, not
          a colour change to the card itself. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100",
          study.tone === "emerald"
            ? "bg-gradient-to-r from-transparent via-mint/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-signal/60 to-transparent"
        )}
      />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="order-2 p-6 sm:p-8 lg:order-1 lg:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
            <span className="text-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={accent}>{study.org}</span>
            <span aria-hidden="true" className="text-ink-line">
              /
            </span>
            <span className="text-subtle">{study.kind}</span>
            <span aria-hidden="true" className="text-ink-line">
              /
            </span>
            <span className="text-subtle">{study.period}</span>
          </div>

          <h3 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] text-paper sm:text-3xl">
            {study.title}
          </h3>

          <div className="mt-7 space-y-5">
            <div className="relative pl-5">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px ${rail} opacity-40`}
              />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">
                Challenge
              </p>
              <p className="mt-1.5 text-pretty text-[0.95rem] leading-relaxed text-muted">
                {study.challenge}
              </p>
            </div>
          </div>

          <motion.div
            id={panelId}
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.36, ease: EASE }
            }
            className="overflow-hidden"
          >
            <dl className="space-y-5 pt-5">
              {DISCLOSED.map((item) => (
                <div key={item.key} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px ${rail} opacity-40`}
                  />
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {study[item.key]}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="flex flex-wrap gap-2 pt-7">
              {study.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-ink-line bg-white/[0.02] px-2.5 py-1 font-mono text-[0.7rem] text-muted transition-colors duration-300 hover:border-ink-line hover:text-paper"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-7 inline-flex items-center gap-2 rounded-md border border-ink-line bg-white/[0.02] px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:border-mint/40 hover:text-paper"
          >
            <span className="sr-only">
              {open ? "Hide" : "Show"} approach, impact and stack for{" "}
              {study.title}
            </span>
            <span aria-hidden="true">
              {open ? "Less" : "Approach & impact"}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Schematic panel: dot grid establishes it as a drawing surface so the
            thin diagram doesn't float in an empty column on tall cards. */}
        <div className="relative order-1 flex flex-col justify-center gap-4 overflow-hidden border-b border-ink-line/60 bg-ink-sunken/60 p-6 lg:order-2 lg:border-b-0 lg:border-l">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-dot-grid opacity-40 mask-fade-edges"
          />
          <div className="relative w-full max-w-[15rem] self-center">
            <SystemDiagram
              kind={study.icon}
              tone={study.tone}
              label={study.title}
            />
          </div>
          <p className="relative self-center text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle">
            {systemFlows[study.icon].caption}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
