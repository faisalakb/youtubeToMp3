// Real-browser E2E check of the ffmpeg.wasm video→MP3 path.
// Records a short WebM (with an audio track) in-page, drives the actual
// converter UI, and verifies a valid MP3 blob comes out. Not part of the unit
// suite — run manually with a server on :3000 and Chrome available.
import puppeteer from "puppeteer-core";

const URL = process.env.E2E_URL || "http://localhost:3000/convert/webm-to-mp3";
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--use-gl=swiftshader",
    "--autoplay-policy=no-user-gesture-required",
  ],
});

try {
  const page = await browser.newPage();
  page.on("console", (m) => console.log("  [page]", m.text()));
  page.on("pageerror", (e) => console.log("  [pageerror]", e.message));

  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });

  // 1) Record ~1s of audio into a WebM file, in the browser.
  await page.evaluate(async () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.frequency.value = 440;
    const dest = ctx.createMediaStreamDestination();
    osc.connect(dest);
    osc.start();
    const rec = new MediaRecorder(dest.stream, { mimeType: "audio/webm" });
    const chunks = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const done = new Promise((r) => (rec.onstop = r));
    rec.start();
    await new Promise((r) => setTimeout(r, 1200));
    rec.stop();
    osc.stop();
    await done;
    const blob = new Blob(chunks, { type: "video/webm" });
    window.__testFile = new File([blob], "test.webm", { type: "video/webm" });
    console.log("recorded webm bytes:", window.__testFile.size);
  });

  // 2) Inject the file into the converter's <input> and fire change.
  await page.evaluate(() => {
    const input = document.querySelector('input[type="file"]');
    const dt = new DataTransfer();
    dt.items.add(window.__testFile);
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  // 3) Click Convert.
  await page.waitForSelector("button.go:not([disabled])", { timeout: 10000 });
  await page.click("button.go");

  // 4) Wait for the result download link (engine downloads ~32MB first time).
  await page.waitForSelector("a.download", { timeout: 120000 });

  // 5) Read the produced MP3 back and validate it.
  const result = await page.evaluate(async () => {
    const a = document.querySelector("a.download");
    const res = await fetch(a.href);
    const buf = new Uint8Array(await res.arrayBuffer());
    const head = [buf[0], buf[1], buf[2]];
    const isFrameSync = buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0;
    const isId3 = buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33;
    return { size: buf.length, head, validMp3: isFrameSync || isId3, name: a.getAttribute("download") };
  });

  console.log("RESULT:", JSON.stringify(result));
  if (!result.validMp3 || result.size < 200) {
    throw new Error("Output is not a valid/non-trivial MP3");
  }
  console.log("✅ video→MP3 produced a valid MP3 in a real browser");
} finally {
  await browser.close();
}
