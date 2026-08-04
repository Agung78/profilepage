"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, ONCE_IN_VIEW } from "@/lib/motion";
import { systemFlows, type CaseStudy } from "@/lib/content";

const TONES = {
  emerald: { line: "#3DDC97", soft: "#7BEFC0" },
  sky: { line: "#4EA8F5", soft: "#9BCDFF" },
} as const;

const BOX_H = 46;
const GAP = 30;
const BOX_X = 26;
const BOX_W = 188;
const CENTER = BOX_X + BOX_W / 2;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

const boxIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};

const drawIn = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
};

type Props = {
  kind: CaseStudy["icon"];
  tone: CaseStudy["tone"];
  /** Case-study title, used to build the diagram's accessible name. */
  label: string;
};

/**
 * Per-case-study system flow.
 *
 * Each stage restates a claim from the case-study prose, so the diagram is an
 * index of the text rather than decoration. Stage boxes fade up and connectors
 * draw themselves exactly once, when the card first enters the viewport.
 *
 * Under `prefers-reduced-motion` the identical diagram renders fully drawn — no
 * meaning lives in the animation.
 */
export function SystemDiagram({ kind, tone, label }: Props) {
  const reduceMotion = useReducedMotion();
  const flow = systemFlows[kind];
  const palette = TONES[tone];

  const height = flow.stages.length * BOX_H + (flow.stages.length - 1) * GAP;
  const description = `System flow for ${label}: ${flow.stages
    .map((stage) => stage.lines.join(" "))
    .join(" → ")}`;

  return (
    <motion.svg
      viewBox={`0 0 240 ${height}`}
      role="img"
      aria-label={description}
      className="h-auto w-full"
      variants={reduceMotion ? undefined : container}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={ONCE_IN_VIEW}
    >
      {flow.stages.map((stage, index) => {
        const y = index * (BOX_H + GAP);
        const isLast = index === flow.stages.length - 1;
        const stroke = stage.accent ? palette.line : "#22222C";

        return (
          <g key={index}>
            {/* Connector into the next stage, plus its arrow head. */}
            {!isLast ? (
              <motion.path
                d={`M${CENTER} ${y + BOX_H} V${y + BOX_H + GAP - 7} m-4 -5 l4 5 l4 -5`}
                fill="none"
                stroke={palette.line}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
                variants={reduceMotion ? undefined : drawIn}
              />
            ) : null}

            <motion.g variants={reduceMotion ? undefined : boxIn}>
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
            </motion.g>
          </g>
        );
      })}
    </motion.svg>
  );
}
