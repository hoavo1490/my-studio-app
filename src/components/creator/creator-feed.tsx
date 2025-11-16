import type { Post } from "@/lib/types";
import { PostCard } from "./post-card";

interface Props {
  posts: Post[];
}

export function CreatorFeed({ posts }: Props) {
  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[var(--card-border)] p-10 text-center text-sm text-[var(--text-secondary)]">
        Nothing yet. When this artist publishes, their work will appear here.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
