import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/types";
import { PostMedia } from "./post-media";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const username = post.user?.username ?? "";
  return (
    <Card className="overflow-hidden">
      <PostMedia post={post} />
      <CardHeader className="gap-2">
        <Badge variant="outline">{post.type}</Badge>
        <CardTitle className="text-2xl text-[var(--text-primary)]">{post.title ?? "Untitled"}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {post.content ? (
          <p className="text-[var(--text-secondary)]">{post.content.slice(0, 220)}{post.content.length > 220 ? "…" : ""}</p>
        ) : null}
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--card-border)] px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <Link
          href={`/@/${username}/post/${post.id}`}
          className="inline-flex items-center text-sm font-medium text-[var(--text-primary)]"
        >
          View post <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
