"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";
import { person } from "@/lib/content";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
    } catch {
      /* Clipboard blocked (insecure context or denied permission) — the
         mailto link beside this button remains the working path. */
    }
  };

  return (
    <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div>
        <p className="font-mono text-xs text-[#B9B2A2]">
          Email
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
                    <a
            href={`mailto:${person.email}`}
            className="inline-block break-all py-2 font-display text-xl text-paper underline decoration-flare-bright decoration-2 transition-colors hover:text-flare-bright sm:break-normal sm:text-4xl"
          >
            {person.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-11 items-center gap-1.5 border border-paper/60 px-3.5 py-1.5 font-mono text-xs text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            {copied ? (
              <>
                <Icon
                  icon="solar:check-circle-linear"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Copied
              </>
            ) : (
              <>
                <Icon icon="solar:copy-linear" className="h-3.5 w-3.5" aria-hidden="true" />
                Copy
              </>
            )}
          </button>
          {/* Announce the copy result to screen readers. */}
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>
      </div>

      <ul className="flex flex-wrap gap-3">
        <li>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-paper/60 min-h-11 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <Icon icon="solar:case-round-linear" className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-paper/60 min-h-11 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <Icon icon="solar:code-square-linear" className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </li>
        <li>
          <a
            href={person.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-paper min-h-11 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-flare-bright"
          >
            <Icon icon="solar:download-linear" className="h-4 w-4" aria-hidden="true" />
            Résumé (PDF)
          </a>
        </li>
      </ul>
    </div>
  );
}

export function SocialRow() {
  return (
    <ul className="flex items-center gap-2">
      {[
        {
          href: person.linkedin,
          label: "LinkedIn",
          icon: "solar:case-round-linear",
          external: true,
        },
        {
          href: person.github,
          label: "GitHub",
          icon: "solar:code-square-linear",
          external: true,
        },
        {
          href: `mailto:${person.email}`,
          label: "Email",
          icon: "solar:letter-linear",
          external: false,
        },
      ].map(({ href, label, icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex h-11 w-11 items-center justify-center border border-paper/60 text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            {/* Icon-only links previously had no accessible name at all. */}
            <span className="sr-only">{label}</span>
            <Icon icon={icon} className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
