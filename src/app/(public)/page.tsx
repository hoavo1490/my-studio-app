import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <div className="space-y-16">
        <section className="space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-secondary)]">Creator-owned</p>
        <h1 className="text-5xl font-semibold leading-tight">duskroom is your quiet studio on the web.</h1>
        <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
          Publish photographs, mixes, sketches, and notes in a moody feed that feels like your practice—no algorithms, no likes,
          just your work.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <Button asChild className="px-8 py-6 text-lg">
            <Link href="/register">Claim your room</Link>
          </Button>
          <Button asChild variant="outline" className="px-8 py-6 text-lg">
            <Link href="/@/demo">See a sample page</Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Image, video, audio, text",
            body: "One feed that gracefully mixes photography, clips, tracks, and notes.",
          },
          {
            title: "Artist-owned",
            body: "Custom theme, pinned work, and a bio that sets the mood.",
          },
          {
            title: "Dashboard",
            body: "Upload media, embed from anywhere, and edit your profile in seconds.",
          },
        ].map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-[var(--text-secondary)]">{feature.body}</p>
          </div>
        ))}
      </section>
      </div>
    </SiteShell>
  );
}
