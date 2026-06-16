/**
 * Definitions for the per-format converter pages (e.g. /convert/wav-to-mp3).
 * Each entry carries genuinely unique copy — these are quality money-pages,
 * not thin programmatic spam. Only formats the client-side engine actually
 * decodes are listed here; video containers (MP4/MOV) are deferred until the
 * ffmpeg.wasm engine ships.
 */
import type { Faq } from "./schema";

export type Format = {
  slug: string;
  /** Upper-case source extension, e.g. "WAV". */
  ext: string;
  /** audio = Web Audio + lamejs; video = ffmpeg.wasm audio extraction. */
  kind: "audio" | "video";
  /** Human name of the source format. */
  name: string;
  /** Why this conversion is commonly wanted (1–2 sentences). Visible body copy. */
  why: string;
  /** Short, unique reason for the meta description tail (keep it brief so the
   *  full description stays under ~155 chars). */
  blurb: string;
  /** A short, format-specific technical note shown under the converter. */
  note: string;
  /** What the format is, in plain English (one paragraph). */
  about: string;
  faqs: Faq[];
};

export const FORMATS: Format[] = [
  {
    slug: "wav-to-mp3",
    ext: "WAV",
    kind: "audio",
    name: "WAV",
    why: "WAV files are uncompressed, so they're large — often ten times the size of an MP3. Converting to MP3 shrinks them for phones, email, and players while keeping the audio that matters.",
    blurb: "Shrink large uncompressed WAV files for phones, email, and players.",
    note: "WAV is lossless and uncompressed, so the MP3 will be dramatically smaller. 320 kbps keeps the quality difference inaudible to most listeners; 192 kbps is the sweet spot for size.",
    about:
      "WAV (Waveform Audio File Format) stores raw, uncompressed PCM audio. It's the studio-standard container for recordings and exports because nothing is thrown away — which is also why the files are so big.",
    faqs: [
      {
        question: "Will converting WAV to MP3 lose quality?",
        answer:
          "Some, by definition — MP3 is a lossy format. But at 256–320 kbps the difference is inaudible to almost everyone, while the file gets roughly 10× smaller. For archiving, keep the WAV; for listening and sharing, the MP3 is fine.",
      },
      {
        question: "Why are my WAV files so large?",
        answer:
          "WAV stores uncompressed PCM audio, so a few minutes of stereo can run tens of megabytes. MP3 compresses that down by an order of magnitude, which is the main reason people convert.",
      },
      {
        question: "Is the conversion done on a server?",
        answer:
          "No. Your WAV is decoded and re-encoded entirely in your browser. The file never leaves your device.",
      },
    ],
  },
  {
    slug: "m4a-to-mp3",
    ext: "M4A",
    kind: "audio",
    name: "M4A",
    why: "M4A is what iPhones, Apple Music, and Voice Memos produce, but some older players, car stereos, and apps only accept MP3. Converting makes the file play everywhere.",
    blurb: "Make iPhone, Apple Music, and Voice Memo audio play on any device.",
    note: "M4A usually holds AAC audio, which is already compressed. Re-encoding to MP3 is a lossy-to-lossy step, so choose 256–320 kbps to avoid stacking up audible artifacts.",
    about:
      "M4A is an MPEG-4 audio container, typically holding AAC (and sometimes Apple Lossless). It's the default for Apple devices and many download stores, offering good quality at small sizes — but narrower device support than MP3.",
    faqs: [
      {
        question: "Why won't my M4A file play on some devices?",
        answer:
          "Plenty of older car stereos, MP3 players, and embedded systems only recognize MP3. M4A is newer and not universally supported, so converting to MP3 maximizes compatibility.",
      },
      {
        question: "Does converting M4A to MP3 reduce quality?",
        answer:
          "M4A (AAC) is already compressed, so re-encoding to MP3 is lossy-to-lossy and can slightly degrade audio. Using 256–320 kbps keeps any loss below what most people can hear.",
      },
      {
        question: "Can I convert iPhone Voice Memos this way?",
        answer:
          "Yes — export the memo as an .m4a file, drop it here, and convert. It all happens on your device, so nothing is uploaded.",
      },
    ],
  },
  {
    slug: "aac-to-mp3",
    ext: "AAC",
    kind: "audio",
    name: "AAC",
    why: "AAC delivers great quality for its size and is everywhere in streaming and Apple's ecosystem — but MP3 remains the safest format for universal playback. Convert when you need something that plays anywhere.",
    blurb: "Turn streaming and Apple-ecosystem audio into a file that plays anywhere.",
    note: "AAC is a lossy codec, so converting to MP3 is lossy-to-lossy. Pick 256–320 kbps to keep the result transparent; dropping to 128 kbps twice over is where quality starts to show.",
    about:
      "AAC (Advanced Audio Coding) is the successor to MP3, generally sounding better at the same bitrate. It's the default for YouTube, Apple Music, and most streaming — but MP3 still wins on raw device compatibility.",
    faqs: [
      {
        question: "Isn't AAC better than MP3?",
        answer:
          "At the same bitrate, AAC usually does sound a touch better. People still convert to MP3 for compatibility — some hardware and software only handle MP3. If your device plays AAC fine, there's no quality reason to convert.",
      },
      {
        question: "What bitrate should I choose for AAC to MP3?",
        answer:
          "Because you're going from one lossy format to another, stay high: 256 or 320 kbps keeps the conversion transparent. Avoid low bitrates, which compound the compression artifacts.",
      },
    ],
  },
  {
    slug: "ogg-to-mp3",
    ext: "OGG",
    kind: "audio",
    name: "OGG Vorbis",
    why: "OGG (Vorbis) is open and efficient, common in games and on Linux, but many mainstream apps and devices don't support it. Converting to MP3 makes those files play on practically anything.",
    blurb: "Make open-format game and Linux audio play on practically anything.",
    note: "OGG Vorbis is a lossy codec, so this is a lossy-to-lossy conversion. Use 256–320 kbps so the MP3 doesn't audibly degrade relative to the source.",
    about:
      "OGG is an open, royalty-free container most often holding Vorbis audio. It's popular in open-source software and game audio, but consumer device support lags well behind MP3 — the usual reason for converting.",
    faqs: [
      {
        question: "Why doesn't my OGG file play in most apps?",
        answer:
          "OGG Vorbis is open and technically excellent but never reached MP3's universal hardware and software support. Converting to MP3 is the simplest fix for compatibility.",
      },
      {
        question: "Is OGG to MP3 lossless?",
        answer:
          "No. OGG Vorbis is already a lossy format, so converting to MP3 is lossy-to-lossy. Choose a high bitrate (256–320 kbps) to keep the result clean.",
      },
    ],
  },
  {
    slug: "flac-to-mp3",
    ext: "FLAC",
    kind: "audio",
    name: "FLAC",
    why: "FLAC is lossless, so it preserves every detail — and takes a lot of space. Converting to MP3 frees up storage and fits more music on phones and players, with a quality drop most people can't hear at high bitrates.",
    blurb: "Shrink lossless audio to fit more music on phones and players.",
    note: "FLAC is lossless, so this is your one clean encode from a perfect source. Use 320 kbps to keep the MP3 as close to the original as a lossy format allows.",
    about:
      "FLAC (Free Lossless Audio Codec) compresses audio without discarding any data — bit-for-bit identical to the source when decoded. Audiophiles love it for archiving; the trade-off is file size, which is why people convert to MP3 for everyday listening.",
    faqs: [
      {
        question: "Should I keep my FLAC files after converting?",
        answer:
          "Yes, if you have the space. FLAC is your lossless master — keep it for archiving, and use the MP3 for phones and players. You can always re-encode from the FLAC later.",
      },
      {
        question: "What's the best bitrate for FLAC to MP3?",
        answer:
          "320 kbps. Since you're starting from a lossless source, a high bitrate gives you the best-sounding MP3 the format can produce. It's the one conversion where going maximum quality clearly pays off.",
      },
      {
        question: "How much smaller will the MP3 be?",
        answer:
          "Typically 3–5× smaller than the FLAC, depending on the music. That's the whole point — fitting far more audio on a device with a quality difference most listeners won't notice.",
      },
    ],
  },
];

