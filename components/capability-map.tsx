"use client";

import { useState } from "react";
import {
  BarChart3,
  Code2,
  Database,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { useFinePointer } from "@/hooks/use-motion-prefs";
import { EASE, ONCE_IN_VIEW } from "@/lib/motion";
import { domainLinks, domainNodes, stackGroups } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS = {
  code: Code2,
  terminal: Terminal,
  database: Database,
  shield: Shield,
  sparkles: Sparkles,
  chart: BarChart3,
} as const;

/** Symmetric adjacency collapsed to one entry per pair. */
const EDGES = Object.entries(domainLinks).flatMap(([from, targets]) =>
  targets.filter((to) => from < to).map((to) => [from, to] as const)
);

export function CapabilityMap() {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const [active, setActive] = useState<string | null>(null);

  const related = active ? domainLinks[active] ?? [] : [];
  const isRelated = (title: string) =>
    active === title || related.includes(title);

  return (
    <>
      {/* Legend, because "current" and "foundational" carry different weight
          and a flat wall of equal-looking chips implies equal expertise. */}
      <Reveal
        delay={0.05}
        className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-subtle"
      >
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-mint"
          />
          In active use
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full border border-subtle"
          />
          Foundational / prior experience
        </span>
      </Reveal>

      {/* Constellation. Decorative-but-informative: it visualises the adjacency
          that the cards below state in words, so hiding it on small screens
          costs no information. */}
      <Reveal
        delay={0.08}
        className="relative mt-10 hidden overflow-hidden rounded-2xl border border-ink-line/70 bg-ink-sunken/50 p-4 sm:block"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dot-grid opacity-30 mask-fade-edges"
        />
        <motion.svg
          viewBox="0 0 520 258"
          aria-hidden="true"
          className="relative mx-auto h-auto w-full max-w-xl"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={ONCE_IN_VIEW}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {/* Enter animation lives on this wrapper; the per-edge attributes below
              carry interaction state, so the two never fight over `opacity`. */}
          <motion.g
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { duration: 0.6, ease: EASE },
                    },
                  }
            }
          >
            {EDGES.map(([from, to]) => {
              const a = domainNodes[from];
              const b = domainNodes[to];
              const lit = active !== null && (from === active || to === active);
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={lit ? "#3DDC97" : "#22222C"}
                  strokeWidth={lit ? 1.5 : 1}
                  opacity={active !== null && !lit ? 0.4 : 1}
                  className="transition-[stroke,stroke-width,opacity] duration-300"
                />
              );
            })}
          </motion.g>

          {Object.entries(domainNodes).map(([title, node]) => {
            const state =
              active === null
                ? "idle"
                : active === title
                  ? "active"
                  : related.includes(title)
                    ? "related"
                    : "dim";

            return (
              <motion.g
                key={title}
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        hidden: { opacity: 0, scale: 0.85 },
                        show: {
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.35, ease: EASE },
                        },
                      }
                }
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                {/* Interaction state on an inner group, clear of the enter
                    animation's opacity/scale. */}
                <g
                  className="transition-opacity duration-300"
                  opacity={state === "dim" ? 0.3 : 1}
                >
                  {state === "active" ? (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
                      fill="none"
                      stroke="#3DDC97"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  ) : null}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={state === "active" ? 7 : 5}
                    fill={
                      state === "active"
                        ? "#3DDC97"
                        : state === "related"
                          ? "#7BEFC0"
                          : "#4EA8F5"
                    }
                    opacity={state === "idle" ? 0.7 : 1}
                    className="transition-[r,fill] duration-300"
                  />
                  <text
                    x={node.x}
                    y={node.y + 24}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill={
                      state === "active" || state === "related"
                        ? "#F5F3EE"
                        : "#8B8B96"
                    }
                    className="font-mono transition-colors duration-300"
                  >
                    {title}
                  </text>
                </g>
              </motion.g>
            );
          })}
        </motion.svg>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, index) => {
          const Icon = ICONS[group.icon as keyof typeof ICONS];
          const accent =
            group.tone === "emerald" ? "text-mint" : "text-signal";
          /* Dimming is a pointer affordance only. On touch there is no hover, so
             nothing is ever dimmed and every card stays fully legible. */
          const dimmed =
            finePointer && active !== null && !isRelated(group.title);
          const highlighted = finePointer && isRelated(group.title);

          return (
            <Reveal
              as="li"
              key={group.title}
              delay={0.04 * index}
              className={cn(
                "group rounded-xl border bg-ink-raised/50 p-5 outline-none transition-[border-color,opacity,transform,box-shadow] duration-300",
                "hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
                highlighted
                  ? "border-mint/40 shadow-[0_18px_44px_-34px_rgba(61,220,151,0.7)]"
                  : "border-ink-line/80",
                dimmed && "opacity-45"
              )}
            >
              <div
                tabIndex={0}
                onMouseEnter={() => setActive(group.title)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(group.title)}
                onBlur={() => setActive(null)}
                className="outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${accent}`} aria-hidden="true" />
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-paper">
                    {group.title}
                  </h3>
                </div>

                {/* Stated in text as well as drawn, so the relationship is
                    available without hover and to screen readers. */}
                <p className="mt-2 font-mono text-[0.65rem] leading-relaxed text-subtle">
                  <span className="sr-only">Related domains: </span>
                  <span aria-hidden="true">↔ </span>
                  {(domainLinks[group.title] ?? []).join(" · ")}
                </p>

                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className={
                        item.current
                          ? "flex items-center gap-1.5 rounded-md border border-mint/25 bg-mint/[0.08] px-2.5 py-1 text-[0.8rem] font-medium text-mint-soft transition-colors duration-300 group-hover:border-mint/40"
                          : "rounded-md border border-ink-line/70 px-2.5 py-1 text-[0.8rem] text-subtle transition-colors duration-300 group-hover:text-muted"
                      }
                    >
                      {item.current ? (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-mint"
                        />
                      ) : null}
                      {item.name}
                      {item.current ? (
                        <span className="sr-only"> — in active use</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </>
  );
}
