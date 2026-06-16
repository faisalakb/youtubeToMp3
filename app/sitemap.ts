import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { FORMATS } from "@/lib/formats";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/convert", priority: 0.9, freq: "weekly" },
    { path: "/guides", priority: 0.8, freq: "weekly" },
    { path: "/pricing", priority: 0.7, freq: "monthly" },
    { path: "/is-youtube-to-mp3-legal", priority: 0.8, freq: "monthly" },
    { path: "/how-it-works", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.4, freq: "monthly" },
  ];

  const formatPages = FORMATS.map((f) => ({
    path: `/convert/${f.slug}`,
    priority: 0.8,
    freq: "monthly" as const,
  }));

  const guidePages = GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    priority: 0.6,
    freq: "monthly" as const,
  }));

  return [...core, ...formatPages, ...guidePages].map((e) => ({
    url: `${site.url}${e.path}`,
    lastModified: now,
    changeFrequency: e.freq,
    priority: e.priority,
  }));
}
