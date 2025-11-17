import { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeScope } from "@/components/layout/theme-scope";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/types";

interface SiteShellProps {
  children: ReactNode;
  theme?: Theme;
}

export function SiteShell({ children, theme }: SiteShellProps) {
  return (
    <div className={cn("min-h-screen bg-[var(--bg)] text-[var(--text-primary)]", theme === "DARK" && "dark")}>
      <ThemeScope theme={theme} />
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-16 md:px-10 lg:px-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
