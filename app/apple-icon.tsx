import { ImageResponse } from "next/og";
import { person } from "@/lib/content";
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(240, 20%, 4%)",
          color: "hsl(156, 69%, 55%)",
          fontSize: 88,
          fontWeight: 700,
        }}
      >
        {person.name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      </div>
    ),
    size
  );
}
