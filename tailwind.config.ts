import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07070f",
        surface: "rgba(255,255,255,0.045)",
        muted: "rgba(255,255,255,0.07)",
        line: "rgba(255,255,255,0.14)",
        "line-soft": "rgba(255,255,255,0.08)",
        ink: "#f2f2fa",
        "ink-dim": "#a6a8c2",
        "ink-faint": "#6e7191",
        accent: "#a78bfa",
        violet: "#8b5cf6",
        fuchsia: "#e879f9",
        cyan: "#22d3ee",
      },
      fontFamily: {
        mono: ["var(--font-jbmono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px -6px rgba(139, 92, 246, 0.55)",
        "glow-cyan": "0 0 28px -6px rgba(34, 211, 238, 0.45)",
        "glass-inset": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(139,92,246,0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(139,92,246,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(139,92,246,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "gradient-x": "gradient-x 6s ease infinite",
        floaty: "floaty 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
