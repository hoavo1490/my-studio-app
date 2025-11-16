import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { cn } from "@/lib/utils";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className={cn(user.theme === "DARK" && "dark")}> 
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 px-6 py-8">
            <header className="mb-8">
              <p className="text-sm text-[var(--text-secondary)]">Signed in as {user.name}</p>
              <h1 className="text-3xl font-semibold">Dashboard</h1>
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
