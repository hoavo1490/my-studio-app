import type { Config } from "tailwindcss";
import animatePlugin from "tw-animate-css";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text-primary)",
        accent: "var(--accent)",
      },
      borderColor: {
        DEFAULT: "var(--card-border)",
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
