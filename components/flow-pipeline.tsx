import { Reveal } from "@/components/reveal";
import { engagement } from "@/lib/content";

/** The engagement arc: problem, embedded, shipped, measured. */
export function FlowPipeline() {
  return (
    <ol className="mt-12 grid gap-0 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
      {engagement.map((item, i) => (
        <Reveal as="li" key={item.step} delay={i * 0.08} className="relative border-b border-line py-8 sm:pr-8 lg:border-b-0">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-2.5 w-2.5 bg-flare" />
            <span className="h-px flex-1 bg-line" />
          </div>
          <h3 className="mt-5 font-display text-3xl text-ink">{item.step}</h3>
          <p className="mt-2 font-medium text-ink">{item.title}</p>
          <p className="mt-3 text-pretty text-sm leading-relaxed">{item.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
