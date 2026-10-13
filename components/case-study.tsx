import { Reveal } from "@/components/reveal";
import type { CaseStudy as Study } from "@/lib/content";

export function CaseStudy({ study }: { study: Study }) {
  return (
    <Reveal as="li" className="grid gap-6 border-t border-ink py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
      <div>
        <p className="font-mono text-xs text-flare">{study.client}</p>
        <h3 className="mt-3 text-balance font-display text-2xl leading-tight text-ink sm:text-3xl">
          {study.title}
        </h3>
        <p className="mt-3 font-mono text-xs text-mute tabular">{study.period}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-ink">The problem</h4>
          <p className="mt-1.5 max-w-[65ch] text-pretty leading-relaxed">{study.problem}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">What I deployed</h4>
          <p className="mt-1.5 max-w-[65ch] text-pretty leading-relaxed">{study.deployed}</p>
        </div>
        <div className="on-ink bg-ink p-5 text-paper">
          <h4 className="font-mono text-xs text-flare-bright">Outcome</h4>
          <p className="mt-1.5 max-w-[65ch] text-pretty leading-relaxed">{study.outcome}</p>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-mute">
          {study.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
