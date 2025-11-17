import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";
import { parseEmbedUrl } from "@/lib/embeds";

interface Props {
  post: Post;
  priority?: boolean;
}

export function PostMedia({ post, priority }: Props) {
  if (post.type === "IMAGE" && post.mediaUrls?.length) {
    const [first, ...rest] = post.mediaUrls;
    return (
      <div className={cn("relative w-full", rest.length ? "grid grid-cols-2 gap-4 bg-[var(--bg)]/60 p-4" : "")}>
        {rest.length ? (
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {[first, ...rest.slice(0, 3)].map((url, index) => (
              <div key={url} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={url}
                  alt={post.title ?? "Artwork"}
                  fill
                  className="object-cover"
                  priority={priority && index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {index === 3 && post.mediaUrls!.length > 4 ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                    +{post.mediaUrls!.length - 4}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="relative aspect-[5/4] w-full">
            <Image
              src={first}
              alt={post.title ?? "Artwork"}
              fill
              className="object-cover"
              priority={priority}
              sizes="100vw"
            />
          </div>
        )}
      </div>
    );
  }

  if (post.type === "VIDEO") {
    if (post.embedUrl) {
      const embed = parseEmbedUrl(post.embedUrl);
      return (
        <div className="aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={embed.embedUrl}
            className="h-full w-full"
            title={post.title ?? "Embedded video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    if (post.mediaUrls?.[0]) {
      return (
        <video controls className="aspect-video w-full bg-black">
          <source src={post.mediaUrls[0]} />
        </video>
      );
    }
  }

  if (post.type === "AUDIO") {
    if (post.embedUrl) {
      const embed = parseEmbedUrl(post.embedUrl);
      return (
        <div className="w-full overflow-hidden bg-black/5">
          <iframe
            src={embed.embedUrl}
            className="h-32 w-full"
            title={post.title ?? "Embedded audio"}
            allow="autoplay"
          />
        </div>
      );
    }
    if (post.mediaUrls?.[0]) {
      return (
        <div className="w-full bg-[var(--bg-secondary)] p-4">
          <audio controls className="w-full">
            <source src={post.mediaUrls[0]} />
          </audio>
        </div>
      );
    }
  }

  return null;
}
