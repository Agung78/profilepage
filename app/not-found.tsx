import Link from "next/link";
import { Icon } from "@/lib/icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <main
        id="main"
        className="mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-5 sm:px-8"
      >
        <p className="font-mono text-xs text-flare">
          404
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] leading-tight text-ink">
          This route doesn&rsquo;t resolve.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          The page you were after isn&rsquo;t here. Everything lives on a single
          page — head back to the top.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-fit items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-flare"
        >
          <Icon icon="solar:arrow-left-linear" className="h-4 w-4" aria-hidden="true" />
          Back to the main page
        </Link>
      </main>
    </>
  );
}
