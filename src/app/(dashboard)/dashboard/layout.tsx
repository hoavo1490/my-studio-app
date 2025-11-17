import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ThemeScope } from "@/components/layout/theme-scope";
import { cn } from "@/lib/utils";
import { DashboardNav } from "@/components/layout/dashboard-nav";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className={cn(user.theme === "DARK" && "dark")}>
      <ThemeScope theme={user.theme} />
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
        <div className="border-b border-[var(--divider)]/70 bg-[var(--bg)]/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-secondary)]">Studio</p>
              <p className="text-sm text-[var(--text-secondary)]">Signed in as {user.name}</p>
            </div>
            <DashboardNav />
          </div>
        </div>
        <div className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">{children}</div>
      </div>
    </div>
  );
}
