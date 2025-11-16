import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--card-border)] bg-[var(--bg-secondary)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          duskroom
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/@/duskroom">
            <Button variant="ghost">Explore demo</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Launch Studio</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
