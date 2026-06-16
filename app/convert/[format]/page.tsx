import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import Converter from "@/components/Converter";
import { site } from "@/lib/site";
import { FORMATS, getFormat } from "@/lib/formats";
import {
  webApplicationSchema,
  faqPageSchema,
  breadcrumbSchema,
} from "@/lib/schema";

type Params = { format: string };

export function generateStaticParams(): Params[] {
  return FORMATS.map((f) => ({ format: f.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const f = getFormat(params.format);
  if (!f) return {};
  const title = `${f.ext} to MP3 — convert in your browser, no upload`;
  const description = `Convert ${f.name} to MP3 entirely on your device. Free, private, no sign-up. ${f.why}`;
  const path = `/convert/${f.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: site.url + path },
  };
}

export default function FormatPage({ params }: { params: Params }) {
  const f = getFormat(params.format);
  if (!f) notFound();

  const path = `/convert/${f.slug}`;

  return (
    <main className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(f.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url + "/" },
              { name: "Convert", url: site.url + "/convert" },
              { name: `${f.ext} to MP3`, url: site.url + path },
            ])
          ),
        }}
      />

      <Brand note={`${f.ext} → MP3`} />

      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/convert">Convert</Link> / {f.ext} to MP3
      </nav>

      <p className="eyebrow">Private by design</p>
      <h1>
        Convert {f.ext} to MP3 <span className="em">without uploading a thing.</span>
      </h1>
      <p className="sub">{f.why}</p>

      <Converter />

      <div className="note">
        <b>About {f.ext} → MP3.</b> {f.note}
      </div>

      <article className="prose" style={{ marginTop: 36 }}>
        <h2>What is {f.name}?</h2>
        <p>{f.about}</p>

        <h2>How to convert {f.ext} to MP3</h2>
        <ol>
          <li>Drop your {f.ext} file into the box above (or click to choose it).</li>
          <li>Pick a bitrate — 320 kbps for best quality, 192 kbps for a smaller file.</li>
          <li>Click <strong>Convert to MP3</strong>. It runs in this tab, on your device.</li>
          <li>Download your MP3. Nothing was ever uploaded.</li>
        </ol>

        <h2>FAQ</h2>
        {f.faqs.map((q) => (
          <div key={q.question}>
            <p className="faq-q">{q.question}</p>
            <p>{q.answer}</p>
          </div>
        ))}

        <h2>Other conversions</h2>
        <ul>
          {FORMATS.filter((o) => o.slug !== f.slug).map((o) => (
            <li key={o.slug}>
              <Link href={`/convert/${o.slug}`}>Convert {o.ext} to MP3</Link>
            </li>
          ))}
        </ul>
        <p>
          New to this? See <Link href="/how-it-works">how the on-device conversion works</Link>, or
          the guide on <Link href="/guides/320-kbps-mp3">choosing a bitrate</Link>.
        </p>
      </article>

      <Footer />
    </main>
  );
}
