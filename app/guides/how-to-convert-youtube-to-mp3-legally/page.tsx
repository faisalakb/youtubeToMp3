import Link from "next/link";
import type { Metadata } from "next";
import ArticleGuide from "@/components/ArticleGuide";
import SafeYoutube from "@/components/SafeYoutube";
import { site } from "@/lib/site";
import { howToSchema, type Faq, type HowToStep } from "@/lib/schema";

const TITLE = "How to Convert YouTube to MP3 Legally (2026)";
const DESCRIPTION =
  "A step-by-step guide to getting an MP3 from YouTube the legal way — using audio you're entitled to and a private, no-upload converter.";
const PATH = "/guides/how-to-convert-youtube-to-mp3-legally";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: site.url + PATH, type: "article" },
};

const steps: HowToStep[] = [
  {
    name: "Pick audio you're allowed to convert",
    text: "Use your own uploads, Creative Commons or public-domain clips, content the creator offers for download, or audio you've bought. That's what keeps the whole thing legal.",
  },
  {
    name: "Save the file to your device",
    text: "Download your own video from YouTube Studio, or grab the file from the creator's site, Bandcamp, or SoundCloud, so it lives on your computer or phone.",
  },
  {
    name: "Convert it to MP3 with mp3bat",
    text: "Open mp3bat, drop the file in, choose a bitrate (320 kbps for best quality, 192 kbps for a smaller file), and click Convert. Everything runs in your browser — the file is never uploaded.",
  },
  {
    name: "Download and keep your MP3",
    text: "Save the finished MP3. Because the conversion happened on your device, nothing was sent to a server and there's nothing to leak or delete.",
  },
];

const faqs: Faq[] = [
  {
    question: "Can I legally convert any YouTube video to MP3?",
    answer:
      "No. You can legally convert audio you have the right to: your own uploads, Creative Commons or public-domain content, audio you've purchased, or anything the rights holder lets you download. Converting a commercial song you don't own is copyright infringement, even for personal use.",
  },
  {
    question: "What's the easiest legal way to get an MP3 from YouTube?",
    answer:
      "If it's your own video, download it from YouTube Studio and convert that file with mp3bat. If it's someone else's music, the cleanest route is to buy or stream it — that's licensed audio at better quality than a rip.",
  },
  {
    question: "Are YouTube to MP3 converters legal?",
    answer:
      "The converter itself is just a tool — a file converter is legal. What matters is what you feed it. mp3bat only converts files already on your device, so the legality comes down to whether you're entitled to that audio.",
  },
  {
    question: "Is it legal if it's only for personal use?",
    answer:
      "Not automatically. A few countries have narrow private-copying exceptions, but many (including the US) don't offer a blanket personal-use shield for copying protected works. Personal use lowers the chance anyone pursues you; it doesn't make copying a protected track permitted.",
  },
  {
    question: "Does mp3bat download the video from a YouTube link?",
    answer:
      "No. mp3bat never connects to YouTube. You bring a file you already have and it converts it privately in your browser. That design is exactly why it stays on the right side of YouTube's terms.",
  },
];

export default function HowToLegally() {
  return (
    <ArticleGuide
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      crumb="Convert YouTube to MP3 legally"
      faqs={faqs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToSchema({ name: TITLE, description: DESCRIPTION, steps })
          ),
        }}
      />

      <h1>How to Convert YouTube to MP3 Legally</h1>
      <p className="lede">
        You <em>can</em> turn YouTube audio into an MP3 without crossing any lines — the trick is{" "}
        <strong>what</strong> you convert, not which tool you use. This guide walks through the legal
        sources, then the exact steps to get a clean MP3 from a file you&apos;re entitled to.
      </p>

      <p>
        Most articles on this topic either pretend it&apos;s all fine or scare you off completely.
        Neither is true. The honest version is simple: converting a file you have the right to use is
        legitimate; ripping a commercial track you don&apos;t own is not. For the legal reasoning in
        depth, see <Link href="/is-youtube-to-mp3-legal">is converting YouTube to MP3 legal?</Link>{" "}
        — this page is the how-to.

      </p>

      <h2>Which YouTube audio you can legally convert</h2>
      <ul>
        <li>
          <strong>Your own uploads.</strong> If you posted the video, you own or licensed what&apos;s
          in it. Converting it is entirely your call.
        </li>
        <li>
          <strong>Creative Commons content.</strong> Some creators license videos for reuse — just
          read the specific terms, since most require attribution and some forbid commercial use.
        </li>
        <li>
          <strong>Public-domain works.</strong> Material whose copyright has expired or was dedicated
          to the public domain is free to copy (verify status, which varies by country).
        </li>
        <li>
          <strong>Audio you bought or have permission for.</strong> Purchased tracks and explicit
          permission from the rights holder both clear the way.
        </li>
      </ul>
      <p>
        What&apos;s <em>not</em> on this list: commercial songs, label music videos, and other
        people&apos;s protected work. Converting those is infringement no matter how private the file
        stays.
      </p>

      <h2>Step by step</h2>
      <ol>
        {steps.map((s) => (
          <li key={s.name}>
            <strong>{s.name}.</strong> {s.text}
          </li>
        ))}
      </ol>

      <Link href="/" className="cta-back">
        Open the converter →
      </Link>

      <h2>Why convert on your device instead of a ripper site</h2>
      <p>
        The big &quot;paste-a-link&quot; sites run on a server that fetches the audio for you — which
        is the part that breaks YouTube&apos;s terms and, for protected tracks, infringes copyright.
        It&apos;s also why those sites are buried in pop-ups and redirects. mp3bat does the opposite:
        it converts a file you already hold, entirely in your browser, with nothing uploaded. You get
        the MP3 without handing your data — or your trust — to a sketchy site.
      </p>

      <SafeYoutube convertHref="/" convertLabel="Open the converter →" />

      <h2>FAQ</h2>
      {faqs.map((f) => (
        <div key={f.question}>
          <p className="faq-q">{f.question}</p>
          <p>{f.answer}</p>
        </div>
      ))}

      <h2>Related</h2>
      <p>
        <Link href="/is-youtube-to-mp3-legal">Is YouTube to MP3 legal?</Link> ·{" "}
        <Link href="/guides/is-youtube-to-mp3-safe">Is YouTube to MP3 safe?</Link> ·{" "}
        <Link href="/guides/safe-youtube-audio">Safe ways to get audio from YouTube</Link> ·{" "}
        <Link href="/guides">all guides</Link>
      </p>
    </ArticleGuide>
  );
}
