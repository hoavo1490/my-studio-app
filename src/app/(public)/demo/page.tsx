import Image from "next/image";
import { Play } from "lucide-react";

import { SiteShell } from "@/components/layout/site-shell";

const posts = [
  {
    id: "pinned-film",
    type: "video" as const,
    label: "Pinned",
    date: "April 12",
    title: "Still Moments",
    description: "A short film exploring the space between actions.",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    runtime: "4:52",
  },
  {
    id: "audio-release",
    type: "audio" as const,
    date: "April 8",
    title: "New Music: \"Fading Light\"",
    description: "Exclusive track from my upcoming album.",
    runtime: "3:24",
  },
  {
    id: "gallery-sketchbook",
    type: "gallery" as const,
    date: "March 22",
    title: "Recent Sketchbook Pages",
    description: "Sunlit studies from last week's sessions.",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "photo-solitude",
    type: "photo" as const,
    date: "March 10",
    title: "Solitude in the City",
    description: "An intimate portrait of quiet within noise.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "essay-capturing",
    type: "text" as const,
    date: "February 28",
    title: "Notes on Capturing the Fleeting",
    description:
      "Lately I've been thinking about how to capture transience without melancholy. It's a challenge to hold onto something that, by its nature, is meant to disappear.",
  },
];

type Post = (typeof posts)[number];

export default function DemoCreatorPage() {
  return (
    <SiteShell>
      <main className="min-h-screen bg-[#f7f4ee] px-4 py-16 text-[#1f1d19]">
        <div className="mx-auto max-w-2xl space-y-10">
          <header className="flex flex-col items-center text-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[#f1e9dd] bg-white shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=640&q=80"
                alt="Portrait of Sarah Palmer"
                fill
                sizes="112px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-6 space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-[#14110f]">Sarah Palmer</h1>
              <p className="text-base text-[#6f6a61]">
                Photographer, musician, and painter. Based in New York.
              </p>
            </div>
          </header>
          <div className="h-px w-full bg-[#e2ddd4]" />
          <section className="space-y-14">
            {posts.map((post) => (
              <article key={post.id} className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b0aba2]">
                  {post.label ?? post.date}
                </p>
                {renderPost(post)}
              </article>
            ))}
          </section>
        </div>
      </main>
    </SiteShell>
  );
}

function renderPost(post: Post) {
  switch (post.type) {
    case "video":
      return (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-black shadow-lg">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={1400}
              height={800}
              className="h-[340px] w-full object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-white">
              <button
                type="button"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#cf000f] shadow-md"
                aria-label="Play video"
              >
                <Play className="h-7 w-7 fill-[#cf000f]" />
              </button>
              <h2 className="text-2xl font-semibold tracking-tight">{post.title}</h2>
            </div>
          </div>
          <p className="text-base text-[#58544b]">{post.description}</p>
        </div>
      );
    case "audio":
      return (
        <div className="space-y-3 rounded-3xl border border-[#e7e2da] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold text-[#1f1d19]">{post.title}</h3>
            <p className="text-sm text-[#6d675d]">{post.description}</p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl bg-[#f4f1ea] p-4">
            <div className="flex items-center gap-4 text-[#403c36]">
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1d19] text-white"
                aria-label="Play audio"
              >
                <Play className="h-5 w-5" />
              </button>
              <span className="text-sm uppercase tracking-[0.25em] text-[#a29d95]">{post.runtime}</span>
            </div>
            <Waveform />
          </div>
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-[#1f1d19]">{post.title}</h3>
          <p className="text-sm text-[#6d675d]">{post.description}</p>
          <div className="flex gap-3">
            {post.images.map((image, index) => (
              <div key={`${post.id}-${index}`} className="relative aspect-square w-24 overflow-hidden rounded-xl bg-[#f2ede3]">
                <Image
                  src={image}
                  alt={`${post.title} ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      );
    case "photo":
      return (
        <div className="grid gap-6 rounded-3xl border border-[#e7e2da] bg-white p-6 shadow-sm md:grid-cols-[minmax(0,1fr)_0.8fr]">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#1f1d19]">{post.title}</h3>
            <p className="text-sm text-[#5d574f]">{post.description}</p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      );
    case "text":
      return (
        <div className="space-y-3 rounded-3xl border border-[#e7e2da] bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#1f1d19]">{post.title}</h3>
          <p className="text-sm leading-relaxed text-[#5d574f]">{post.description}</p>
        </div>
      );
    default:
      return null;
  }
}

const waveformBars = [
  48, 26, 60, 18, 56, 42, 80, 34, 62, 24, 72, 40, 58, 20, 52, 38, 66, 22, 60, 44, 50,
];

function Waveform() {
  return (
    <div className="flex h-16 w-full items-end gap-[3px]">
      {waveformBars.map((height, index) => (
        <span
          key={`bar-${index}`}
          className="w-1 rounded-full bg-gradient-to-b from-[#b4aea5] via-[#8f8a82] to-[#5b564f]"
          style={{ height: `${Math.max(18, height)}%` }}
        />
      ))}
    </div>
  );
}
