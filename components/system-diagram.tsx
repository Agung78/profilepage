import type { CaseStudy } from "@/lib/content";

const TONES = {
  emerald: { line: "#3DDC97", node: "#7BEFC0" },
  sky: { line: "#4EA8F5", node: "#9BCDFF" },
} as const;

type Props = {
  kind: CaseStudy["icon"];
  tone: CaseStudy["tone"];
  /** Rendered decoratively; the prose beside it carries the meaning. */
  label: string;
};

/**
 * Small schematic per case study. These are deliberately abstract — they
 * communicate the *shape* of each system (fan-out, pipeline, edge, mesh)
 * rather than pretending to be a real architecture document.
 */
export function SystemDiagram({ kind, tone, label }: Props) {
  const c = TONES[tone];

  return (
    <svg
      viewBox="0 0 240 160"
      role="img"
      aria-label={`Schematic: ${label}`}
      className="h-full w-full"
    >
      <g stroke="#22222C" strokeWidth="1">
        <path d="M0 40h240M0 80h240M0 120h240" opacity="0.5" />
        <path d="M60 0v160M120 0v160M180 0v160" opacity="0.5" />
      </g>

      {kind === "cloud" ? (
        /* One control plane fanning out to two managed workloads. */
        <g fill="none" strokeWidth="1.5">
          <path d="M120 42v26M120 68 60 106M120 68l60 38" stroke={c.line} />
          <path
            d="M120 42v26M120 68 60 106M120 68l60 38"
            stroke={c.node}
            strokeDasharray="10 210"
            className="animate-stream"
          />
          <rect x="92" y="24" width="56" height="20" rx="5" fill="#0F0F16" stroke={c.line} />
          <rect x="34" y="104" width="52" height="20" rx="5" fill="#0F0F16" stroke="#22222C" />
          <rect x="154" y="104" width="52" height="20" rx="5" fill="#0F0F16" stroke="#22222C" />
          <circle cx="120" cy="34" r="2.5" fill={c.node} stroke="none" />
        </g>
      ) : null}

      {kind === "wifi" ? (
        /* Client at the edge, portal as the gate, network behind it. */
        <g fill="none" strokeWidth="1.5">
          <circle cx="52" cy="80" r="7" stroke="#22222C" />
          <path d="M59 80h44" stroke={c.line} />
          <rect x="103" y="62" width="42" height="36" rx="6" fill="#0F0F16" stroke={c.line} />
          <path d="M145 80h43" stroke={c.line} strokeDasharray="4 5" />
          <g stroke={c.node} opacity="0.7">
            <path d="M188 66a18 18 0 0 1 0 28" />
            <path d="M198 58a30 30 0 0 1 0 44" />
          </g>
          <path
            d="M59 80h44"
            stroke={c.node}
            strokeDasharray="8 200"
            className="animate-stream"
          />
          <circle cx="124" cy="80" r="3" fill={c.node} stroke="none" />
        </g>
      ) : null}

      {kind === "code" ? (
        /* A shared component library feeding three product surfaces. */
        <g fill="none" strokeWidth="1.5">
          <rect x="20" y="66" width="46" height="28" rx="6" fill="#0F0F16" stroke={c.line} />
          <path d="M66 80h34M100 80 148 44M100 80h48M100 80l48 36" stroke={c.line} />
          <path
            d="M66 80h34"
            stroke={c.node}
            strokeDasharray="8 200"
            className="animate-stream"
          />
          <rect x="148" y="32" width="60" height="22" rx="5" fill="#0F0F16" stroke="#22222C" />
          <rect x="148" y="69" width="60" height="22" rx="5" fill="#0F0F16" stroke="#22222C" />
          <rect x="148" y="106" width="60" height="22" rx="5" fill="#0F0F16" stroke="#22222C" />
          <circle cx="100" cy="80" r="3.5" fill={c.node} stroke="none" />
        </g>
      ) : null}

      {kind === "database" ? (
        /* Batch pipeline: source, distributed compute, sink. */
        <g fill="none" strokeWidth="1.5">
          <g stroke={c.line}>
            <ellipse cx="44" cy="62" rx="22" ry="7" />
            <path d="M22 62v34c0 3.9 9.8 7 22 7s22-3.1 22-7V62" />
          </g>
          <path d="M68 80h30" stroke={c.line} />
          <g stroke={c.line}>
            <rect x="98" y="58" width="20" height="20" rx="4" fill="#0F0F16" />
            <rect x="98" y="84" width="20" height="20" rx="4" fill="#0F0F16" />
            <rect x="124" y="58" width="20" height="20" rx="4" fill="#0F0F16" />
            <rect x="124" y="84" width="20" height="20" rx="4" fill="#0F0F16" />
          </g>
          <path d="M144 80h32" stroke={c.line} />
          <path
            d="M68 80h30M144 80h32"
            stroke={c.node}
            strokeDasharray="8 130"
            className="animate-stream"
          />
          <rect x="176" y="66" width="42" height="28" rx="6" fill="#0F0F16" stroke={c.line} />
        </g>
      ) : null}
    </svg>
  );
}
