"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { roles } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Career timeline with concurrent roles.
 *
 * Roles overlap in reality (AI WorkLabs runs alongside both HeyRCG! and the
 * final AIA years), so this renders a single spine with "Now" markers rather
 * than pretending the history is strictly sequential. Entries with detail are
 * collapsible — expanded by default on desktop, collapsed on mobile where the
 * full bullet lists would otherwise dominate the page.
 */
export function CareerTimeline() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    /* Capped measure: full 6xl width pushes bullet lines past a comfortable
       reading length. */
    <ol className="relative mt-12 max-w-3xl space-y-3">
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[7px] top-3 w-px bg-gradient-to-b from-mint/50 via-signal/40 to-transparent"
      />

      {roles.map((role, index) => {
        const hasDetail = role.points.length > 0;
        const isOpen = openIndex === index;
        const panelId = `role-panel-${index}`;

        return (
          <li key={`${role.company}-${role.title}`} className="relative pl-8">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-[3px] border-ink",
                role.current ? "bg-mint" : "bg-ink-line"
              )}
            />

            <div className="rounded-xl border border-ink-line/70 bg-ink-raised/40">
              {/* The toggle lives on the meta row, not beside the title, so the
                  role name always gets the card's full width at 320px. */}
              <div className="flex items-center justify-between gap-3 px-5 pt-3.5">
                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-subtle">
                    {role.period}
                  </span>
                  {role.current ? (
                    <span className="rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-mint">
                      Now
                    </span>
                  ) : null}
                </div>

                {hasDetail ? (
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-ink-line px-2.5 py-1.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-mint/40 hover:text-paper"
                  >
                    <span className="sr-only">
                      {isOpen ? "Hide" : "Show"} detail for {role.title} at{" "}
                      {role.company}
                    </span>
                    <span aria-hidden="true">{isOpen ? "Less" : "Detail"}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                ) : null}
              </div>

              <div className="px-5 pb-4 pt-2">
                <h3 className="text-balance text-lg font-semibold leading-snug text-paper">
                  {role.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted">
                  {role.company}
                  <span aria-hidden="true" className="mx-2 text-ink-line">
                    ·
                  </span>
                  <span className="text-subtle">{role.location}</span>
                </p>
              </div>

              {hasDetail ? (
                <motion.div
                  id={panelId}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="overflow-hidden"
                >
                  <ul className="space-y-2.5 border-t border-ink-line/60 px-5 py-4">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-pretty text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.55rem] h-1 w-1 rounded-full bg-subtle"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
