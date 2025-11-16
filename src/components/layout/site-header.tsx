import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="w-full border-b border-[var(--card-border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          duskroom
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/login" className="text-[var(--text-secondary)]">
            Sign in
          </Link>
          <Button asChild>
            <Link href="/register">Join</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
