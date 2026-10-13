import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-10-13"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
