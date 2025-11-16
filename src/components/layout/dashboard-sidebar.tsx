"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

function SidebarLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            pathname === link.href ? "bg-[var(--card-border)]/60 text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function DashboardSidebar() {
  return (
    <>
      <div className="hidden w-64 border-r border-[var(--card-border)] bg-[var(--bg-secondary)] px-4 py-6 md:block">
        <p className="mb-6 text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-[0.2em]">
          Dashboard
        </p>
        <SidebarLinks />
      </div>
      <div className="border-b border-[var(--card-border)] bg-[var(--bg-secondary)] p-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="mr-2 h-4 w-4" /> Menu
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SidebarLinks />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
