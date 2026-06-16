// Generate the social share card (1200×630) at public/og.png. Text is outlined
// to vector paths (no web font needed at render time). Each glyph is emitted as
// its own <path> — a single giant `d` attribute gets truncated by the SVG
// rasterizer. Run: `npm run og`.
import opentype from "opentype.js";
import { decompress } from "wawoff2";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function loadFont(file) {
  const ttf = await decompress(await readFile(join(root, "public/fonts", file)));
  return opentype.parse(ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength));
}
const sg600 = await loadFont("spacegrotesk-600-latin.woff2");
const sg400 = await loadFont("spacegrotesk-400-latin.woff2");

// Lay out a text run as per-glyph path data; returns the paths and the x-cursor.
function run(font, text, size, x, y, tracking = 0) {
  const scale = size / font.unitsPerEm;
  let cursor = x;
  const ds = [];
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    const d = g.getPath(cursor, y, size).toPathData(2);
    if (d) ds.push(d);
    cursor += g.advanceWidth * scale + tracking;
  }
  return { ds, x: cursor };
}
const paint = (r, fill) =>
  `<g fill="${fill}">` + r.ds.map((d) => `<path d="${d}"/>`).join("") + `</g>`;

const W = 1200, H = 630;

// Wordmark "mp3" + "bat" beside the mark tile (baseline ~ tile centre)
const wmA = run(sg600, "mp3", 76, 244, 166, -2);
const wmB = run(sg600, "bat", 76, wmA.x, 166, -2);

// Headline (two lines), subline, domain
const h1 = run(sg600, "Convert audio to MP3", 62, 84, 348, -1);
const h2a = run(sg600, "without ", 62, 84, 426, -1);
const h2b = run(sg600, "uploading a thing.", 62, h2a.x, 426, -1);
const sub = run(sg400, "Private, in-browser converter — no upload, no ads, no sign-up.", 30, 86, 506);
const dom = run(sg600, "mp3bat.com", 28, 86, 566, 0.5);

// Bat-waveform mark (from app/icon.svg), centered on a teal tile.
const bars = [
  [51, 48, 4, 38, 2], [44.5, 52, 4, 34, 2], [38, 58, 4, 28, 2], [31.5, 64, 4, 22, 2],
  [25, 72, 4, 14, 2], [65, 48, 4, 38, 2], [71.5, 52, 4, 34, 2], [78, 58, 4, 28, 2],
  [84.5, 64, 4, 22, 2], [91, 72, 4, 14, 2], [56.5, 48, 7, 38, 3.5],
].map(([x, y, w, h, r]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="18%" cy="22%" r="60%">
      <stop offset="0%" stop-color="#34d1bf" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#34d1bf" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d1bf"/><stop offset="100%" stop-color="#1fa89a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0b1220"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#tile)"/>

  <rect x="84" y="74" width="124" height="124" rx="28" fill="url(#tile)"/>
  <g transform="translate(146,138) scale(1.12) translate(-62,-59.5)" fill="#0b1220">
    ${bars}
    <polygon points="57,49 53,33 60,46"/><polygon points="63,49 67,33 60,46"/>
  </g>
  ${paint(wmA, "#e7eef8")}
  ${paint(wmB, "#34d1bf")}
  ${paint(h1, "#e7eef8")}
  ${paint(h2a, "#e7eef8")}
  ${paint(h2b, "#34d1bf")}
  ${paint(sub, "#8a9cb8")}
  ${paint(dom, "#34d1bf")}
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, "public/og.png"));
console.log("✓ public/og.png (1200×630)");
