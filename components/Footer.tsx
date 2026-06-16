import Link from "next/link";
import { site } from "@/lib/site";

/** Site footer with the real, working links (no dead anchors). */
export default function Footer() {
  return (
    <footer>
      {site.name} · everything client-side ·{" "}
      <Link href="/convert">convert</Link> ·{" "}
      <Link href="/guides">guides</Link> ·{" "}
      <Link href="/pricing">pricing</Link> ·{" "}
      <Link href="/how-it-works">how it works</Link> ·{" "}
      <Link href="/is-youtube-to-mp3-legal">is this legal?</Link> ·{" "}
      <Link href="/privacy">privacy</Link> ·{" "}
      <Link href="/disclosure">disclosure</Link>
    </footer>
  );
}
