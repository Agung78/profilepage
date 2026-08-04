"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Hero systems-map backdrop.
 *
 * A faint grid, a fixed node graph, and four signal paths that carry a single
 * travelling dash each. Every coordinate is a literal — nothing is randomised,
 * so the server and client markup match exactly and hydration stays quiet.
 *
 * Motion is CSS-only (transform / stroke-dashoffset / opacity) and the whole
 * group is paused via `animation-play-state` the moment the hero leaves the
 * viewport, so scrolling the page costs nothing here.
 */

type Node = {
  x: number;
  y: number;
  /** Hubs read as services, the rest as satellites. */
  hub?: boolean;
  /** Drift vector in user units, and the cycle it drifts on. */
  dx: number;
  dy: number;
  dur: number;
  delay: number;
};

const NODES: readonly Node[] = [
  { x: 120, y: 140, dx: 6, dy: -5, dur: 17, delay: 0 },
  { x: 250, y: 300, hub: true, dx: -7, dy: 6, dur: 21, delay: -3 },
  { x: 190, y: 520, dx: 5, dy: 7, dur: 19, delay: -7 },
  { x: 400, y: 180, dx: -6, dy: -4, dur: 23, delay: -11 },
  { x: 430, y: 430, dx: 7, dy: -6, dur: 18, delay: -5 },
  { x: 360, y: 650, dx: -5, dy: 5, dur: 22, delay: -9 },
  { x: 600, y: 300, hub: true, dx: 4, dy: 7, dur: 25, delay: -2 },
  { x: 610, y: 560, hub: true, dx: -6, dy: -5, dur: 20, delay: -14 },
  { x: 780, y: 170, dx: 6, dy: 4, dur: 19, delay: -6 },
  { x: 820, y: 420, hub: true, dx: -7, dy: 5, dur: 24, delay: -10 },
  { x: 760, y: 660, dx: 5, dy: -6, dur: 21, delay: -16 },
  { x: 980, y: 280, dx: -4, dy: -7, dur: 18, delay: -4 },
  { x: 1010, y: 550, dx: 6, dy: 6, dur: 23, delay: -12 },
  { x: 1120, y: 400, dx: -5, dy: -4, dur: 20, delay: -8 },
];

/** Undirected edges, as index pairs into NODES. */
const EDGES: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 6],
  [2, 4],
  [2, 5],
  [3, 6],
  [4, 6],
  [5, 7],
  [6, 7],
  [6, 8],
  [6, 9],
  [7, 9],
  [7, 10],
  [8, 9],
  [8, 11],
  [9, 11],
  [9, 12],
  [10, 12],
  [11, 13],
  [12, 13],
];

/** Routes a signal pulse walks. Long gaps between them keep pulses occasional. */
const SIGNALS: readonly { path: readonly number[]; dur: number; delay: number }[] =
  [
    { path: [0, 1, 6, 8, 11, 13], dur: 14, delay: 0 },
    { path: [2, 4, 6, 9, 12], dur: 17, delay: -6 },
    { path: [5, 7, 9, 11], dur: 15, delay: -11 },
    { path: [3, 6, 7, 10], dur: 19, delay: -3 },
  ];

const toPath = (indices: readonly number[]) =>
  indices
    .map((i, step) => `${step === 0 ? "M" : "L"}${NODES[i].x} ${NODES[i].y}`)
    .join(" ");

export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  /* Generous margin: the hero is tall, and we only want to pause once it is
     genuinely gone rather than flicker at the boundary. */
  const inView = useInView(ref, { margin: "10% 0px 10% 0px" });
  const animate = !reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-motion={animate && inView ? "running" : "paused"}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="mask-fade-map absolute inset-0 h-full w-full opacity-[0.85]"
      >
        <defs>
          {/* Fine local grid — denser than the page-wide blueprint so the hero
              reads as a drawing surface rather than a repeat of the backdrop. */}
          <pattern
            id="hero-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0V48"
              fill="none"
              stroke="#22222C"
              strokeWidth="1"
              opacity="0.5"
            />
          </pattern>
        </defs>

        <rect width="1200" height="760" fill="url(#hero-grid)" />

        {/* Connection paths. Thin, low-contrast, never animated. */}
        <g stroke="#22222C" strokeWidth="1.1" fill="none">
          {EDGES.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
            />
          ))}
        </g>

        {/* Signal pulses: one short dash per route, with a long empty gap. */}
        <g fill="none" strokeLinecap="round">
          {SIGNALS.map((signal, index) => (
            <path
              key={index}
              d={toPath(signal.path)}
              stroke={index % 2 === 0 ? "#3DDC97" : "#4EA8F5"}
              strokeWidth="1.5"
              opacity={animate ? 0.55 : 0}
              className={animate ? "hero-signal" : undefined}
              style={
                animate
                  ? {
                      animationDuration: `${signal.dur}s`,
                      animationDelay: `${signal.delay}s`,
                    }
                  : undefined
              }
            />
          ))}
        </g>

        {/* Drifting data nodes. */}
        <g>
          {NODES.map((node, index) => (
            <g
              key={index}
              className={animate ? "hero-node" : undefined}
              style={
                animate
                  ? {
                      // @ts-expect-error -- CSS custom properties on SVG style.
                      "--dx": `${node.dx}px`,
                      "--dy": `${node.dy}px`,
                      animationDuration: `${node.dur}s`,
                      animationDelay: `${node.delay}s`,
                    }
                  : undefined
              }
            >
              {node.hub ? (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="9"
                  fill="none"
                  stroke="#3DDC97"
                  strokeWidth="1"
                  opacity="0.28"
                />
              ) : null}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.hub ? 3.2 : 2.1}
                fill={node.hub ? "#3DDC97" : "#4EA8F5"}
                opacity={node.hub ? 0.75 : 0.5}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
