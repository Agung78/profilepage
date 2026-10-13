import { certifications, education, languages } from "@/lib/content";

export function Credibility() {
  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-3">
      <div>
        <h3 className="font-display text-xl text-ink">Education</h3>
        <ul className="mt-4 space-y-4">
          {education.map((item) => (
            <li key={item.school}>
              <p className="font-medium text-ink">{item.school}</p>
              <p className="text-sm">{item.credential}</p>
              <p className="font-mono text-xs text-mute tabular">{item.period}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display text-xl text-ink">Certifications</h3>
        <ul className="mt-4 space-y-2 text-sm">
          {certifications.map((cert) => (
            <li key={cert.url} className="border-b border-line pb-2 last:border-0">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink transition-colors hover:text-flare"
              >
                {cert.name}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display text-xl text-ink">Languages</h3>
        <dl className="mt-4 space-y-2 text-sm">
          {languages.map((l) => (
            <div key={l.name} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
              <dt className="text-ink">{l.name}</dt>
              <dd className="text-mute">{l.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
