import type { Post, User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { PostMedia } from "@/components/creator/post-media";
import { sanitizeText } from "@/lib/sanitize";

interface PostPageContentProps {
  post: Post;
  user: User;
}

export function PostPageContent({ post, user }: PostPageContentProps) {
  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">@{user.username}</p>
        <h1 className="text-4xl font-semibold">{post.title ?? "Untitled"}</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          {new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
      {post.type !== "TEXT" && <PostMedia post={post} variant="full" />}
      {post.content && (
        <div
          className="max-w-none text-lg leading-relaxed text-[var(--text-secondary)]"
          dangerouslySetInnerHTML={{ __html: sanitizeText(post.content) }}
        />
      )}
      {!!(post.tags?.length ?? 0) && (
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag}>#{tag}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
