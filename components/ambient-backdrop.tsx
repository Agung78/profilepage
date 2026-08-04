/**
 * Page-wide ambient texture: blueprint grid, two low-opacity aurora fields and
 * a grain overlay. Fixed and non-interactive, so it costs one composited layer
 * and never repaints on scroll.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-grain"
    >
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-blueprint mask-fade-edges opacity-70" />
      <div className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-mint/[0.07] blur-[140px]" />
      <div className="absolute bottom-[-14rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-signal/[0.06] blur-[140px]" />
    </div>
  );
}
