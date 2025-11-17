import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    title: "Mixed Media",
    body: "Images, galleries, video, audio, text — all in one quiet feed.",
  },
  {
    title: "Artist-Owned",
    body: "No noise, no metrics. Just your work and your space.",
  },
  {
    title: "Simple Dashboard",
    body: "Upload from anywhere. Edit your profile in seconds.",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <div className="space-y-24">
        <section className="space-y-8 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-[var(--text-secondary)]">CREATOR-OWNED</p>
          <div className="space-y-6">
            <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
              Your quiet studio on the web.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
              Publish photographs, sketches, mixes, and notes into a moody feed that feels like your practice — no likes, no
              algorithms, just your work.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Button asChild>
              <Link href="/register">Claim your studio</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/@/demo">See a sample creator</Link>
            </Button>
          </div>
        </section>
        <Separator />
        <section className="space-y-16">
          {features.map((feature, index) => (
            <div key={feature.title} className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">0{index + 1}</p>
              <h3 className="text-3xl font-semibold">{feature.title}</h3>
              <p className="mx-auto max-w-3xl text-lg text-[var(--text-secondary)]">{feature.body}</p>
              {index < features.length - 1 ? <Separator className="mx-auto max-w-[220px] opacity-70" /> : null}
            </div>
          ))}
        </section>
      </div>
    </SiteShell>
  );
}
