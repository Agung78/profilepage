import { ImageResponse } from "next/og";
import { person } from "@/lib/content";
export const dynamic = "force-static";

export const alt = `${person.name} — ${person.currentRole}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "hsl(240, 20%, 4%)",
          color: "hsl(40, 20%, 95%)",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {person.name}
        </div>
        <div style={{ fontSize: 38, marginTop: 28, color: "hsl(156, 69%, 55%)" }}>
          {`${person.currentRole} · ${person.currentCompany}`}
        </div>
        <div style={{ fontSize: 30, marginTop: 12, color: "hsl(240, 6%, 70%)" }}>
          {`${person.concurrentRole} · ${person.concurrentCompany}`}
        </div>
      </div>
    ),
    size
  );
}
