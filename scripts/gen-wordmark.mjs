// Regenerate public/logo.svg with the wordmark OUTLINED to vector paths, so the
// lockup renders identically everywhere without loading Space Grotesk.
// Run with `npm run wordmark`. Re-run if the wordmark text or font changes.
import opentype from "opentype.js";
import { decompress } from "wawoff2";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Space Grotesk 600 is the wordmark weight (see app/globals.css --font-display).
const woff2 = await readFile(join(root, "public/fonts/spacegrotesk-600-latin.woff2"));
const ttf = await decompress(woff2);
const font = opentype.parse(ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength));

const SIZE = 46;
const BASELINE = 76;
const START_X = 112;
const TRACKING = -1.5; // matches letter-spacing on the original <text>
const scale = SIZE / font.unitsPerEm;

// Lay out a string glyph-by-glyph so we can preserve tracking and start the
// next run exactly where this one ends. Returns the combined path data and the
// x-cursor after the final glyph (including its trailing tracking gap).
function layout(text, x) {
  let cursor = x;
  let d = "";
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    d += glyph.getPath(cursor, BASELINE, SIZE).toPathData(2) + " ";
    cursor += glyph.advanceWidth * scale + TRACKING;
  }
  return { d: d.trim(), cursor };
}

const mp3 = layout("mp3", START_X);
const bat = layout("bat", mp3.cursor);
const width = Math.ceil(bat.cursor + 12); // trailing padding

// The bat-waveform mark, reused from app/icon.svg, placed on a teal tile.
const markBars = [
  [51, 48, 4, 38, 2], [44.5, 52, 4, 34, 2], [38, 58, 4, 28, 2],
  [31.5, 64, 4, 22, 2], [25, 72, 4, 14, 2],
  [65, 48, 4, 38, 2], [71.5, 52, 4, 34, 2], [78, 58, 4, 28, 2],
  [84.5, 64, 4, 22, 2], [91, 72, 4, 14, 2],
  [56.5, 48, 7, 38, 3.5],
]
  .map(([x, y, w, h, r]) => `    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`)
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 120">
  <!-- mp3bat horizontal lockup — wordmark outlined (no web font needed) -->
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d1bf"/>
      <stop offset="100%" stop-color="#1fa89a"/>
    </linearGradient>
  </defs>

  <!-- mark on a light-sea-green tile, dark-blue glyph -->
  <rect x="12" y="20" width="80" height="80" rx="18" fill="url(#tile)"/>
  <g transform="translate(52,60) scale(0.62) translate(-62,-59.5)" fill="#0b1220">
${markBars}
    <polygon points="57,49 53,33 60,46"/>
    <polygon points="63,49 67,33 60,46"/>
  </g>

  <!-- wordmark (outlined): "mp3" ink + "bat" light sea green -->
  <path fill="#e7eef8" d="${mp3.d}"/>
  <path fill="#34d1bf" d="${bat.d}"/>
</svg>
`;

await writeFile(join(root, "public/logo.svg"), svg);
console.log(`✓ public/logo.svg — wordmark outlined, viewBox 0 0 ${width} 120`);
