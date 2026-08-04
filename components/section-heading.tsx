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
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}
