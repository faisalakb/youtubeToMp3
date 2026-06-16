import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        panel: "var(--panel)",
        "panel-2": "var(--panel-2)",
        line: "var(--line)",
        text: "var(--text)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        trust: "var(--trust)",
        "trust-deep": "var(--trust-deep)",
        action: "var(--action)",
        "action-deep": "var(--action-deep)",
        paper: "var(--paper)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      maxWidth: {
        readable: "760px",
      },
    },
  },
  plugins: [],
};

export default config;
