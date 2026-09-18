"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FlowPipeline } from "@/components/flow-pipeline";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
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
 * crawler see the real figure. Visibility uses a plain IntersectionObserver
 * (not a ScrollTrigger — this is a one-shot entrance count, not a scrub or a
 * pin, so it stays outside the three uses REDESIGN.md §4 reserves for
 * ScrollTrigger) and the count itself is a GSAP tween over a plain object,
 * written to the DOM node on every tick rather than through React state.
 */
function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useMotionPrefs();
  const parsed = parseValue(value);
  const shouldCount = Boolean(parsed) && !reduceMotion;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!shouldCount || !parsed) {
      node.textContent = value;
      return;
    }

    let tween: gsap.core.Tween | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        node.textContent = `0${parsed.suffix}`;
        const proxy = { value: 0 };
        tween = gsap.to(proxy, {
          value: parsed.target,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = `${Math.round(proxy.value)}${parsed.suffix}`;
          },
          onComplete: () => {
            node.textContent = value;
          },
        });
      },
      { threshold: 0, rootMargin: "0px 0px 20% 0px" }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [shouldCount, parsed, value]);

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
