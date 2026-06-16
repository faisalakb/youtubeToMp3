import type { Metadata } from "next";
import { site } from "@/lib/site";
import { organizationSchema } from "@/lib/schema";
// Fonts are self-hosted from /public/fonts (see app/fonts.css) — no build-time
// or runtime calls to a third-party CDN, which keeps the "nothing leaves your
// device" promise honest and makes the build reproducible offline.
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "convert audio to mp3",
    "mp3 converter",
    "private mp3 converter",
    "client-side mp3 converter",
    "wav to mp3",
    "m4a to mp3",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  // Site verification. Google's token comes from GSC's "HTML tag" method via the
  // GOOGLE_SITE_VERIFICATION env (omitted when unset). The Ahrefs token is a
  // public verification string, safe to hardcode so the check stays reliable.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "ahrefs-site-verification":
        "0b88e19baa5f6826fc417284b936f5cb9591ffdd7aa57348f68e71cdf3ea956f",
    },
  },
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Cookieless, privacy-first analytics — no cookies, no consent banner,
            no personal data. Loads only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set,
            so it stays consistent with the "nothing leaves your device" promise. */}
        {plausibleDomain && (
          <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
        )}
        {/* Ahrefs Web Analytics — cookieless, no consent banner needed. */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="lQURL+FjIA+ZvC522iBEzA" async />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}
