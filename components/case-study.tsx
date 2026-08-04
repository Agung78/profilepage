import { Reveal } from "@/components/reveal";
import { SystemDiagram } from "@/components/system-diagram";
import type { CaseStudy as CaseStudyData } from "@/lib/content";

const STEPS = [
  { key: "challenge", label: "Challenge" },
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
  const accent = study.tone === "emerald" ? "text-mint" : "text-signal";
  const rail = study.tone === "emerald" ? "bg-mint" : "bg-signal";

  return (
    <Reveal
      as="li"
      delay={0.05}
      /* No cursor-pointer or hover-lift: nothing here is clickable, and a
         false affordance is worse than none. */
      className="group relative overflow-hidden rounded-2xl border border-ink-line/80 bg-ink-raised/60"
    >
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

          <dl className="mt-7 space-y-5">
            {STEPS.map((step) => (
              <div key={step.key} className="relative pl-5">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px ${rail} opacity-40`}
                />
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">
                  {step.label}
                </dt>
                <dd className="mt-1.5 text-pretty text-[0.95rem] leading-relaxed text-muted">
                  {study[step.key]}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-7 flex flex-wrap gap-2">
            {study.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-ink-line bg-white/[0.02] px-2.5 py-1 font-mono text-[0.7rem] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Schematic panel: dot grid establishes it as a drawing surface so the
            thin diagram doesn't float in an empty column on tall cards. */}
        <div className="relative order-1 flex flex-col justify-center gap-4 overflow-hidden border-b border-ink-line/60 bg-ink-sunken/60 p-6 lg:order-2 lg:border-b-0 lg:border-l">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-dot-grid opacity-40 mask-fade-edges"
          />
          <div className="relative h-32 w-full max-w-xs self-center lg:h-40">
            <SystemDiagram
              kind={study.icon}
              tone={study.tone}
              label={study.title}
            />
          </div>
          <p className="relative self-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle">
            {study.icon === "database"
              ? "batch pipeline"
              : study.icon === "cloud"
                ? "control plane → workloads"
                : study.icon === "wifi"
                  ? "edge → gate → network"
                  : "shared library → surfaces"}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
