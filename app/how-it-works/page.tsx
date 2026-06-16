import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How it works — conversion that happens in your browser",
  description:
    "A plain explanation of how mp3bat converts audio to MP3 entirely on your device, with no upload and no server-side processing.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <main className="wrap">
      <Brand note="how it works" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / How it works
      </nav>

      <article className="prose">
        <h1>How it works</h1>
        <p className="lede">
          Most online converters upload your file to a server, convert it there, and send it back.
          mp3bat doesn&apos;t. Everything happens in the tab you already have open.
        </p>

        <h2>The three steps, on your device</h2>
        <ol>
          <li>
            <strong>Read.</strong> When you drop a file, the browser reads it straight into memory on
            your machine. Nothing is sent anywhere.
          </li>
          <li>
            <strong>Decode.</strong> The browser&apos;s built-in Web Audio engine decodes the audio
            into raw samples — the same engine that plays audio on the web.
          </li>
          <li>
            <strong>Encode.</strong> A WebAssembly MP3 encoder, downloaded once and run locally,
            turns those samples into an MP3 at the bitrate you chose. The result is handed to you as a
            download from your own browser&apos;s memory.
          </li>
        </ol>

        <h2>Why this matters</h2>
        <p>
          Because the file never travels to a server, there is nothing for us to store, leak, or sell
          — and nothing to wait on a queue for. It also means the tool can&apos;t pull audio from
          YouTube or other sites for you: that would require server-side fetching, which is exactly
          the part with legal and security baggage. We convert the file <em>you</em> already have.
        </p>

        <h2>Video files work too</h2>
        <p>
          For container video — MP4, MOV, MKV, WEBM — mp3bat extracts the audio track using{" "}
          <strong>ffmpeg compiled to WebAssembly</strong>, which also runs entirely in your browser.
          The first time you convert a video it downloads that engine once (about 32&nbsp;MB), then
          it&apos;s cached. Your video is never uploaded, exactly like audio.
        </p>

        <h2>The honest limits</h2>
        <p>
          Conversion speed depends on your own device, and very large files use your device&apos;s
          memory — big videos take longer and use more RAM, since the work happens locally rather
          than on a server farm. A higher bitrate also can&apos;t restore detail that was never in
          the source.
        </p>

        <Link href="/" className="cta-back">
          Try it →
        </Link>
      </article>

      <Footer />
    </main>
  );
}
