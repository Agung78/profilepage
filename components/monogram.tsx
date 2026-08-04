type MonogramProps = {
  size?: number;
  className?: string;
};

/**
 * Pure-SVG monogram used in place of a photograph: an "A" cut from a
 * concentric node ring, echoing the systems-map motif used across the page.
 */
export function Monogram({ size = 40, className }: MonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="mono-stroke" x1="8" y1="4" x2="40" y2="44">
          <stop stopColor="#3DDC97" />
          <stop offset="1" stopColor="#4EA8F5" />
        </linearGradient>
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width="46.5"
        height="46.5"
        rx="11.5"
        stroke="#22222C"
      />
      <circle cx="24" cy="24" r="17" stroke="#22222C" strokeDasharray="2 4" />
      <path
        d="M14.5 33.5 24 14l9.5 19.5"
        stroke="url(#mono-stroke)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18.75 27h10.5" stroke="url(#mono-stroke)" strokeWidth="2.25" strokeLinecap="round" />
      <circle cx="24" cy="14" r="2.25" fill="#3DDC97" />
      <circle cx="14.5" cy="33.5" r="1.75" fill="#4EA8F5" />
      <circle cx="33.5" cy="33.5" r="1.75" fill="#4EA8F5" />
    </svg>
  );
}
