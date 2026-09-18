"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";

const START = 78;
const END = 246;
const TRAVEL = END - START - 12;
/** Deterministic particle offsets — no randomness, no hydration drift. */
const PARTICLES = [0, -1.6, -3.2, -4.8, -6.4];

/**
 * "Weeks → hours" as a pipeline.
 *
 * The rails, the stage labels and both endpoints are plain SVG geometry and
 * text, so the whole story reads with every animation switched off. The
 * particles are the only moving part, and their progress is scrubbed to
 * scroll position — one of the three uses REDESIGN.md §4 reserves for
 * ScrollTrigger — rather than looping on a free-running timer, so the
 * "processing window shrinking" story is literally tied to how far the
 * visitor has scrolled through it.
 */
export function FlowPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useMotionPrefs();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const particles = ref.current.querySelectorAll("[data-particle]");
      if (!particles.length) return;

      const tl = gsap.timeline({
        repeat: 2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });

      tl.fromTo(
        particles,
        { x: 0, opacity: 0 },
        {
          x: TRAVEL,
          opacity: 1,
          duration: 1,
          ease: "none",
          stagger: { each: 0.15, from: "start" },
        }
      ).to(particles, { opacity: 0, duration: 0.15 }, "-=0.15");

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reduceMotion] }
  );

  return (
    <div ref={ref} className="mt-4">
      <svg
        viewBox="0 0 324 74"
        role="img"
        aria-label="Pipeline: a processing window measured in weeks under PL/SQL stored procedures becomes hours on Azure Databricks with PySpark."
        className="h-auto w-full max-w-[22rem]"
      >
        {/* Source endpoint */}
        <rect
          x="0.6"
          y="16"
          width="70"
          height="30"
          rx="6"
          fill="#0F0F16"
          stroke="#22222C"
        />
        <text
          x="35.6"
          y="35"
          textAnchor="middle"
          fontSize="12"
          fill="#B5B5C0"
          className="font-mono"
        >
          weeks
        </text>

        {/* Pipe rails */}
        <g stroke="#22222C" strokeWidth="1">
          <path d={`M${START} 22 H${END}`} />
          <path d={`M${START} 40 H${END}`} />
        </g>

        {/* Particles: scrubbed by scroll when motion is allowed, otherwise a
            static stand-in so the pipe never reads as empty. */}
        {reduceMotion ? (
          <g fill="#3DDC97" opacity="0.7">
            <circle cx={START + 40} cy="31" r="2.4" />
            <circle cx={START + 84} cy="31" r="2.4" />
            <circle cx={START + 128} cy="31" r="2.4" />
          </g>
        ) : (
          <g fill="#3DDC97">
            {PARTICLES.map((_, index) => (
              <circle
                key={index}
                data-particle=""
                cx={START}
                cy="31"
                r="2.4"
                opacity="0"
              />
            ))}
          </g>
        )}

        {/* Arrow into the sink */}
        <path
          d={`M${END} 31 l-6 -4 v8 z`}
          fill="#3DDC97"
          transform={`translate(6 0)`}
        />

        {/* Sink endpoint */}
        <rect
          x="253"
          y="16"
          width="70"
          height="30"
          rx="6"
          fill="#0F0F16"
          stroke="#3DDC97"
        />
        <text
          x="288"
          y="35"
          textAnchor="middle"
          fontSize="12"
          fill="#F5F3EE"
          className="font-mono"
        >
          hours
        </text>

        <text
          x="162"
          y="66"
          textAnchor="middle"
          fontSize="10.5"
          fill="#8B8B96"
          className="font-mono"
        >
          Databricks · PySpark
        </text>
      </svg>
    </div>
  );
}
