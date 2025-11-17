import type { Config } from "tailwindcss";

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
  plugins: [],
};

export default config;
