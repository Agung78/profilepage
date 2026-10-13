"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { navItems, person } from "@/lib/content";

export function SiteNav() {
  const [open, setOpen] = useState(false);

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
          type="button"
          className="-mr-2 p-2 text-ink sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <Icon
            icon={open ? "solar:close-square-linear" : "solar:hamburger-menu-linear"}
            className="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-paper px-5 pb-4 sm:hidden">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-line/60 last:border-0">
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
      )}
    </header>
  );
}
