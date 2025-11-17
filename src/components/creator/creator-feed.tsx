import type { Post } from "@/lib/types";
import { PostCard } from "./post-card";

interface Props {
  posts: Post[];
}

export function CreatorFeed({ posts }: Props) {
  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[var(--card-border)]/80 px-10 py-16 text-center text-sm text-[var(--text-secondary)]">
        Nothing yet. When this artist publishes, their work will appear right here.
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
