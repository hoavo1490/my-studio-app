import Link from "next/link";
import type { Post } from "@/lib/types";
import { PostCard } from "@/components/creator/post-card";

interface PinnedPostProps {
  post: Post;
}

export function PinnedPost({ post }: PinnedPostProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--card-border)] bg-[var(--bg-secondary)]/60 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Pinned</p>
      <Link href={`/@/${post.user?.username ?? ""}/post/${post.id}`} className="block pt-4">
        <PostCard post={post} minimal />
      </Link>
    </div>
  );
}
