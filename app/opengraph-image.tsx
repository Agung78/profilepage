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
          background: "#17150F",
          color: "#EEE9DE",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {person.name}
        </div>
        <div style={{ fontSize: 38, marginTop: 28, color: "#E8603B" }}>
          {`${person.currentRole} · ${person.currentCompany}`}
        </div>
        <div style={{ fontSize: 30, marginTop: 12, color: "#B9B2A2" }}>
          {`${person.concurrentRole} · ${person.concurrentCompany}`}
        </div>
      </div>
    ),
    size
  );
}
