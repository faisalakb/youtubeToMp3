import Link from "next/link";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import {
  articleSchema,
  faqPageSchema,
  breadcrumbSchema,
  type Faq,
} from "@/lib/schema";

/**
 * Shared chrome + structured data for a written guide article. The body is
 * passed as children so each guide keeps unique, hand-written content while
 * reusing the layout, breadcrumb, Article and (optional) FAQ schema.
 */
export default function ArticleGuide({
  title,
  description,
  path,
  crumb,
  datePublished = "2026-06-15",
  faqs,
  children,
}: {
  title: string;
  description: string;
  path: string;
  /** Short breadcrumb label, e.g. "Safest converter". */
  crumb: string;
  datePublished?: string;
  faqs?: Faq[];
  children: React.ReactNode;
}) {
  return (
    <main className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({ headline: title, description, url: site.url + path, datePublished })
          ),
        }}
      />
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url + "/" },
              { name: "Guides", url: site.url + "/guides" },
              { name: crumb, url: site.url + path },
            ])
          ),
        }}
      />

      <Brand note="guide" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / {crumb}
      </nav>

      <article className="prose">{children}</article>

      <Footer />
    </main>
  );
}
