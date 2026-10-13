import { ImageResponse } from "next/og";
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Same mark as app/icon.svg (full-bleed; iOS applies its own corner mask). */
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#17150F" />
        <path d="M17 49 32 14l15 35" fill="none" stroke="#EEE9DE" strokeWidth="7" strokeLinejoin="miter" />
        <path d="M24.5 38h15" fill="none" stroke="#E8603B" strokeWidth="6" />
      </svg>
    ),
    size
  );
}
