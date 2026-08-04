import { Gauge, Shield, Users } from "lucide-react";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { CapabilityMap } from "@/components/capability-map";
import { CareerTimeline } from "@/components/career-timeline";
import { CaseStudy } from "@/components/case-study";
import { ContactCard, SocialRow } from "@/components/contact-card";
import { Credibility } from "@/components/credibility";
import { Hero } from "@/components/hero";
import { ImpactMetrics } from "@/components/impact-metrics";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { Section, SectionHeading } from "@/components/section-heading";
import { SiteNav } from "@/components/site-nav";
import { caseStudies, person, pillars, summary } from "@/lib/content";

const PILLAR_ICONS = { gauge: Gauge, shield: Shield, users: Users } as const;

/**
 * Server component. Only the nav, hero, timeline, contact card and reveal
 * wrappers are client islands — the copy itself ships as static HTML.
 */
export default function Home() {
  return (
    <>
      <AmbientBackdrop />
      <SiteNav />

      <main id="main">
        <Hero />

        {/* 01 — Positioning */}
        <Section id="about" tone="mint" gridPhase="a">
          <SectionHeading
            index="01"
            eyebrow="Positioning"
            title="Operating at the intersection of product, platform and data"
            lede={summary[0]}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal delay={0.06} className="space-y-5">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {summary[1]}
              </p>
              <div aria-hidden="true" className="h-px w-24 rule-fade" />
              <ul className="space-y-6">
                {pillars.map((pillar) => {
                  const Icon =
                    PILLAR_ICONS[pillar.icon as keyof typeof PILLAR_ICONS];
                  const accent =
                    pillar.tone === "emerald" ? "text-mint" : "text-signal";
                  return (
                    <li key={pillar.title} className="flex gap-4">
                      <Icon
                        className={`mt-0.5 h-5 w-5 shrink-0 ${accent}`}
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-medium text-paper">
                          {pillar.title}
                        </h3>
                        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
                          {pillar.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* Verified impact metrics. Each carries its own provenance line so
                no figure floats free of the work that produced it. */}
            <Reveal delay={0.12}>
              <ImpactMetrics />
            </Reveal>
          </div>
        </Section>

        <SectionDivider tone="mint" />

        {/* 02 — Selected systems */}
        <Section id="work" tone="signal" gridPhase="b">
          <SectionHeading
            index="02"
            eyebrow="Selected systems"
            title="Four systems, end to end"
            lede="Cloud infrastructure, an edge product, a fintech re-platform and a batch data migration — each described as the problem, the approach and what actually changed."
          />
          <ul className="mt-12 space-y-5">
            {caseStudies.map((study, index) => (
              <CaseStudy key={study.title} study={study} index={index} />
            ))}
          </ul>
        </Section>

        <SectionDivider tone="signal" />

        {/* 03 — Capability map */}
        <Section id="stack" tone="mint" gridPhase="a">
          <SectionHeading
            index="03"
            eyebrow="Capability map"
            title="What I reach for, and what I've retired"
            lede="Grouped by domain and weighted honestly: the highlighted items are in active use today, the rest are foundational experience I can still read and reason about."
          />
          <CapabilityMap />
        </Section>

        <SectionDivider tone="mint" />

        {/* 04 — Career */}
        <Section id="journey" tone="signal" gridPhase="b">
          <SectionHeading
            index="04"
            eyebrow="Career"
            title="From lecture hall to production platforms"
            lede="Roles overlap — the AI WorkLabs work runs concurrently with engineering roles — so this is a spine with concurrent branches rather than a single-file list."
          />
          <CareerTimeline />

          <div className="mt-16">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-mint">
              Credentials
            </h3>
            <Credibility />
          </div>
        </Section>

        <SectionDivider tone="signal" />

        {/* 05 — Contact */}
        <Section id="contact" className="pb-24 sm:pb-32" tone="mint">
          <SectionHeading
            index="05"
            eyebrow="Contact"
            title="Have a system that needs to scale?"
            lede={`Based in ${person.location}, working with teams across ${person.remoteFor}. ${person.availability}.`}
          />
          <ContactCard />
        </Section>
      </main>

      <footer className="border-t border-ink-line/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="font-mono text-sm font-semibold text-paper">
              {person.name}
            </p>
            <p className="mt-1 text-sm text-subtle">
              {person.currentRole} at {person.currentCompany}
              <span aria-hidden="true" className="mx-2 text-ink-line">
                ·
              </span>
              {person.location}
            </p>
          </div>
          <SocialRow />
        </div>
        <div className="mx-auto max-w-6xl border-t border-ink-line/50 px-5 py-6 sm:px-8">
          {/* zinc-600 on near-black was ~2.6:1 here before; `subtle` is 5.9:1. */}
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {person.name}. Built with Next.js and
            Tailwind CSS.
          </p>
        </div>
      </footer>
    </>
  );
}
