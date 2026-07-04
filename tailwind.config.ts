import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0F172A",
        surface: "#1E293B",
        muted: "#272F42",
        line: "#334155",
        "line-soft": "#1E2A3D",
        ink: "#F8FAFC",
        "ink-dim": "#94A3B8",
        "ink-faint": "#64748B",
        accent: "#22C55E",
        "accent-dim": "#16A34A",
      },
      fontFamily: {
        mono: ["var(--font-fira-code)", "monospace"],
        sans: ["var(--font-fira-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(34, 197, 94, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        blink: "blink 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
