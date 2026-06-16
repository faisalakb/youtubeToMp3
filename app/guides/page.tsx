import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { GUIDES, GUIDE_GROUPS } from "@/lib/guides";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Guides — converting audio to MP3, safely and well",
  description:
    "Honest guides on getting audio from YouTube legally, judging converter safety, choosing a bitrate, and converting to MP3 on any device.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  return (
    <main className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url + "/" },
              { name: "Guides", url: site.url + "/guides" },
            ])
          ),
        }}
      />

      <Brand note="guides" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / Guides
      </nav>

      <p className="eyebrow">Plain English</p>
      <h1>
        Guides to doing this <span className="em">safely and well.</span>
      </h1>
      <p className="sub">
        The honest version of the questions people actually ask — what&apos;s legal, what&apos;s
        safe, what quality to pick, and how to convert on your device.
      </p>

      {GUIDE_GROUPS.map((group) => (
        <section key={group} style={{ marginTop: 36 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 14 }}>{group}</h2>
          <div className="trust-strip" style={{ marginTop: 0 }}>
            {GUIDES.filter((g) => g.group === group).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="tcard"
                style={{ textDecoration: "none", display: "block" }}
              >
                <h3 style={{ color: "var(--trust)" }}>{g.title}</h3>
                <p>{g.blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="note">
        Looking for the tool itself? <Link href="/">Open the converter</Link> or browse{" "}
        <Link href="/convert">format-specific converters</Link>.
      </div>

      <Footer />
    </main>
  );
}
