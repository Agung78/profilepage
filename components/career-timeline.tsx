import { roles } from "@/lib/content";

/** Ledger-style career list. Roles with detail open by default; static HTML, no scripts. */
export function CareerTimeline() {
  return (
    <ol className="mt-12 border-t border-ink">
      {roles.map((role) => (
        <li
          key={`${role.company}-${role.title}`}
          className="grid gap-4 border-b border-line py-7 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10"
        >
          <p className="font-mono text-xs leading-relaxed text-mute tabular">
            {role.period}
            <span className="block">{[role.type, role.location].filter(Boolean).join(" · ")}</span>
          </p>
          <div>
            <h3 className="font-display text-xl text-ink">
              {role.title}
              <span className="text-mute"> — {role.company}</span>
            </h3>
            {role.points.length > 0 && (
              <ul className="mt-3 max-w-[65ch] space-y-2 text-sm leading-relaxed">
                {role.points.map((point) => (
                  <li key={point} className="relative pl-4 text-pretty before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-flare">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
