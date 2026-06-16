import Link from "next/link";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import {
  howToSchema,
  faqPageSchema,
  breadcrumbSchema,
  type Faq,
  type HowToStep,
} from "@/lib/schema";

/**
 * Presentational shell for a device how-to guide. The substance (steps, FAQs)
 * is passed in per device — see lib/devices.ts — so each page is unique content
 * rendered through a consistent layout with HowTo + FAQ + Breadcrumb schema.
 */
export default function HowToGuide({
  title,
  description,
  intro,
  os,
  steps,
  faqs,
  path,
}: {
  title: string;
  description: string;
  intro: string;
  os: string;
  steps: HowToStep[];
  faqs: Faq[];
  path: string;
}) {
  return (
    <main className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema({ name: title, description, steps })),
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
              { name: "Guides", url: site.url + "/guides" },
              { name: `MP3 on ${os}`, url: site.url + path },
            ])
          ),
        }}
      />

      <Brand note={`guide · ${os}`} />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / MP3 on {os}
      </nav>

      <article className="prose">
        <h1>{title}</h1>
        <p className="lede">{intro}</p>

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

        <h2>FAQ</h2>
        {faqs.map((q) => (
          <div key={q.question}>
            <p className="faq-q">{q.question}</p>
            <p>{q.answer}</p>
          </div>
        ))}

        <h2>Related</h2>
        <p>
          See <Link href="/how-it-works">how on-device conversion works</Link>, pick a quality in the{" "}
          <Link href="/guides/320-kbps-mp3">bitrate guide</Link>, or browse all{" "}
          <Link href="/convert">format converters</Link>.
        </p>
      </article>

      <Footer />
    </main>
  );
}
