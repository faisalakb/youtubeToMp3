// Rasterize the brand SVG into the PNG sizes the app needs.
// Source of truth is app/icon.svg (the rounded-tile mark); run with `npm run icons`.
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = await readFile(join(root, "app/icon.svg"));
const INK = "#0b1220";

// [size, output path, flatten-onto-ink?]
// PWA + favicon keep transparent rounded corners; Apple wants an opaque square
// (iOS applies its own mask and renders transparency as black).
const targets = [
  [512, "public/icon-512.png", false],
  [192, "public/icon-192.png", false],
  [180, "app/apple-icon.png", true],
  [32, "public/favicon-32.png", false],
];

for (const [size, out, flatten] of targets) {
  let img = sharp(src, { density: 384 }).resize(size, size);
  if (flatten) img = img.flatten({ background: INK });
  await img.png().toFile(join(root, out));
  console.log(`✓ ${out} (${size}×${size})`);
}

// Multi-resolution favicon.ico (16/32/48) for legacy/desktop contexts that
// don't use the SVG favicon. Flattened onto ink since .ico has no real alpha.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((s) =>
    sharp(src, { density: 384 }).resize(s, s).flatten({ background: INK }).png().toBuffer()
  )
);
await writeFile(join(root, "app/favicon.ico"), await pngToIco(icoPngs));
console.log(`✓ app/favicon.ico (${icoSizes.join("/")})`);
