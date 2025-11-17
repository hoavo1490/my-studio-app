"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-4 text-sm">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "border-b border-transparent pb-1 text-[var(--text-secondary)] transition-colors",
              active && "border-[var(--text-primary)] text-[var(--text-primary)]"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
