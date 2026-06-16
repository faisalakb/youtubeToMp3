import Link from "next/link";
import { site } from "@/lib/site";
import UserMenu from "@/components/UserMenu";

/** Brand header used at the top of every page. */
export default function Brand({ note }: { note?: string }) {
  return (
    <div className="brand">
      <Link href="/" className="mark" aria-label={`${site.name} home`} style={{ textDecoration: "none" }}>
        {/* bat-waveform mark — dark-blue glyph on the light-sea-green tile */}
        <svg className="brand-mark" viewBox="15 23 94 73" width="20" height="20" fill="var(--ink)" aria-hidden="true">
          <rect x="51" y="48" width="4" height="38" rx="2" />
          <rect x="44.5" y="52" width="4" height="34" rx="2" />
          <rect x="38" y="58" width="4" height="28" rx="2" />
          <rect x="31.5" y="64" width="4" height="22" rx="2" />
          <rect x="25" y="72" width="4" height="14" rx="2" />
          <rect x="65" y="48" width="4" height="38" rx="2" />
          <rect x="71.5" y="52" width="4" height="34" rx="2" />
          <rect x="78" y="58" width="4" height="28" rx="2" />
          <rect x="84.5" y="64" width="4" height="22" rx="2" />
          <rect x="91" y="72" width="4" height="14" rx="2" />
          <rect x="56.5" y="48" width="7" height="38" rx="3.5" />
          <polygon points="57,49 53,33 60,46" />
          <polygon points="63,49 67,33 60,46" />
        </svg>
      </Link>
      <Link href="/" style={{ color: "var(--text)", textDecoration: "none" }}>
        {/* "bat" in light sea green to echo the mark */}
        <b>
          mp3<span style={{ color: "var(--trust)" }}>bat</span>
        </b>
      </Link>
      <div className="brand-right">
        <span className="ver">{note ?? "v0.1 · client-side"}</span>
        <UserMenu />
      </div>
    </div>
  );
}
