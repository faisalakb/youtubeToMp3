/**
 * Data for the device how-to guides (/guides/mp3-on-*). Steps are genuinely
 * device-specific — these are written guides, not a single template with the
 * OS name swapped. Each renders through components/HowToGuide.tsx.
 */
import type { Faq, HowToStep } from "./schema";

export type Device = {
  slug: string;
  os: string;
  title: string;
  description: string;
  intro: string;
  steps: HowToStep[];
  faqs: Faq[];
};

export const DEVICES: Device[] = [
  {
    slug: "mp3-on-windows",
    os: "Windows",
    title: "How to Convert Audio to MP3 on Windows (No Software to Install)",
    description:
      "Convert WAV, M4A, FLAC and more to MP3 on Windows right in your browser — no download, no upload, no sign-up.",
    intro:
      "Windows can play most audio, but it won't convert files to MP3 on its own without extra software. You don't need to install anything: mp3bat runs in Edge, Chrome, or Firefox and converts on your own PC, so the file never leaves it.",
    steps: [
      { name: "Open the converter", text: "In any modern browser on your PC, open the mp3bat converter page." },
      { name: "Add your file", text: "Drag your audio file from File Explorer onto the drop zone, or click to browse for it." },
      { name: "Choose quality", text: "Select a bitrate — 320 kbps for best quality, 192 kbps for a smaller file." },
      { name: "Convert", text: "Click Convert to MP3. Encoding happens on your PC's processor, in the tab." },
      { name: "Save the MP3", text: "Click Download. The file lands in your Downloads folder, ready to use." },
    ],
    faqs: [
      {
        question: "Does Windows have a built-in MP3 converter?",
        answer:
          "Not a general one. Windows Media Player can rip CDs to MP3, but it won't convert arbitrary audio files. A browser-based converter is the quickest no-install option.",
      },
      {
        question: "Is it safe to convert audio online on Windows?",
        answer:
          "With mp3bat, yes — because nothing actually goes online. The conversion runs locally in your browser, so your file is never uploaded to a server.",
      },
    ],
  },
  {
    slug: "mp3-on-mac",
    os: "Mac",
    title: "How to Convert Audio to MP3 on a Mac (Browser-Based, Private)",
    description:
      "Convert M4A, WAV, FLAC and more to MP3 on macOS without installing anything — runs in Safari or Chrome, entirely on your Mac.",
    intro:
      "macOS leans on the Apple ecosystem, so a lot of your audio is M4A. The Music app can convert in some cases, but it's fiddly and ties you to your library. mp3bat converts any supported audio in Safari or Chrome, on your Mac, with no upload.",
    steps: [
      { name: "Open the converter", text: "Open the mp3bat converter in Safari, Chrome, or Firefox on your Mac." },
      { name: "Drag in your file", text: "Drag the audio file from Finder onto the drop zone, or click to choose it." },
      { name: "Pick a bitrate", text: "Choose 320 kbps for the best quality or a lower bitrate for a smaller file." },
      { name: "Convert", text: "Click Convert to MP3 — your Mac does the encoding locally, in the browser tab." },
      { name: "Download", text: "Click Download to save the MP3, then drag it wherever you need it." },
    ],
    faqs: [
      {
        question: "Can the Music app convert M4A to MP3?",
        answer:
          "It can, via import settings, but it's clunky and keeps files inside your library. A browser converter is faster for a one-off file and doesn't touch your Music library.",
      },
      {
        question: "Will this work in Safari?",
        answer:
          "Yes. mp3bat uses the standard Web Audio API, which Safari supports. Everything runs on your Mac — no file is uploaded.",
      },
    ],
  },
  {
    slug: "mp3-on-iphone",
    os: "iPhone",
    title: "How to Convert Audio to MP3 on iPhone (Save to Files)",
    description:
      "Convert audio to MP3 on an iPhone using Safari and the Files app — no app to install, and the file stays on your phone.",
    intro:
      "iPhones don't ship with an audio converter, and the App Store is full of ones stuffed with ads. You can skip all that: mp3bat works in Safari on iOS, converts on the phone itself, and saves straight to the Files app.",
    steps: [
      { name: "Get the file into Files", text: "Make sure your audio is in the Files app (from an email attachment, AirDrop, or a download)." },
      { name: "Open the converter in Safari", text: "Open the mp3bat converter page in Safari." },
      { name: "Choose your file", text: "Tap the drop zone and pick the audio file from Files." },
      { name: "Select quality and convert", text: "Choose a bitrate and tap Convert to MP3 — iOS encodes it locally in Safari." },
      { name: "Save to Files", text: "Tap Download, then choose Save to Files to keep the MP3 on your iPhone." },
    ],
    faqs: [
      {
        question: "Do I need an app from the App Store?",
        answer:
          "No. mp3bat runs in Safari, so there's nothing to install — and no ad-laden converter app harvesting your data.",
      },
      {
        question: "Where does the MP3 go on my iPhone?",
        answer:
          "When you tap Download you can choose Save to Files, which stores the MP3 on your device or in iCloud Drive, wherever you point it.",
      },
    ],
  },
  {
    slug: "mp3-on-android",
    os: "Android",
    title: "How to Convert Audio to MP3 on Android (No App Needed)",
    description:
      "Convert audio to MP3 on Android straight from Chrome — no app, no upload, and the file stays on your phone.",
    intro:
      "Most Android \"MP3 converter\" apps want broad permissions and bury the feature under ads. You don't need any of them: mp3bat runs in Chrome on Android, converts on the phone, and saves to your Downloads.",
    steps: [
      { name: "Open Chrome", text: "Open the mp3bat converter page in Chrome (or another modern Android browser)." },
      { name: "Pick your file", text: "Tap the drop zone and select the audio file from your phone's storage or Drive." },
      { name: "Choose a bitrate", text: "Pick 320 kbps for best quality or a lower setting for a smaller file." },
      { name: "Convert", text: "Tap Convert to MP3 — encoding runs locally on your phone, inside the browser." },
      { name: "Download", text: "Tap Download to save the MP3 to your Downloads folder." },
    ],
    faqs: [
      {
        question: "Why avoid Android converter apps?",
        answer:
          "Many request sweeping permissions and run aggressive ad networks. A browser-based converter needs no install and no permissions, and with mp3bat the file never leaves your phone.",
      },
      {
        question: "Does this use my mobile data?",
        answer:
          "Only to load the page once. The conversion itself is local, so it doesn't upload or download your audio over the network.",
      },
    ],
  },
];

export function getDevice(slug: string): Device | undefined {
  return DEVICES.find((d) => d.slug === slug);
}
