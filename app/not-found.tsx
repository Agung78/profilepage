import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AmbientBackdrop } from "@/components/ambient-backdrop";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <AmbientBackdrop />
      <main
        id="main"
        className="mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-5 sm:px-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-mint">
          404
        </p>
        <h1 className="mt-4 text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-tight tracking-[-0.03em] text-paper">
          This route doesn&rsquo;t resolve.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          The page you were after isn&rsquo;t here. Everything lives on a single
          page — head back to the top.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-mint px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mint-soft"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to the portfolio
        </Link>
      </main>
    </>
  );
}
