import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { FORMATS } from "@/lib/formats";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Audio format converters — every conversion runs in your browser",
  description:
    "Convert WAV, M4A, AAC, OGG, and FLAC to MP3 entirely on your device. Free, private, no upload, no sign-up.",
  alternates: { canonical: "/convert" },
};

export default function ConvertIndex() {
  return (
    <main className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url + "/" },
              { name: "Convert", url: site.url + "/convert" },
            ])
          ),
        }}
      />

      <Brand note="convert" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / Convert
      </nav>

      <p className="eyebrow">Private by design</p>
      <h1>
        Audio converters that <span className="em">never upload your file.</span>
      </h1>
      <p className="sub">
        Pick your source format. Every converter below runs entirely in your browser — the file
        stays on your device, start to finish.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "32px 0 14px" }}>
        Audio → MP3
      </h2>
      <div className="trust-strip" style={{ marginTop: 0 }}>
        {FORMATS.filter((f) => f.kind === "audio").map((f) => (
          <Link
            key={f.slug}
            href={`/convert/${f.slug}`}
            className="tcard"
            style={{ textDecoration: "none", display: "block" }}
          >
            <h3 style={{ color: "var(--trust)" }}>{f.ext} → MP3</h3>
            <p>{f.why}</p>
          </Link>
        ))}
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "32px 0 14px" }}>
        Video → MP3 (extract audio)
      </h2>
      <div className="trust-strip" style={{ marginTop: 0 }}>
        {FORMATS.filter((f) => f.kind === "video").map((f) => (
          <Link
            key={f.slug}
            href={`/convert/${f.slug}`}
            className="tcard"
            style={{ textDecoration: "none", display: "block" }}
          >
            <h3 style={{ color: "var(--trust)" }}>{f.ext} → MP3</h3>
            <p>{f.why}</p>
          </Link>
        ))}
      </div>

      <div className="note">
        <b>How video works.</b> mp3bat extracts the audio track from MP4, MOV, MKV, and WEBM right in
        your browser using a built-in WebAssembly engine — the file is never uploaded. The first
        video conversion downloads the engine once (~32 MB), then it&apos;s cached. Read{" "}
        <Link href="/how-it-works">how it works</Link>.
      </div>

      <Footer />
    </main>
  );
}
