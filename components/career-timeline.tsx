"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { EASE, ONCE_IN_VIEW } from "@/lib/motion";
import { roles, type Role } from "@/lib/content";
import { cn } from "@/lib/utils";

const keyOf = (role: Role) => `${role.company}-${role.title}`;

/* Filtering preserves CV order: the two current roles already lead the list. */
const CURRENT = roles.filter((role) => role.current);
const PAST = roles.filter((role) => !role.current);

type EntryProps = {
  role: Role;
  open: boolean;
  onToggle: () => void;
};

function RoleEntry({ role, open, onToggle }: EntryProps) {
  const reduceMotion = useReducedMotion();
  const hasDetail = role.points.length > 0;
  const panelId = `role-panel-${keyOf(role).replace(/\s+/g, "-")}`;

  return (
    <li className="relative pl-8">
      {/* Node. Scales in once as the entry arrives. */}
      <motion.span
        aria-hidden="true"
        initial={reduceMotion ? undefined : { scale: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        viewport={ONCE_IN_VIEW}
        transition={{ duration: 0.34, ease: EASE }}
        className={cn(
          "absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-[3px] border-ink",
          role.current ? "bg-mint" : "bg-ink-line"
        )}
      />

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={ONCE_IN_VIEW}
        transition={{ duration: 0.44, ease: EASE, delay: 0.06 }}
        className="rounded-xl border border-ink-line/70 bg-ink-raised/40 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink-line focus-within:border-mint/30"
      >
        {/* The toggle lives on the meta row, not beside the title, so the
            role name always gets the card's full width at 320px. */}
        <div className="flex items-center justify-between gap-3 px-5 pt-3.5">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-subtle">{role.period}</span>
            {role.current ? (
              <span className="rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-mint">
                Now
              </span>
            ) : null}
          </div>

          {hasDetail ? (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-ink-line px-2.5 py-1.5 font-mono text-[0.7rem] text-muted transition-colors duration-300 hover:border-mint/40 hover:text-paper"
            >
              <span className="sr-only">
                {open ? "Hide" : "Show"} detail for {role.title} at{" "}
                {role.company}
              </span>
              <span aria-hidden="true">{open ? "Less" : "Detail"}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  open && "rotate-180"
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
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.32, ease: EASE }
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
      </motion.div>
    </li>
  );
}

/**
 * Career timeline with concurrent roles.
 *
 * The two current roles are bracketed together under a "Concurrent" band rather
 * than stacked in sequence, so nothing implies HeyRCG! replaced AI WorkLabs —
 * both run today. Past roles follow in CV order below.
 *
 * The spine draws itself as the section scrolls (a `scaleY` transform on a
 * single element, spring-smoothed). Under `prefers-reduced-motion` it renders
 * fully drawn instead.
 */
export function CareerTimeline() {
  const reduceMotion = useReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(keyOf(roles[0]));

  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["start 0.85", "end 0.45"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const toggle = (role: Role) => {
    const key = keyOf(role);
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    /* Capped measure: full 6xl width pushes bullet lines past a comfortable
       reading length. */
    <div ref={wrapper} className="relative mt-12 max-w-3xl">
      {/* Unlit track, then the progressively drawn spine on top of it. */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[7px] top-3 w-px bg-ink-line/70"
      />
      <motion.span
        aria-hidden="true"
        style={reduceMotion ? undefined : { scaleY: progress }}
        className="absolute bottom-6 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-mint/70 via-signal/50 to-signal/20"
      />

      <p className="relative pl-8 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mint">
        Concurrent — both roles active
      </p>
      {/* Gutter bracket ties the two current nodes together as one span of
          time. Without it, two stacked cards read as a succession. */}
      <ol className="relative mt-3 space-y-3">
        <span
          aria-hidden="true"
          className="absolute inset-y-3 left-[6px] w-[3px] rounded-full bg-mint/35"
        />
        {CURRENT.map((role) => (
          <RoleEntry
            key={keyOf(role)}
            role={role}
            open={openKey === keyOf(role)}
            onToggle={() => toggle(role)}
          />
        ))}
      </ol>

      <p className="relative mt-10 pl-8 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">
        Previously
      </p>
      <ol className="relative mt-3 space-y-3">
        {PAST.map((role) => (
          <RoleEntry
            key={keyOf(role)}
            role={role}
            open={openKey === keyOf(role)}
            onToggle={() => toggle(role)}
          />
        ))}
      </ol>
    </div>
  );
}
