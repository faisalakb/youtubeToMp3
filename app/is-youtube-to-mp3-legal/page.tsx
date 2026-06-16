import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import SafeYoutube from "@/components/SafeYoutube";
import { site } from "@/lib/site";
import {
  articleSchema,
  faqPageSchema,
  breadcrumbSchema,
  type Faq,
} from "@/lib/schema";

const TITLE = "Is Converting YouTube to MP3 Legal? (2026)";
const DESCRIPTION =
  "Whether converting YouTube to MP3 is legal depends on what you convert and your rights to it — not the tool. The honest breakdown, plus the safe ways to do it.";
const PATH = "/is-youtube-to-mp3-legal";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: site.url + PATH, type: "article" },
};

const faqs: Faq[] = [
  {
    question: "Is converting YouTube to MP3 illegal?",
    answer:
      "It can be. Converting copyrighted content you don't own or have permission to copy is generally copyright infringement and breaks YouTube's Terms. Converting your own content, permissively licensed content, or public-domain content is not.",
  },
  {
    question: "Can I get in trouble for converting a song for personal use?",
    answer:
      "Realistically, rights holders pursue the sites and tools, not individual listeners — so personal-use conversion of a single track rarely leads to action against you. But \"rarely pursued\" isn't the same as \"permitted.\" Many countries don't have a blanket personal-use exception for copying protected works.",
  },
  {
    question: "Is it legal if I already own the song?",
    answer:
      "If you legitimately own a copy, format-shifting for your own use is far less likely to be a problem, and in some places is expressly allowed. The cleanest path is converting a file you already hold the rights to.",
  },
  {
    question: "Why do YouTube to MP3 sites keep getting shut down?",
    answer:
      "Because the legal exposure sits with the operators. Laws targeting circumvention tools, plus sustained action from rights-holder groups, make running these sites risky — which is why they recycle domains and lean on aggressive ads.",
  },
  {
    question: "What's the safest way to get music for offline listening?",
    answer:
      "Buy it, stream it with an offline-capable subscription, or download it from creators who offer it directly. For audio you're entitled to, convert the file yourself with a private, client-side tool.",
  },
];