// --- Video containers: audio extracted with the built-in ffmpeg.wasm engine.
const videoNote =
  "The audio track is extracted from the video entirely in your browser using the built-in engine. The first video conversion downloads the engine once (~32 MB), then it's cached — nothing is uploaded.";

FORMATS.push(
  {
    slug: "mp4-to-mp3",
    ext: "MP4",
    kind: "video",
    name: "MP4",
    why: "MP4 is the most common video format, and often all you want from it is the audio — a song, a lecture, a podcast. mp3bat extracts the audio track to MP3 right in your browser, no upload.",
    blurb: "Pull the audio from any MP4 video — a song, lecture, or podcast.",
    note: videoNote,
    about:
      "MP4 (MPEG-4 Part 14) is the dominant container for video on phones, cameras, and the web, usually pairing H.264/H.265 video with AAC audio. Converting to MP3 keeps just the audio in a universally playable form.",
    faqs: [
      {
        question: "Does converting MP4 to MP3 upload my video?",
        answer:
          "No. The audio is extracted on your device with a WebAssembly build of ffmpeg. The video never leaves your browser — the first conversion just downloads the engine once.",
      },
      {
        question: "Will the MP3 quality match the video's audio?",
        answer:
          "It's as good as the source audio allows. MP4 audio is usually AAC (already compressed), so pick 256–320 kbps to keep the extraction clean.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "It runs on your device's memory, so very large videos use more RAM and take longer. For typical clips and songs it's quick.",
      },
    ],
  },
  {
    slug: "mov-to-mp3",
    ext: "MOV",
    kind: "video",
    name: "MOV",
    why: "MOV is Apple's QuickTime video format, straight off iPhones and Macs. When you only need the sound, mp3bat pulls the audio track out to MP3 — privately, in your browser.",
    blurb: "Extract the audio from Apple QuickTime and iPhone videos.",
    note: videoNote,
    about:
      "MOV is Apple's QuickTime container, common for screen recordings and iPhone video. It's well supported on Apple devices but less so elsewhere, so extracting the audio to MP3 makes it play anywhere.",
    faqs: [
      {
        question: "Can I extract audio from an iPhone MOV recording?",
        answer:
          "Yes. Drop the .mov file in and mp3bat extracts its audio to MP3 on your device. Nothing is uploaded.",
      },
      {
        question: "What bitrate should I use for MOV to MP3?",
        answer:
          "256–320 kbps keeps the extracted audio clean. The MOV's audio is typically AAC, so a high bitrate avoids stacking compression.",
      },
    ],
  },
  {
    slug: "mkv-to-mp3",
    ext: "MKV",
    kind: "video",
    name: "MKV",
    why: "MKV (Matroska) is a flexible video container popular for high-quality rips and recordings. mp3bat extracts its audio track to MP3 in your browser, with nothing uploaded.",
    blurb: "Extract the audio track from Matroska (MKV) video files.",
    note: videoNote,
    about:
      "MKV (Matroska) is an open container that can hold many video, audio, and subtitle tracks. It's powerful but unevenly supported by players — extracting the audio to MP3 gives you something that plays everywhere.",
    faqs: [
      {
        question: "Which audio track gets extracted from an MKV?",
        answer:
          "The default audio track is extracted. MKV files can carry several; support for choosing a specific track may come later.",
      },
      {
        question: "Is MKV to MP3 done on a server?",
        answer:
          "No. The extraction runs locally with ffmpeg compiled to WebAssembly, so your file stays on your device.",
      },
    ],
  },
  {
    slug: "webm-to-mp3",
    ext: "WEBM",
    kind: "video",
    name: "WEBM",
    why: "WEBM is the open web video format, common for downloads and recordings. mp3bat extracts its audio to MP3 entirely in your browser — no upload, no sign-up.",
    blurb: "Extract the audio from open-web WEBM video files.",
    note: videoNote,
    about:
      "WEBM is an open, royalty-free container (usually VP8/VP9 video with Vorbis or Opus audio) built for the web. Extracting the audio to MP3 makes it playable on devices and apps that don't handle WEBM.",
    faqs: [
      {
        question: "Why convert WEBM to MP3?",
        answer:
          "WEBM isn't supported everywhere, especially on older or non-browser players. Pulling the audio into MP3 gives you a file that plays on practically anything.",
      },
      {
        question: "Does this work offline after the first time?",
        answer:
          "Largely, yes — once the engine has downloaded and cached, the conversion itself is entirely local and never contacts a server.",
      },
    ],
  }
);

export function getFormat(slug: string): Format | undefined {
  return FORMATS.find((f) => f.slug === slug);
}
