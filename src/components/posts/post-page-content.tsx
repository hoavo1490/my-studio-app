import { Calendar } from "lucide-react";
import type { Post } from "@/lib/types";
import { PostMedia } from "@/components/creator/post-media";
import { ImageLightbox } from "@/components/creator/image-lightbox";
import { postHasMedia } from "@/lib/utils";

interface Props {
  post: Post;
}

export function PostPageContent({ post }: Props) {
  const paragraphs = post.content?.split("\n").filter(Boolean) ?? [];
  const hasMedia = postHasMedia(post);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">{post.type}</p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{post.title ?? "Untitled"}</h1>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Calendar className="h-4 w-4" />
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </header>
      {post.type === "IMAGE" && post.mediaUrls && post.mediaUrls.length > 1 ? (
        <ImageLightbox images={post.mediaUrls} title={post.title} />
      ) : hasMedia ? (
        <div className="overflow-hidden rounded-[32px] border border-[var(--card-border)]/80">
          <PostMedia post={post} priority />
        </div>
      ) : null}
      {paragraphs.length ? (
        <div className="space-y-4 text-lg leading-relaxed text-[var(--text-secondary)]">
          {paragraphs.map((paragraph, index) => (
            <p key={`${paragraph}-${index}`}>{paragraph}</p>
          ))}
        </div>
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
    </article>
  );
}
