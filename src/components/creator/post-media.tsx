"use client";

import { useMemo } from "react";
import type { Post } from "@/lib/types";
import { parseEmbedUrl } from "@/lib/embeds";

interface PostMediaProps {
  post: Post;
  variant?: "feed" | "full";
}

export function PostMedia({ post, variant = "feed" }: PostMediaProps) {
  const parsedEmbed = useMemo(() => {
    if (!post.embedUrl) return null;
    return parseEmbedUrl(post.embedUrl);
  }, [post.embedUrl]);
  if (post.type === "TEXT") return null;
  const media = post.mediaUrls ?? [];

  if (post.type === "IMAGE" && media.length > 0) {
    if (media.length === 1) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media[0]}
          alt={post.title ?? "Artwork"}
          className={`w-full object-cover ${variant === "full" ? "h-[480px]" : "h-80"}`}
        />
      );
    }
    return (
      <div className="grid grid-cols-2 gap-2 p-2">
        {media.slice(0, 4).map((url, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt={`${post.title ?? "Gallery"} ${index + 1}`}
            className="h-40 w-full rounded-xl object-cover"
          />
        ))}
        {media.length > 4 && (
          <div className="flex h-40 items-center justify-center rounded-xl bg-black/60 text-white">
            +{media.length - 4}
          </div>
        )}
      </div>
    );
  }

  if ((post.type === "VIDEO" || post.type === "AUDIO") && parsedEmbed) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={parsedEmbed.embedUrl}
          className="h-full w-full"
          allow="autoplay; fullscreen"
          title={post.title ?? "Embedded media"}
          loading="lazy"
        />
      </div>
    );
  }

  if (post.type === "VIDEO" && media.length > 0) {
    return (
      <video controls className="h-80 w-full object-cover" src={media[0]}>
        Your browser does not support video playback.
      </video>
    );
  }

  if (post.type === "AUDIO" && media.length > 0) {
    return (
      <div className="p-4">
        <audio controls className="w-full">
          <source src={media[0]} />
        </audio>
      </div>
    );
  }

  return null;
}
