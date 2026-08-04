import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  /** Monospace kicker, e.g. "02 / Selected systems". */
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-mint">
        <span className="text-subtle">{index}</span>
        <span aria-hidden="true" className="mx-2 text-ink-line">
          /
        </span>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-paper">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone,
  gridPhase = "a",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Soft wash at the section's top edge. Omit for no wash. */
  tone?: "mint" | "signal";
  /** Offsets the dot texture so consecutive sections don't align. */
  gridPhase?: "a" | "b";
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32 ${className}`}
    >
      {/* Transition, not a background change: a low-opacity wash and a shifted
          dot texture that both resolve to nothing well before the content. */}
      {tone ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b to-transparent ${
            tone === "mint" ? "from-mint/[0.035]" : "from-signal/[0.035]"
          }`}
        />
      ) : null}
      {/* Literal class names: a template string here would not survive
          Tailwind's content scan. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-dot-grid opacity-[0.18] mask-fade-b ${
          gridPhase === "b" ? "grid-phase-b" : "grid-phase-a"
        }`}
      />
      {children}
    </section>
  );
}
