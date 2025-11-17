import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Post } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function postHasMedia(post: Pick<Post, "type" | "mediaUrls" | "embedUrl">) {
  if (post.type === "TEXT") {
    return false;
  }
  return Boolean(post.mediaUrls?.length) || Boolean(post.embedUrl);
}
