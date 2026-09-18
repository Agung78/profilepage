"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/reveal";
import { useFinePointer, useMotionPrefs } from "@/hooks/use-motion-prefs";
import { EASE, gsap, useGSAP } from "@/lib/motion";
import { domainLinks, domainNodes, stackGroups } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS = {
  code: "solar:code-square-linear",
  terminal: "solar:file-terminal-linear",
  database: "solar:database-linear",
  shield: "solar:shield-linear",
  sparkles: "solar:stars-linear",
  chart: "solar:chart-2-linear",
} as const;

/** Symmetric adjacency collapsed to one entry per pair. */
const EDGES = Object.entries(domainLinks).flatMap(([from, targets]) =>
  targets.filter((to) => from < to).map((to) => [from, to] as const)
);

export function CapabilityMap() {
  const reduceMotion = useMotionPrefs();
  const finePointer = useFinePointer();
  const [active, setActive] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const related = active ? domainLinks[active] ?? [] : [];
  const isRelated = (title: string) =>
    active === title || related.includes(title);

  /* Entrance choreography, not a scrub or a pin — an IntersectionObserver
     plays a paused GSAP timeline once, rather than reaching for
     ScrollTrigger (reserved elsewhere for the three scrub/pin uses). */
  useGSAP(
    () => {
      if (reduceMotion || !svgRef.current) return;
      const nodes = svgRef.current.querySelectorAll("[data-node]");

      const tl = gsap.timeline({ paused: true });
      tl.fromTo(svgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: EASE });
      tl.fromTo(
        nodes,
        { opacity: 0, scale: 0.85, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 0.35, ease: EASE, stagger: 0.05 },
        "<"
      );

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          tl.play();
          observer.disconnect();
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" }
      );
      observer.observe(svgRef.current);

      return () => {
        observer.disconnect();
        tl.kill();
      };
    },
    { dependencies: [reduceMotion] }
  );

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
        <svg
          ref={svgRef}
          viewBox="0 0 520 258"
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: 0 }}
          className="relative mx-auto h-auto w-full max-w-xl"
        >
          <g>
            {EDGES.map(([from, to]) => {
              const a = domainNodes[from];
              const b = domainNodes[to];
              const lit = active !== null && (from === active || to === active);
              return (
                <line
                  key={`${from}-${to}`}
                  data-edge=""
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
          </g>

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
              <g key={title} data-node="" style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
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
              </g>
            );
          })}
        </svg>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, index) => {
          const icon = ICONS[group.icon as keyof typeof ICONS];
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
                  <Icon icon={icon} className={`h-4 w-4 ${accent}`} aria-hidden="true" />
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
