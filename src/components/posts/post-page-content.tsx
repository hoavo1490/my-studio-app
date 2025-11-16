import { Calendar } from "lucide-react";
import type { Post } from "@/lib/types";
import { PostMedia } from "@/components/creator/post-media";
import { ImageLightbox } from "@/components/creator/image-lightbox";

interface Props {
  post: Post;
}

export function PostPageContent({ post }: Props) {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">{post.type}</p>
        <h1 className="text-4xl font-semibold text-[var(--text-primary)]">{post.title ?? "Untitled"}</h1>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Calendar className="h-4 w-4" />
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </header>
      {post.type === "IMAGE" && post.mediaUrls && post.mediaUrls.length > 1 ? (
        <ImageLightbox images={post.mediaUrls} title={post.title} />
      ) : (
        <PostMedia post={post} priority />
      )}
      {post.content ? <p className="text-lg leading-relaxed text-[var(--text-secondary)]">{post.content}</p> : null}
      {post.tags?.length ? (
        <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[var(--card-border)] px-4 py-1">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
