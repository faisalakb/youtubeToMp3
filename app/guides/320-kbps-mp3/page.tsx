import Link from "next/link";
import type { Metadata } from "next";
import ArticleGuide from "@/components/ArticleGuide";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/schema";

const TITLE = "320 kbps MP3: Is the Highest Bitrate Worth It? (Explained)";
const DESCRIPTION =
  "What MP3 bitrate actually means, when 320 kbps is worth it, and why a higher bitrate can't fix a low-quality source. A plain-English guide.";
const PATH = "/guides/320-kbps-mp3";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: site.url + PATH, type: "article" },
};

const faqs: Faq[] = [
  {
    question: "Is 320 kbps the best MP3 quality?",
    answer:
      "320 kbps is the highest standard MP3 bitrate, so it's the best quality the format offers. Whether it's worth the larger file depends on your source and how you listen — for most people on most gear, 256 kbps is already transparent.",
  },
  {
    question: "Will converting to 320 kbps improve a low-quality file?",
    answer:
      "No. Bitrate sets a ceiling, not a floor. Encoding a 128 kbps or low-quality source at 320 kbps just makes a bigger file containing the same flawed audio — it can't add detail that was never there.",
  },
  {
    question: "What bitrate should I use?",
    answer:
      "320 kbps when the source is lossless (like FLAC or WAV) and you want the best result. 192–256 kbps is a great balance of quality and size for everyday listening. 128 kbps only when small file size matters more than fidelity.",
  },
];

export default function Kbps320() {
  return (
    <ArticleGuide title={TITLE} description={DESCRIPTION} path={PATH} crumb="320 kbps explained" faqs={faqs}>
      <h1>320 kbps MP3: Is the Highest Bitrate Worth It?</h1>
      <p className="lede">
        Bitrate is the number people fixate on when converting audio — and it&apos;s genuinely
        important, but it&apos;s widely misunderstood. Here&apos;s what it does, what it doesn&apos;t,
        and how to pick.
      </p>

      <h2>What bitrate actually means</h2>
      <p>
        Bitrate is how much data the MP3 uses per second of audio, measured in kilobits per second
        (kbps). More data means more of the original sound is preserved — and a larger file. MP3
        tops out at <strong>320 kbps</strong>, the standard maximum. At the low end, 128 kbps is
        roughly a quarter of the size and noticeably rougher on detailed music.
      </p>

      <h2>The ceiling rule (the part everyone misses)</h2>
      <p>
        Bitrate sets the <em>ceiling</em> on quality, not the floor. If your source is already
        low-quality — a 128 kbps file, a muffled recording, a YouTube rip — re-encoding it at 320
        kbps does <strong>not</strong> restore the lost detail. You just get a bigger file holding the
        same flawed audio. Quality can only be preserved or reduced in a conversion, never invented.
      </p>
      <blockquote>
        Converting a low-quality source to 320 kbps won&apos;t add detail that wasn&apos;t there. The
        only time max bitrate clearly pays off is when you start from a lossless source.
      </blockquote>

      <h2>When 320 kbps is worth it</h2>
      <ul>
        <li>
          <strong>Your source is lossless</strong> (FLAC, WAV, ALAC). This is the case where 320 kbps
          earns its size — see <Link href="/convert/flac-to-mp3">FLAC to MP3</Link>.
        </li>
        <li>
          <strong>You listen on good headphones or a real stereo</strong>, where the difference can
          actually surface.
        </li>
        <li>
          <strong>Storage isn&apos;t tight.</strong> A 320 kbps file is roughly 2.5× the size of a
          128 kbps one.
        </li>
      </ul>

      <h2>When a lower bitrate is the smarter choice</h2>
      <ul>
        <li>
          <strong>192–256 kbps</strong> is transparent for most listeners on most gear — a great
          default that saves space.
        </li>
        <li>
          <strong>128 kbps</strong> makes sense for spoken-word audio, podcasts, or when you need the
          smallest possible file.
        </li>
        <li>
          <strong>Re-encoding a lossy source</strong> (M4A, AAC, OGG)? Stay at 256–320 to avoid
          stacking compression artifacts, but don&apos;t expect a miracle — see{" "}
          <Link href="/guides/lossless-vs-lossy">lossless vs lossy</Link>.
        </li>
      </ul>

      <p>
        mp3bat lets you pick any of these right on the converter, and it labels them honestly — no
        pretending a higher number fixes a weak source.
      </p>

      <Link href="/" className="cta-back">
        Convert and pick your bitrate →
      </Link>

      <h2>FAQ</h2>
      {faqs.map((q) => (
        <div key={q.question}>
          <p className="faq-q">{q.question}</p>
          <p>{q.answer}</p>
        </div>
      ))}
    </ArticleGuide>
  );
}
