"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-xl px-4 py-2 text-sm ${pathname === link.href ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="border-r border-[var(--card-border)] bg-[var(--bg-secondary)]">
      <div className="flex items-center justify-between border-b border-[var(--card-border)] p-4 lg:hidden">
        <span className="font-semibold">duskroom</span>
        <Button variant="ghost" onClick={() => setIsOpen((prev) => !prev)}>
          Menu
        </Button>
      </div>
      <div className="hidden h-full flex-col gap-8 p-6 lg:flex">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Studio</p>
          <h2 className="text-2xl font-semibold">duskroom</h2>
        </div>
        {nav}
      </div>
      {isOpen && <div className="p-4 lg:hidden">{nav}</div>}
    </div>
  );
}
