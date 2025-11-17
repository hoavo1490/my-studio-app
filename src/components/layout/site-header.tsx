import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-transparent bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm md:px-10 lg:px-24">
        <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-[var(--text-secondary)]">
          duskroom
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/@/demo" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            Sample space
          </Link>
          <Link href="/login" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            Sign in
          </Link>
          <Button asChild size="sm">
            <Link href="/register">Claim studio</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
