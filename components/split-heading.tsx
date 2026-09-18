"use client";

import { useEffect, useState } from "react";

type SplitHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Extra class applied to each per-word wrapper (for stagger targeting). */
  wordClassName?: string;
};

/**
 * Text-reveal heading that follows REDESIGN.md §4's accessibility contract:
 *
 * - Without JS, this renders as one plain text node — unsplit, fully visible,
 *   the exact same markup a crawler or a JS-disabled browser sees.
 * - Once mounted, it swaps to per-word spans so `<Hero>`'s GSAP timeline can
 *   stagger them. The unsplit string becomes the element's accessible name
 *   (`aria-label`); every visible word span is `aria-hidden="true"`, so
 *   screen readers still hear one clean sentence instead of word fragments.
 * - Only ever splits this component's own plain text — never markup, links,
 *   or `<strong>` children, because there are none passed to it.
 */
export function SplitHeading({
  text,
  as = "h1",
  className,
  wordClassName,
}: SplitHeadingProps) {
  const [split, setSplit] = useState(false);
  const Tag = as;

  useEffect(() => {
    setSplit(true);
  }, []);

  if (!split) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.15em] align-bottom"
        >
          <span
            data-split-word=""
            className={`inline-block will-change-transform ${wordClassName ?? ""}`}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
