import { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/types";

interface SiteShellProps {
  children: ReactNode;
  theme?: Theme;
}

export function SiteShell({ children, theme }: SiteShellProps) {
  return (
    <div className={cn("min-h-screen bg-[var(--bg)] text-[var(--text-primary)]", theme === "DARK" && "dark")}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
      <SiteFooter />
    </div>
  );
}
