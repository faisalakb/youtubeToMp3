/**
 * Central site metadata. One source of truth for URLs, names, and copy
 * that several pages and the schema builders depend on.
 */
export const site = {
  name: "mp3bat",
  tagline: "the converter that never sees your files",
  // Production domain (registered via Spaceship). Override per-environment with
  // NEXT_PUBLIC_SITE_URL if you ever deploy to a preview/staging host.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mp3bat.com",
  description:
    "Convert audio to MP3 entirely in your browser. Your file is never uploaded — nothing to store, leak, or sell. No ads, no sign-up.",
  twitter: "@mp3bat",
  // Affiliate links. mp3bat doesn't rip from URLs, so we honestly point people
  // who need that to a reputable paid desktop app and earn a referral.
  // Replace the fallback with your real Wondershare affiliate URL, or set
  // NEXT_PUBLIC_UNICONVERTER_AFFILIATE_URL at deploy time.
  affiliate: {
    uniconverter:
      process.env.NEXT_PUBLIC_UNICONVERTER_AFFILIATE_URL ||
      "https://videoconverter.wondershare.com/",
  },
} as const;

export type BitrateOption = {
  value: number;
  label: string;
};

export const BITRATES: BitrateOption[] = [
  { value: 320, label: "320 kbps — best" },
  { value: 256, label: "256 kbps — high" },
  { value: 192, label: "192 kbps — balanced" },
  { value: 128, label: "128 kbps — small file" },
];

export const DEFAULT_BITRATE = 192;
