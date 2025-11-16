import Link from "next/link";
import type { Post } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostMedia } from "@/components/creator/post-media";
import { sanitizeText } from "@/lib/sanitize";

interface PostCardProps {
  post: Post;
  minimal?: boolean;
}

export function PostCard({ post, minimal = false }: PostCardProps) {
  const href = `/@/${post.user?.username ?? "duskroom"}/post/${post.id}`;
  const tags = post.tags ?? [];

  return (
    <Link href={href} className="block">
      <Card className="overflow-hidden">
        {post.type !== "TEXT" && <PostMedia post={post} />}
        <CardContent className="space-y-3">
          {post.title && <h3 className="text-xl font-semibold">{post.title}</h3>}
          {post.content && !minimal && (
            <p
              className="text-[var(--text-secondary)]"
              dangerouslySetInnerHTML={{ __html: sanitizeText(post.content).slice(0, 220) }}
            />
          )}
          {!!tags.length && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag}>#{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
