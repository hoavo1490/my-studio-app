import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { getCurrentSession } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = getCurrentSession();
  return (
    <div className={user?.theme === "DARK" ? "dark" : undefined}>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar />
        <div className="bg-[var(--bg)] p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
