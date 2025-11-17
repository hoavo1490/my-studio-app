import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { postHasMedia } from "@/lib/utils";
import type { Post } from "@/lib/types";
import { PostMedia } from "./post-media";

interface Props {
  post: Post;
}

export function PinnedPost({ post }: Props) {
  const hasMedia = postHasMedia(post);

  return (
    <Card className="overflow-hidden border-[var(--divider)]/70 bg-[var(--bg-secondary)]/80">
      <div className="space-y-5 px-6 py-6">
        <Badge variant="outline" className="w-fit">
          Pinned
        </Badge>
        {hasMedia ? (
          <div className="overflow-hidden rounded-[28px] border border-[var(--card-border)]/80">
            <PostMedia post={post} />
          </div>
        ) : null}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">{post.type}</p>
          <Link href={`/@/${post.user?.username ?? ""}/post/${post.id}`} className="text-2xl font-semibold">
            {post.title ?? "Untitled"}
          </Link>
          {post.content ? (
            <p className="text-[var(--text-secondary)]">
              {post.content.slice(0, 160)}
              {(post.content?.length ?? 0) > 160 ? "…" : ""}
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
