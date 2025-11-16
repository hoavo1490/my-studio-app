import type { Post } from "@/lib/types";
import { PostCard } from "@/components/creator/post-card";

interface CreatorFeedProps {
  posts: Post[];
}

export function CreatorFeed({ posts }: CreatorFeedProps) {
  if (!posts.length) {
    return <p className="text-center text-[var(--text-secondary)]">No posts yet.</p>;
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
