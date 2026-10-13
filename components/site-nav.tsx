"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";
import { navItems, person } from "@/lib/content";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-[2px]">
      <nav
        aria-label={`${person.shortName} primary`}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="font-display text-lg text-ink">
          {person.shortName}
        </a>

        <ul className="hidden items-center gap-8 text-sm sm:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-ink-soft transition-colors hover:text-flare">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={button}
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center text-ink sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <Icon
            icon="solar:hamburger-menu-linear"
            className={`absolute h-6 w-6 transition-[opacity,transform] duration-300 ease-out-quart ${open ? "rotate-90 opacity-0" : "opacity-100"}`}
            aria-hidden="true"
          />
          <Icon
            icon="solar:close-square-linear"
            className={`absolute h-6 w-6 transition-[opacity,transform] duration-300 ease-out-quart ${open ? "opacity-100" : "-rotate-90 opacity-0"}`}
            aria-hidden="true"
          />
        </button>
      </nav>

      {/* Always mounted: 0fr -> 1fr height + opacity. `visibility` flips at the
          end of the transition so closed links leave the tab order / a11y tree. */}
      <div
        className={`grid bg-paper transition-[grid-template-rows,opacity,visibility] ease-out-quart sm:hidden ${
          open
            ? "visible grid-rows-[1fr] border-t border-line opacity-100 duration-300"
            : "invisible grid-rows-[0fr] border-t border-transparent opacity-0 duration-200"
        }`}
      >
        <ul id="mobile-menu" className="min-h-0 overflow-hidden px-5">
          {navItems.map((item, i) => (
            <li
              key={item.href}
              className={`border-b border-line/60 transition-[opacity,transform] ease-out-quart last:border-0 ${
                open ? "translate-y-0 opacity-100 duration-300" : "translate-y-2 opacity-0 duration-150"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 font-display text-xl text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
