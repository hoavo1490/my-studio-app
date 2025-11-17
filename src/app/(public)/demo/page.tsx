import Image from "next/image";
import { Play } from "lucide-react";

import { SiteShell } from "@/components/layout/site-shell";

const waveformBars = [56, 36, 72, 28, 64, 48, 90, 40, 62, 32, 84, 52, 68, 30, 58, 44, 76, 34, 70, 48, 60, 28, 72, 46, 64];

type Post =
  | {
      id: string;
      type: "video";
      title: string;
      description: string;
      date: string;
      thumbnail: string;
      tag?: string;
      runtime: string;
    }
  | {
      id: string;
      type: "audio";
      title: string;
      description: string;
      date: string;
      runtime: string;
    }
  | {
      id: string;
      type: "gallery";
      title: string;
      description: string;
      date: string;
      images: string[];
    }
  | {
      id: string;
      type: "photo";
      title: string;
      description: string;
      date: string;
      image: string;
    }
  | {
      id: string;
      type: "text";
      title: string;
      description: string;
      date: string;
    };

const posts: Post[] = [
  {
    id: "pinned-film",
    type: "video",
    title: "Still Moments",
    description: "A short film exploring the space between actions.",
    date: "April 18",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    runtime: "4:52",
    tag: "Pinned Film",
  },
  {
    id: "audio-release",
    type: "audio",
    title: "New Music: \"Fading Light\"",
    description: "Exclusive track from my upcoming album.",
    date: "April 8",
    runtime: "3:24",
  },
  {
    id: "gallery-sketchbook",
    type: "gallery",
    title: "Recent Sketchbook Pages",
    description: "Sunlit studies from last week's sessions.",
    date: "March 22",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "photo-solitude",
    type: "photo",
    title: "Solitude in the City",
    description: "An intimate portrait of quiet within noise.",
    date: "March 10",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "essay-capturing",
    type: "text",
    title: "Notes on Capturing the Fleeting",
    description:
      "Lately I've been thinking about how to capture transience without melancholy. It's a challenge to hold onto something that, by its nature, is meant to disappear.",
    date: "February 28",
  },
];

export default function DemoCreatorPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl space-y-16 rounded-[48px] bg-[#fffaf2] px-6 py-16 shadow-[0px_25px_60px_rgba(15,12,9,0.08)] ring-1 ring-[#efe8dc] md:px-12">
        <header className="flex flex-col items-center text-center">
          <div className="overflow-hidden rounded-full border border-[#eee2d2] p-[2px] shadow-inner">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=640&q=80"
                alt="Portrait of Sarah Palmer"
                fill
                sizes="128px"
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1c1a17] md:text-5xl">Sarah Palmer</h1>
            <p className="text-base text-[#7a7466]">
              Photographer, musician, and painter based in New York. Exploring quiet stories across mediums.
            </p>
          </div>
        </header>
        <div className="h-px w-full bg-[#e6dfd2]" />
        <section className="space-y-14">
          {posts.map((post) => (
            <article key={post.id} className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[#b2ab9e]">{post.date}</p>
              {renderPost(post)}
            </article>
          ))}
        </section>
      </div>
    </SiteShell>
  );
}

function renderPost(post: Post) {
  switch (post.type) {
    case "video":
      return (
        <div className="space-y-6 rounded-[36px] border border-[#efe5d7] bg-white/80 p-8 shadow-[0px_22px_60px_rgba(17,14,11,0.06)]">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#a99f90]">
            <span>{post.tag}</span>
            <span>{post.runtime}</span>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={1400}
              height={800}
              className="h-[340px] w-full object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b05]/70 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
              <button
                type="button"
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-[#ba1f26] shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
                aria-label="Play video"
              >
                <Play className="h-9 w-9 fill-[#ba1f26]" />
              </button>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">Watch</p>
                <h2 className="text-2xl font-medium tracking-tight text-white">{post.title}</h2>
              </div>
            </div>
          </div>
          <p className="text-lg text-[#5f594d]">{post.description}</p>
        </div>
      );
    case "audio":
      return (
        <div className="space-y-6 rounded-[32px] border border-[#f0e8da] bg-white/90 p-8 shadow-[0px_18px_40px_rgba(16,12,9,0.05)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-[#2b2620]">{post.title}</h3>
              <p className="text-sm text-[#7f7768]">{post.description}</p>
            </div>
            <div className="text-xs uppercase tracking-[0.4em] text-[#aea593]">{post.runtime}</div>
          </div>
          <div className="flex flex-col gap-4 rounded-[28px] bg-[#f8f1e5] p-5 shadow-inner shadow-[#f4eadb]">
            <div className="flex items-center gap-4">
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f1c17] text-white" aria-label="Play audio">
                <Play className="h-6 w-6" />
              </button>
              <div className="flex-1 text-sm text-[#8f8576]">Listening window</div>
            </div>
            <Waveform />
          </div>
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-6 rounded-[32px] border border-[#eee3d3] bg-white/70 p-8 shadow-[0px_18px_40px_rgba(16,12,9,0.05)]">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#2b2620]">{post.title}</h3>
            <p className="text-sm text-[#827b6d]">{post.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {post.images.map((image, index) => (
              <div
                key={`${post.id}-${index}`}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
              >
                <Image
                  src={image}
                  alt={`${post.title} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 32vw, 180px"
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
        <div className="grid gap-8 rounded-[36px] border border-[#f0e7d7] bg-white p-8 shadow-[0px_22px_50px_rgba(20,16,12,0.07)] md:grid-cols-[1.1fr_minmax(0,1fr)] md:items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#2b2620]">{post.title}</h3>
            <p className="text-base text-[#6c6559]">{post.description}</p>
          </div>
          <div className="relative h-64 overflow-hidden rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] md:h-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      );
    case "text":
      return (
        <div className="space-y-3 rounded-[32px] border border-[#efe5d5] bg-white/70 p-8 shadow-[0px_15px_35px_rgba(15,12,9,0.05)]">
          <h3 className="text-2xl font-semibold text-[#2b2620]">{post.title}</h3>
          <p className="text-base text-[#6c6559]">{post.description}</p>
        </div>
      );
    default:
      return null;
  }
}

function Waveform() {
  return (
    <div className="flex h-16 w-full items-center gap-1">
      {waveformBars.map((height, index) => (
        <span
          key={`bar-${index}`}
          className="w-1 rounded-full bg-gradient-to-b from-[#c18e4c] via-[#a1733a] to-[#5b3a1a]"
          style={{ height: `${Math.max(18, height)}%` }}
        />
      ))}
    </div>
  );
}
