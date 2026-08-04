"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { Monogram } from "@/components/monogram";
import { navItems, person } from "@/lib/content";
import { cn } from "@/lib/utils";

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

export function SiteNav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Active-section highlight. IntersectionObserver rather than a scroll
     listener so this stays off the main thread during scroll. */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes the mobile sheet, and body scroll is locked while it's open. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-ink-line/80 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-md"
          aria-label={`${person.name} — back to top`}
        >
          <Monogram size={30} />
          <span className="font-mono text-sm font-semibold tracking-tight text-paper">
            {person.shortName}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "text-paper"
                    : "text-subtle hover:text-paper"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px transition-opacity duration-300",
                    isActive ? "bg-mint opacity-100" : "opacity-0"
                  )}
                />
              </a>
            );
          })}
          <a
            href={person.resume}
            download
            className="ml-3 inline-flex items-center gap-2 rounded-md bg-mint px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-mint-soft"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Résumé
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink-line text-paper md:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile sheet. Previously there was no mobile navigation at all — the
          links and the résumé button were both `hidden md:flex`. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink-line/80 bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md px-2 py-3 text-base",
                  active === item.href.slice(1)
                    ? "text-mint"
                    : "text-muted"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pb-2 pt-3">
            <a
              href={person.resume}
              download
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-mint px-4 py-3 text-sm font-semibold text-ink"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
