"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { registerScrollTriggers, EASE } from "@/lib/motion";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
import { systemFlows, type CaseStudy } from "@/lib/content";

registerScrollTriggers();

const TONES = {
  emerald: { line: "#3DDC97", soft: "#7BEFC0" },
  sky: { line: "#4EA8F5", soft: "#9BCDFF" },
} as const;

const BOX_H = 46;
const GAP = 30;
const BOX_X = 26;
const BOX_W = 188;
const CENTER = BOX_X + BOX_W / 2;

type Props = {
  kind: CaseStudy["icon"];
  tone: CaseStudy["tone"];
  /** Case-study title, used to build the diagram's accessible name. */
  label: string;
};

/**
 * Per-case-study system flow — one of the "original generated abstract
 * system stills" REDESIGN.md §2 calls for in place of unavailable case-study
 * photography: an authored data-graphic driven by the real `systemFlows`
 * entry for this case study, not a stock image or a fabricated screenshot.
 *
 * Each stage restates a claim from the case-study prose, so the diagram is an
 * index of the text rather than decoration. Stage boxes fade up and
 * connectors draw themselves once, when the card first enters the viewport —
 * an entrance, not a scrub or a pin, so it's an IntersectionObserver driving
 * paused GSAP tweens rather than a ScrollTrigger.
 *
 * Under `prefers-reduced-motion` the identical diagram renders fully drawn —
 * no meaning lives in the animation itself.
 */
export function SystemDiagram({ kind, tone, label }: Props) {
  const reduceMotion = useMotionPrefs();
  const svgRef = useRef<SVGSVGElement>(null);
  const flow = systemFlows[kind];
  const palette = TONES[tone];

  const height = flow.stages.length * BOX_H + (flow.stages.length - 1) * GAP;
  const description = `System flow for ${label}: ${flow.stages
    .map((stage) => stage.lines.join(" "))
    .join(" → ")}`;

  useGSAP(
    () => {
      if (reduceMotion || !svgRef.current) return;
      const boxes = svgRef.current.querySelectorAll("[data-box]");
      const connectors = svgRef.current.querySelectorAll<SVGPathElement>(
        "[data-connector]"
      );

      const tl = gsap.timeline({ paused: true });
      connectors.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      flow.stages.forEach((_, index) => {
        const connector = connectors[index - 1];
        if (connector) {
          tl.to(
            connector,
            { strokeDashoffset: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" },
            index * 0.11
          );
        }
        const box = boxes[index];
        if (box) {
          tl.fromTo(
            box,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.42, ease: EASE },
            index * 0.11 + 0.04
          );
        }
      });

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          tl.play();
          observer.disconnect();
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" }
      );
      observer.observe(svgRef.current);

      return () => {
        observer.disconnect();
        tl.kill();
      };
    },
    { dependencies: [reduceMotion, kind] }
  );

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 240 ${height}`}
      role="img"
      aria-label={description}
      className="h-auto w-full"
    >
      {flow.stages.map((stage, index) => {
        const y = index * (BOX_H + GAP);
        const isLast = index === flow.stages.length - 1;
        const stroke = stage.accent ? palette.line : "#22222C";

        return (
          <g key={index}>
            {/* Connector into the next stage, plus its arrow head. */}
            {!isLast ? (
              <path
                data-connector=""
                d={`M${CENTER} ${y + BOX_H} V${y + BOX_H + GAP - 7} m-4 -5 l4 5 l4 -5`}
                fill="none"
                stroke={palette.line}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={reduceMotion ? 0.75 : 0}
              />
            ) : null}

            <g data-box="" style={reduceMotion ? undefined : { opacity: 0 }}>
              <rect
                x={BOX_X}
                y={y}
                width={BOX_W}
                height={BOX_H}
                rx="7"
                fill="#0F0F16"
                stroke={stroke}
                strokeWidth="1.2"
                opacity={stage.accent ? 1 : 0.9}
              />
              {/* Accent stages carry a left signal rail, matching the cards. */}
              {stage.accent ? (
                <rect
                  x={BOX_X + 1}
                  y={y + 10}
                  width="2"
                  height={BOX_H - 20}
                  rx="1"
                  fill={palette.soft}
                />
              ) : null}
              {stage.lines.map((line, lineIndex) => (
                <text
                  key={lineIndex}
                  x={CENTER}
                  y={y + 20 + lineIndex * 14}
                  textAnchor="middle"
                  fontSize="11"
                  fill={stage.accent ? "#F5F3EE" : "#B5B5C0"}
                  className="font-mono"
                >
                  {line}
                </text>
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
