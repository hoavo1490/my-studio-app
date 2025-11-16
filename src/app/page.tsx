import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const features = [
    {
      title: "Creator-owned",
      description: "A single feed for your audio, film, writing, and still work. No algorithmic noise."
    },
    {
      title: "Studio-ready dashboard",
      description: "Publish multi-format posts, edit quickly, and keep your pinned piece in view."
    },
    {
      title: "Atmospheric themes",
      description: "Toggle between light and dark to mirror the tone of your practice."
    }
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
      <section className="space-y-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">Studio platform</p>
        <h1 className="text-5xl font-semibold">duskroom</h1>
        <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
          A moody, cinematic home for indie creators to publish image, video, audio, and text in one atmospheric feed.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/dashboard">
            <Button>Launch your studio</Button>
          </Link>
          <Link href="/@/duskroom">
            <Button variant="outline">View demo page</Button>
          </Link>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-[var(--bg-secondary)]/60">
            <CardContent className="space-y-2">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
