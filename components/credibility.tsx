import { Icon } from "@iconify/react";
import { Reveal } from "@/components/reveal";
import { certifications, education, languages } from "@/lib/content";

export function Credibility() {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-3">
      <Reveal className="rounded-xl border border-ink-line/80 bg-ink-raised/50 p-6">
        <h3 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper">
          <Icon icon="solar:square-academic-cap-linear" className="h-4 w-4 text-mint" aria-hidden="true" />
          Education
        </h3>
        <ul className="mt-5 space-y-5">
          {education.map((item) => (
            <li key={item.school}>
              <p className="text-[0.95rem] font-medium text-paper">
                {item.school}
              </p>
              <p className="mt-0.5 text-sm text-muted">{item.credential}</p>
              {/* Tertiary line — a date, not a claim — so it sits one step
                  dimmer than `subtle` (REDESIGN.md §1's `--paper-dim`). */}
              <p className="mt-1 font-mono text-xs text-paper-dim">
                {item.period}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        delay={0.06}
        className="rounded-xl border border-ink-line/80 bg-ink-raised/50 p-6"
      >
        <h3 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper">
          <Icon icon="solar:medal-ribbon-linear" className="h-4 w-4 text-signal" aria-hidden="true" />
          Certifications
        </h3>
        <ul className="mt-5 space-y-3">
          {certifications.map((cert) => (
            <li
              key={cert}
              className="relative pl-4 text-sm leading-relaxed text-muted"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.5rem] h-1 w-1 rounded-full bg-signal"
              />
              {cert}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        delay={0.12}
        className="rounded-xl border border-ink-line/80 bg-ink-raised/50 p-6"
      >
        <h3 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper">
          <Icon icon="solar:global-linear" className="h-4 w-4 text-mint" aria-hidden="true" />
          Languages
        </h3>
        <dl className="mt-5 space-y-3">
          {languages.map((language) => (
            <div
              key={language.name}
              className="flex items-baseline justify-between gap-4 border-b border-ink-line/50 pb-2.5 last:border-0 last:pb-0"
            >
              <dt className="text-sm text-paper">{language.name}</dt>
              <dd className="font-mono text-xs text-subtle">
                {language.level}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
