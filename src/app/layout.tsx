import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "duskroom",
  description: "Creator-owned studio pages for indie artists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text-primary)]">{children}</body>
    </html>
  );
}
