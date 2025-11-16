import { randomUUID, randomBytes, createHash } from "crypto";
import type { Post, User } from "@/lib/types";
import { parseEmbedUrl } from "@/lib/embeds";

type SessionStore = Record<string, string>;

type MemoryStore = {
  users: User[];
  posts: Post[];
  passwords: Record<string, string>;
  sessions: SessionStore;
};

const defaultUserId = randomUUID();

const seededPosts: Post[] = [
  {
    id: randomUUID(),
    userId: defaultUserId,
    type: "IMAGE",
    title: "Duskroom Studies",
    content: "Shot these on a rainy night in Brooklyn. The grain is intentional.",
    mediaUrls: ["https://images.unsplash.com/photo-1469474968028-56623f02e42e"],
    tags: ["photography", "noir"],
    isPinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    userId: defaultUserId,
    type: "VIDEO",
    title: "Process Reel",
    content: "Test footage from the short film I'm editing.",
    mediaUrls: ["https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"],
    tags: ["film", "process"],
    isPinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    userId: defaultUserId,
    type: "AUDIO",
    title: "Late Night Loop",
    content: "Ableton sketch recorded at 2am.",
    embedUrl: parseEmbedUrl("https://soundcloud.com/forss/flickermood").embedUrl,
    tags: ["audio", "loop"],
    isPinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    userId: defaultUserId,
    type: "TEXT",
    title: "Production Notes",
    content: "Writing up how I build atmospheres for each scene.",
    tags: ["writing"],
    isPinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const memoryStore: MemoryStore = {
  users: [
    {
      id: defaultUserId,
      email: "artist@duskroom.dev",
      username: "duskroom",
      name: "Duskroom",
      bio: "Indie filmmaker and sound designer crafting moody nocturnal stories.",
      avatarUrl: null,
      theme: "DARK",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  posts: seededPosts,
  passwords: {
    [defaultUserId]: (() => {
      const salt = randomBytes(16).toString("hex");
      const hashed = createHash("sha256").update(salt + "duskroom").digest("hex");
      return `${salt}:${hashed}`;
    })()
  },
  sessions: {}
};
