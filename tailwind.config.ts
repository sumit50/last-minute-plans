import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-base)",
        foreground: "var(--fg-main)",
        card: {
          DEFAULT: "var(--surface-card)",
          foreground: "var(--fg-main)",
        },
        acid: {
          lime: "#C8FF00",
          yellow: "#E6FF00",
          blue: "#0055FF",
          purple: "#7C5CFF",
          pink: "#FF2A85",
        },
        border: "var(--border-theme)",
        muted: {
          DEFAULT: "var(--surface-secondary)",
          foreground: "var(--muted-text)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        'brutal': '3px 3px 0px var(--shadow-color)',
        'brutal-sm': '2px 2px 0px var(--shadow-color)',
        'brutal-lime': '3px 3px 0px #C8FF00',
        'brutal-pink': '3px 3px 0px #FF2A85',
        'brutal-purple': '3px 3px 0px #7C5CFF',
      },
    },
  },
  plugins: [],
};
export default config;
