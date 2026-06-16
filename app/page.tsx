import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import Converter from "@/components/Converter";
import HowToReveal from "@/components/HowToReveal";
import SafeYoutube from "@/components/SafeYoutube";
import { site } from "@/lib/site";
import { webApplicationSchema, faqPageSchema, type Faq } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${site.name} — convert audio to MP3 without uploading a thing`,
  description: site.description,
  alternates: { canonical: "/" },
};

const faqs: Faq[] = [
  {
    question: "Does mp3bat upload my files?",
    answer:
      "No. Conversion runs entirely in your browser using the Web Audio API and a WebAssembly MP3 encoder. The file's bytes never reach a network, so there is nothing for us to store, leak, or sell.",
  },
  {
    question: "What formats can I convert to MP3?",
    answer:
      "Standard audio your browser can decode — WAV, M4A, AAC, OGG, FLAC, and MP3 — plus common video containers: MP4, MOV, MKV, and WEBM. For video, mp3bat extracts the audio track to MP3, all in your browser.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. There is nothing to sign up for. Open the tab, drop a file, get your MP3, and close the tab.",
  },
  {
    question: "Will a higher bitrate improve a low-quality file?",
    answer:
      "No. Bitrate sets the output ceiling. Converting a low-quality source to 320 kbps will not add detail that was never in the original.",
  },
];

export default function HomePage() {
  return (
    <main className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />

      <Brand />

      <p className="eyebrow">Private by design</p>
      <h1>
        Convert audio to MP3 <span className="em">without uploading a thing.</span>
      </h1>
      <p className="sub">
        Everything runs inside your browser. Your file is never sent to a server, so there&apos;s
        nothing for us to store, leak, or sell. No ads on your download. No sign-up.
      </p>

      <div id="convert">
        <Converter />
      </div>

      <HowToReveal />

      <SafeYoutube />

      <div className="note">
        <b>Honest about what this does.</b> This converts files you already have on your device.
        Bitrate sets the output ceiling — converting a low-quality source to 320 kbps won&apos;t add
        detail that wasn&apos;t there.
      </div>

      <div className="trust-strip">
        <div className="tcard">
          <svg className="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          </svg>
          <h3>No upload, ever</h3>
          <p>Conversion happens in your browser with Web Audio. The file&apos;s bytes never reach a network.</p>
        </div>
        <div className="tcard">
          <svg className="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <circle cx="12" cy="12" r="9" />
            <path d="m15 9-6 6m0-6 6 6" />
          </svg>
          <h3>No ads on the button</h3>
          <p>The download is the download. No fake buttons, no pop-ups, no redirect maze.</p>
        </div>
        <div className="tcard">
          <svg className="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h13v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
            <path d="M6 1v3M10 1v3M14 1v3" />
          </svg>
          <h3>No account</h3>
          <p>Nothing to sign up for. Open the tab, drop a file, get your MP3, close the tab.</p>
        </div>
      </div>

      <div className="note">
        <b>Converting a specific format?</b> Audio:{" "}
        <Link href="/convert/wav-to-mp3">WAV</Link>, <Link href="/convert/m4a-to-mp3">M4A</Link>,{" "}
        <Link href="/convert/flac-to-mp3">FLAC</Link>, <Link href="/convert/aac-to-mp3">AAC</Link>,{" "}
        <Link href="/convert/ogg-to-mp3">OGG</Link>. Video (extract audio):{" "}
        <Link href="/convert/mp4-to-mp3">MP4</Link>, <Link href="/convert/mov-to-mp3">MOV</Link>,{" "}
        <Link href="/convert/mkv-to-mp3">MKV</Link>, <Link href="/convert/webm-to-mp3">WEBM</Link>. Or
        read the <Link href="/guides">guides</Link>.
      </div>

      <Footer />
    </main>
  );
}
