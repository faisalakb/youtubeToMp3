/**
 * Registry of all guide pages, used by the /guides index and the sitemap so
 * there is a single source of truth for what exists. Device how-tos are pulled
 * from lib/devices.ts to avoid duplication.
 */
import { DEVICES } from "./devices";

export type GuideGroup = "Trust & safety" | "Audio quality" | "Compare" | "Device how-tos";

export type GuideLink = {
  slug: string; // path under /guides
  title: string;
  blurb: string;
  group: GuideGroup;
};

const bespoke: GuideLink[] = [
  {
    slug: "how-to-convert-youtube-to-mp3-legally",
    title: "How to convert YouTube to MP3 legally",
    blurb: "The legal sources, then the exact steps to get a clean MP3 from a file you're entitled to.",
    group: "Trust & safety",
  },
  {
    slug: "is-youtube-to-mp3-safe",
    title: "Is YouTube to MP3 safe?",
    blurb: "The risk isn't the MP3 — it's the ripper sites. How to spot the dangerous ones.",
    group: "Trust & safety",
  },
  {
    slug: "youtube-to-mp3-safe-reddit",
    title: "Safe YouTube to MP3, according to Reddit",
    blurb: "The community consensus — what gets recommended, what gets flagged, and why.",
    group: "Trust & safety",
  },
  {
    slug: "safe-youtube-audio",
    title: "Safe ways to get audio from YouTube",
    blurb: "The legitimate routes — without ripper sites, malware, or copyright trouble.",
    group: "Trust & safety",
  },
  {
    slug: "safest-converter",
    title: "Safest MP3 converter: what to actually check",
    blurb: "A practical checklist for judging whether a converter is genuinely safe.",
    group: "Trust & safety",
  },
  {
    slug: "320-kbps-mp3",
    title: "320 kbps MP3: is the highest bitrate worth it?",
    blurb: "What bitrate means, when 320 is worth it, and why it can't fix a weak source.",
    group: "Audio quality",
  },
  {
    slug: "lossless-vs-lossy",
    title: "Lossless vs lossy audio explained",
    blurb: "FLAC/WAV vs MP3/AAC/OGG — what each is for and when the difference matters.",
    group: "Audio quality",
  },
  {
    slug: "best-safe-mp3-converter",
    title: "Best & safe MP3 converters compared",
    blurb: "Browser, desktop, and upload converters — the honest trade-offs of each.",
    group: "Compare",
  },
];

const deviceGuides: GuideLink[] = DEVICES.map((d) => ({
  slug: d.slug,
  title: `Convert audio to MP3 on ${d.os}`,
  blurb: d.description,
  group: "Device how-tos",
}));

export const GUIDES: GuideLink[] = [...bespoke, ...deviceGuides];

export const GUIDE_GROUPS: GuideGroup[] = [
  "Trust & safety",
  "Audio quality",
  "Device how-tos",
  "Compare",
];