export default function LegalArticle() {
  return (
    <main className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: TITLE,
              description: DESCRIPTION,
              url: site.url + PATH,
              datePublished: "2026-06-15",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url + "/" },
              { name: "Is YouTube to MP3 legal?", url: site.url + PATH },
            ])
          ),
        }}
      />

      <Brand note="guide · plain English" />

      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / Is YouTube to MP3 legal?
      </nav>

      <article className="prose">
        <h1>Is Converting YouTube to MP3 Legal?</h1>
        <p className="lede">
          <strong>Short answer:</strong> It depends almost entirely on <em>what</em> you&apos;re
          converting and <em>whether you have the right to use it</em> — not on the converter you
          use. Pulling an MP3 from a track you don&apos;t own or have permission to copy is generally
          copyright infringement and breaks YouTube&apos;s terms. Converting content you own, content
          released under a license that allows it, or public-domain material is a different story.
        </p>

        <p>
          That&apos;s the honest version. Most pages on this topic either wave the question away
          (&quot;totally fine!&quot;) or scare you off entirely. Neither is accurate, so let&apos;s
          go through it properly.
        </p>

        <blockquote>
          This is general information, not legal advice. Copyright law varies by country, and your
          situation may differ. If you&apos;re making decisions with real stakes, talk to a qualified
          lawyer in your jurisdiction.
        </blockquote>

        <h2>The two things that actually decide it</h2>
        <p>
          When people ask &quot;is this legal,&quot; they&apos;re usually blending two separate
          questions. Pulling them apart makes the whole topic clearer.
        </p>

        <h3>1. YouTube&apos;s Terms of Service</h3>
        <p>
          YouTube&apos;s Terms are a contract between you and the platform. They state that you may
          not download or copy content except when YouTube itself gives you a download option (for
          example, the offline feature inside the app) or when you have the copyright owner&apos;s
          prior written permission. The Terms also prohibit getting around any of the platform&apos;s
          technical or security measures.
        </p>
        <p>
          Breaking the Terms isn&apos;t a criminal act in itself — it&apos;s a breach of a usage
          agreement, and the main consequence is that YouTube can restrict or close your account. But
          it matters, because it&apos;s the reason third-party &quot;ripping&quot; sites operate in a
          gray zone and are routinely targeted.
        </p>

        <h3>2. Copyright law</h3>
        <p>
          This is the bigger one. A typical music video, song, or podcast on YouTube is protected by
          copyright owned by an artist, label, or creator. Making a copy of that audio — which is
          exactly what a conversion to MP3 is — without permission is, in most countries, copyright
          infringement, regardless of whether you ever share it.
        </p>
        <p>
          You&apos;ll often hear &quot;but it&apos;s just for personal use.&quot; Be careful with
          that. A few countries have narrow private-copying exceptions, but many (including the US)
          don&apos;t offer a blanket personal-use shield for copying protected works. In practice,
          rights holders almost never pursue individual listeners — enforcement energy goes toward
          the tools and sites that enable copying at scale. That&apos;s a statement about <em>who gets
          sued</em>, not about what&apos;s technically permitted.
        </p>

        <h2>So when is it clearly fine?</h2>
        <p>
          There are several situations where converting YouTube audio to MP3 is genuinely above
          board:
        </p>
        <ul>
          <li>
            <strong>It&apos;s your own content.</strong> If you uploaded the video, you own (or
            licensed) the material in it. Converting your own upload to MP3 is your right.
          </li>
          <li>
            <strong>It&apos;s released under a permissive license.</strong> Some creators publish
            under a Creative Commons license. The catch: licenses have <em>terms</em> — most require
            attribution, and some forbid commercial use or modification. Read the specific license
            before relying on it.
          </li>
          <li>
            <strong>It&apos;s in the public domain.</strong> Works whose copyright has expired, or
            that were dedicated to the public domain, are free to copy. (Public domain status varies
            by country and can be easy to get wrong, so verify.)
          </li>
          <li>
            <strong>You have the owner&apos;s permission.</strong> Explicit permission from the
            rights holder removes the problem.
          </li>
          <li>
            <strong>You use YouTube&apos;s own offline feature.</strong> A YouTube Premium
            subscription lets you save videos for offline playback <em>within the app</em>. That&apos;s
            a sanctioned download path — though it keeps the file inside YouTube&apos;s app rather
            than handing you a loose MP3.
          </li>
        </ul>

        <h2>When it&apos;s a problem</h2>
        <p>
          By contrast, the risky pattern is the common one: taking a commercial song, a label&apos;s
          music video, or any creator&apos;s protected work and converting it to a file you keep —
          without owning it, licensing it, or getting permission. The fact that the file is for you
          and never leaves your hard drive doesn&apos;t change its copyright status; it mainly changes
          how unlikely anyone is to come after you personally.
        </p>

        <h2>Why the converter sites themselves are the ones in trouble</h2>
        <p>
          If you&apos;ve noticed that big &quot;YouTube to MP3&quot; sites keep disappearing, changing
          domains, or getting blocked, this is why. The legal exposure concentrates on the{" "}
          <em>operators</em>, not the visitors:
        </p>
        <ul>
          <li>
            Copyright law in many countries separately targets tools and services designed to get
            around access controls — so distributing the ripping mechanism can be an offense on its
            own, independent of any single download.
          </li>
          <li>
            Rights-holder groups have a long track record here. The largest stream-ripping sites have
            been shut down through legal action, and at least one operator has faced criminal
            proceedings abroad.
          </li>
          <li>
            That legal pressure is exactly why these sites churn through recycled domains and run
            aggressive pop-up ads — it&apos;s a high-risk business defending itself, not a stable one.
          </li>
        </ul>
        <p>
          It&apos;s worth knowing this even as a user, because it explains the ad-bloated, sketchy
          experience: those sites are monetizing hard and fast because they may not be around long.
        </p>

        <h2>The genuinely safe ways to get an MP3</h2>
        <p>
          If your goal is audio you can keep and listen to offline, here are the routes that
          don&apos;t put you on the wrong side of copyright:
        </p>
        <ol>
          <li>
            <strong>Buy or stream it.</strong> Stores and streaming services license the music
            properly. For most commercial tracks, this is the clean answer.
          </li>
          <li>
            <strong>Use YouTube Premium&apos;s offline feature</strong> for in-app offline listening
            of YouTube content.
          </li>
          <li>
            <strong>Download from creators who offer it.</strong> Many independent artists and
            podcasters provide direct, free, intended downloads on their own sites or platforms like
            Bandcamp or SoundCloud.
          </li>
          <li>
            <strong>Use Creative Commons and public-domain libraries</strong> when you need audio you
            can freely reuse.
          </li>
          <li>
            <strong>Convert files you already have the right to.</strong> Recorded something
            yourself? Bought a video file? Exported your own project? Converting <em>those</em> to MP3
            is entirely your call.
          </li>
        </ol>
        <p>
          That last one is where a converter actually belongs — turning a file you legitimately have
          into the format you need.
        </p>

        <h2>Where mp3bat fits</h2>
        <p>
          mp3bat is built for the legitimate case: converting audio you already have on your device
          into MP3, entirely inside your browser. Your file is never uploaded, so it never touches a
          server — which is both a privacy feature and the reason the tool stays cleanly on the right
          side of the line. We don&apos;t pull audio from YouTube for you, because that&apos;s the
          part with the legal and security baggage. We convert the file <em>you</em> bring.
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
          <Link href="/guides/how-to-convert-youtube-to-mp3-legally">
            How to convert YouTube to MP3 legally (step by step)
          </Link>{" "}
          · <Link href="/guides/is-youtube-to-mp3-safe">Is YouTube to MP3 safe?</Link> ·{" "}
          <Link href="/guides/safe-youtube-audio">Safe ways to get audio from YouTube</Link> ·{" "}
          <Link href="/guides/safest-converter">What to check in a safe converter</Link> ·{" "}
          <Link href="/guides">all guides</Link>
        </p>
      </article>

      <Footer />
    </main>
  );
}
