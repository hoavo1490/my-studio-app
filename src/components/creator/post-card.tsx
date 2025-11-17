import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { postHasMedia } from "@/lib/utils";
import type { Post } from "@/lib/types";
import { PostMedia } from "./post-media";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const username = post.user?.username ?? "";
  const content = post.content ?? "";
  const hasMedia = postHasMedia(post);

  return (
    <Card className="overflow-hidden bg-[var(--bg-secondary)]/90">
      {hasMedia ? (
        <div className="overflow-hidden rounded-[28px] border border-[var(--card-border)]/70">
          <PostMedia post={post} />
        </div>
      ) : null}
      <div className="space-y-4 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">{post.type}</p>
        <h2 className="text-3xl font-semibold">{post.title ?? "Untitled"}</h2>
        {content ? (
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            {content.slice(0, 240)}
            {content.length > 240 ? "…" : ""}
          </p>
        ) : null}
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--card-border)] px-4 py-1">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <Link href={`/@/${username}/post/${post.id}`} className="inline-flex items-center text-sm font-medium text-[var(--text-primary)]">
          View post <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
