import Link from "next/link";
import RipAlternative from "@/components/RipAlternative";

/**
 * The honest "YouTube → MP3" path. mp3bat never rips YouTube itself (that needs
 * a server and crosses YouTube's terms), so this lays out the legal two-step
 * flow people are actually looking for when they land here.
 */
const SOURCES = [
  "Videos you uploaded",
  "YouTube Premium offline",
  "Creative Commons clips",
  "Public-domain audio",
  "Bandcamp / SoundCloud",
];

export default function SafeYoutube({
  // On the homepage the converter is on the same page (#convert); on a guide it
  // lives back on the home route.
  convertHref = "#convert",
  convertLabel = "Back to the converter ↑",
}: {
  convertHref?: string;
  convertLabel?: string;
}) {
  return (
    <section className="syt" aria-labelledby="syt-h">
      <p className="syt-eyebrow">YouTube → MP3 · the safe way</p>
      <h2 id="syt-h" className="syt-h">
        We don&apos;t rip YouTube. <span>Here&apos;s the clean two-step instead.</span>
      </h2>

      <ol className="syt-steps">
        <li className="syt-step">
          <span className="syt-num">01</span>
          <div className="syt-content">
            <h3>Get the file — legally</h3>
            <p>Save audio you&apos;re entitled to onto your device first.</p>
            <ul className="syt-chips">
              {SOURCES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Link className="syt-link" href="/is-youtube-to-mp3-legal">
              Which ways are legal? →
            </Link>
          </div>
        </li>

        <li className="syt-step">
          <span className="syt-num">02</span>
          <div className="syt-content">
            <h3>Convert it here</h3>
            <p>
              Drop that file into mp3bat. It becomes an MP3 right in your browser —{" "}
              <b>never uploaded, never seen</b>.
            </p>
            <Link className="syt-link" href={convertHref}>
              {convertLabel}
            </Link>
          </div>
        </li>
      </ol>

      <p className="syt-foot">
        Why no &ldquo;paste a link&rdquo; box? Pulling streams from YouTube needs a server and crosses
        YouTube&apos;s terms — that&apos;s the part with the legal and security baggage. mp3bat
        converts the file <em>you</em> bring.
      </p>

      <RipAlternative />
    </section>
  );
}
