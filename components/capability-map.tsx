import {
  BarChart3,
  Code2,
  Database,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { stackGroups } from "@/lib/content";

const ICONS = {
  code: Code2,
  terminal: Terminal,
  database: Database,
  shield: Shield,
  sparkles: Sparkles,
  chart: BarChart3,
} as const;

export function CapabilityMap() {
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

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, index) => {
          const Icon = ICONS[group.icon as keyof typeof ICONS];
          const accent =
            group.tone === "emerald" ? "text-mint" : "text-signal";
          return (
            <Reveal
              as="li"
              key={group.title}
              delay={0.04 * index}
              className="rounded-xl border border-ink-line/80 bg-ink-raised/50 p-5 transition-colors hover:border-ink-line"
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${accent}`} aria-hidden="true" />
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-paper">
                  {group.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={
                      item.current
                        ? "flex items-center gap-1.5 rounded-md border border-mint/25 bg-mint/[0.08] px-2.5 py-1 text-[0.8rem] font-medium text-mint-soft"
                        : "rounded-md border border-ink-line/70 px-2.5 py-1 text-[0.8rem] text-subtle"
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
            </Reveal>
          );
        })}
      </ul>
    </>
  );
}
