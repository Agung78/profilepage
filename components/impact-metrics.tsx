"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { FlowPipeline } from "@/components/flow-pipeline";
import { metrics } from "@/lib/content";

/** Splits "4 yrs" into 4 and " yrs". Returns null for non-numeric values. */
function parseValue(value: string) {
  const match = /^(\d+)(.*)$/.exec(value);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] };
}

/**
 * Counts up to its value the first time it becomes visible.
 *
 * The final string is what renders server-side, so a no-JS visitor and every
 * crawler see the real figure. The count is written straight to the DOM node
 * rather than through state — no re-renders, and the value is restored exactly
 * as authored on completion.
 */
function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  /* Positive bottom margin: the observer fires while the metric is still below
     the fold, so the count is already underway by the time it is visible. That
     removes any need to pre-zero the number on mount — the real value is only
     ever replaced as the first frame of an animation that is actually running,
     so a stalled observer leaves the correct figure on screen. */
  const inView = useInView(ref, { once: true, margin: "0px 0px 20% 0px" });
  const parsed = parseValue(value);
  const shouldCount = Boolean(parsed) && !reduceMotion;

  useEffect(() => {
    if (!shouldCount || !parsed || !inView) return;
    const node = ref.current;
    if (!node) return;

    node.textContent = `0${parsed.suffix}`;
    const controls = animate(0, parsed.target, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${parsed.suffix}`;
      },
      onComplete: () => {
        node.textContent = value;
      },
    });

    return () => controls.stop();
  }, [inView, shouldCount, parsed, value]);

  return <span ref={ref}>{value}</span>;
}

export function ImpactMetrics() {
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">
        Verified impact
      </p>
      <dl className="mt-5 divide-y divide-ink-line/60 border-y border-ink-line/60">
        {metrics.map((metric) => {
          /* The one metric that is a transformation rather than a number gets
             the pipeline treatment. */
          const isFlow = metric.value.includes("→");

          return (
            <div
              key={metric.label}
              tabIndex={0}
              className="group relative py-5 pl-4 outline-none transition-transform duration-500 hover:translate-x-1 focus-visible:translate-x-1"
            >
              {/* Signal rail: neutral at rest, accent on hover or focus. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-5 h-[calc(100%-2.5rem)] w-px bg-ink-line"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-5 h-[calc(100%-2.5rem)] w-px origin-top scale-y-0 bg-mint transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />

              <dt className="font-mono text-[1.375rem] leading-none tracking-tight text-mint sm:text-2xl">
                <MetricValue value={metric.value} />
              </dt>
              <dd className="mt-2.5">
                <span className="block text-sm font-medium text-paper">
                  {metric.label}
                </span>
                <span className="mt-1 block text-pretty text-sm leading-relaxed text-subtle transition-colors duration-500 group-hover:text-muted group-focus-visible:text-muted">
                  {metric.detail}
                </span>
                {isFlow ? <FlowPipeline /> : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
}
