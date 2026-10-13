import { CareerTimeline } from "@/components/career-timeline";
import { CaseStudy } from "@/components/case-study";
import { ContactCard, SocialRow } from "@/components/contact-card";
import { Credibility } from "@/components/credibility";
import { FlowPipeline } from "@/components/flow-pipeline";
import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/site-nav";
import { caseStudies, person, stackGroups } from "@/lib/content";

function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="max-w-3xl text-balance font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {lede && <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed">{lede}</p>}
      {children}
    </section>
  );
}

/** Server component; only nav, hero, reveal wrappers and the copy button are client islands. */
export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="main">
        <Hero />

        <Section
          id="how"
          title="How an engagement runs"
          lede="The same four beats on every deployment, from the first conversation with the client to the number they report upward."
        >
          <FlowPipeline />
        </Section>

        <Section
          id="work"
          title="Deployments"
          lede="Five systems, each framed the way the client would: what was wrong, what went into production, and what changed."
        >
          <ul className="mt-12">
            {caseStudies.map((study) => (
              <CaseStudy key={study.title} study={study} />
            ))}
          </ul>
        </Section>

        <Section id="stack" title="What goes into a deployment">
          <dl className="mt-12 border-t border-ink">
            {stackGroups.map((group) => (
              <div
                key={group.title}
                className="grid gap-2 border-b border-line py-5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10"
              >
                <dt className="font-display text-lg text-ink">{group.title}</dt>
                <dd className="text-pretty">{group.items.join("  ·  ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          id="journey"
          title="From lecture hall to production platforms"
          lede="Seven years of teaching, data engineering, fintech and client-embedded platform work. Roles overlap; AI WorkLabs and Timedoor run alongside full-time work."
        >
          <CareerTimeline />
          <div className="mt-16">
            <Credibility />
          </div>
        </Section>

        <section id="contact" className="on-ink bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <h2 className="max-w-3xl text-balance font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em]">
              Have a client problem that needs to ship?
            </h2>
            <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#D9D3C4]">
              Based in {person.location}, working with teams across {person.remoteFor}. {person.availability}.
            </p>
            <ContactCard />
          </div>
        </section>
      </main>

      <footer className="on-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-paper/15 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm text-[#D9D3C4]">
            © {new Date().getFullYear()} {person.name} · {person.currentRole}, {person.currentCompany}
          </p>
          <SocialRow />
        </div>
      </footer>
    </>
  );
}
