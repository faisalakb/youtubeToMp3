import Link from "next/link";
import type { Metadata } from "next";
import ArticleGuide from "@/components/ArticleGuide";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/schema";

const TITLE = "Lossless vs Lossy Audio: What's the Difference?";
const DESCRIPTION =
  "Lossless (FLAC, WAV) vs lossy (MP3, AAC, OGG) audio explained simply — what each is for, when the difference matters, and how it affects converting to MP3.";
const PATH = "/guides/lossless-vs-lossy";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: site.url + PATH, type: "article" },
};

const faqs: Faq[] = [
  {
    question: "Is MP3 lossless or lossy?",
    answer:
      "MP3 is lossy — it permanently discards audio data to shrink the file. That data can't be recovered, which is why you can't turn an MP3 back into a true lossless file.",
  },
  {
    question: "Can you convert lossy back to lossless?",
    answer:
      "Not meaningfully. You can save an MP3 into a FLAC or WAV container, but the discarded detail is gone for good — the result is a larger file with no extra quality. Lossless quality only comes from a lossless source.",
  },
  {
    question: "Should I convert FLAC to MP3?",
    answer:
      "For everyday listening on phones and players, yes — MP3 at 320 kbps is far smaller and sounds excellent. Keep the FLAC as your archive so you can re-encode later if you want.",
  },
];

export default function LosslessVsLossy() {
  return (
    <ArticleGuide title={TITLE} description={DESCRIPTION} path={PATH} crumb="Lossless vs lossy" faqs={faqs}>
      <h1>Lossless vs Lossy Audio: What&apos;s the Difference?</h1>
      <p className="lede">
        Two words decide most of what you need to know about audio quality and file size. Get them
        straight and bitrate choices, format choices, and conversions all start making sense.
      </p>

      <h2>Lossless: keep everything</h2>
      <p>
        Lossless formats store the audio without throwing any of it away. Decode a{" "}
        <strong>FLAC</strong> or <strong>WAV</strong> file and you get back exactly what went in,
        bit for bit. The upside is perfect fidelity and a clean master for archiving or editing. The
        downside is size — lossless files are large, sometimes 5–10× an equivalent MP3.
      </p>

      <h2>Lossy: throw away what you probably won&apos;t hear</h2>
      <p>
        Lossy formats — <strong>MP3</strong>, <strong>AAC</strong>, <strong>OGG Vorbis</strong> — use
        psychoacoustic models to discard sound that&apos;s hard to perceive, shrinking the file
        dramatically. At higher bitrates the loss is inaudible to most people, which is why lossy
        audio runs the world&apos;s phones and streaming. But the discarded data is gone permanently.
      </p>

      <h2>The one-way street</h2>
      <p>
        This is the rule that trips people up: you cannot turn lossy back into lossless. Wrapping an
        MP3 in a FLAC container produces a bigger file, not a better one — the detail was already
        thrown out. Real lossless quality only ever comes from a lossless source. (This is the same
        reason a higher bitrate can&apos;t rescue a weak file — see{" "}
        <Link href="/guides/320-kbps-mp3">320 kbps explained</Link>.)
      </p>

      <h2>What it means for converting to MP3</h2>
      <ul>
        <li>
          <strong>Lossless → MP3</strong> (e.g. <Link href="/convert/flac-to-mp3">FLAC</Link> or{" "}
          <Link href="/convert/wav-to-mp3">WAV</Link>): a clean single encode from a perfect source.
          Use 320 kbps for the best result.
        </li>
        <li>
          <strong>Lossy → MP3</strong> (e.g. <Link href="/convert/m4a-to-mp3">M4A</Link>,{" "}
          <Link href="/convert/aac-to-mp3">AAC</Link>, <Link href="/convert/ogg-to-mp3">OGG</Link>):
          a lossy-to-lossy step. Stay at 256–320 kbps so you don&apos;t pile new artifacts on top of
          old ones.
        </li>
      </ul>

      <h2>So which should you keep?</h2>
      <p>
        If you have a lossless master, keep it for archiving and convert copies to MP3 for everyday
        use. If all you have is a lossy file, just convert at a high bitrate and don&apos;t expect
        more than the source contains. Either way, mp3bat does the encode on your device — your files
        never leave your browser.
      </p>

      <Link href="/" className="cta-back">
        Convert your audio →
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
