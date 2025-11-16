import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { PostMedia } from "./post-media";

interface Props {
  post: Post;
}

export function PinnedPost({ post }: Props) {
  return (
    <Card className="overflow-hidden border-dashed">
      <CardContent className="p-4">
        <Badge className="mb-3">Pinned</Badge>
        <div className="space-y-3">
          <PostMedia post={post} />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">{post.type}</p>
            <Link href={`/@/${post.user?.username ?? ""}/post/${post.id}`} className="text-lg font-semibold">
              {post.title ?? "Untitled"}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
