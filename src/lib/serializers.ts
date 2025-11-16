import type { Post as PrismaPost, User as PrismaUser } from "@prisma/client";
import type { Post, User } from "@/lib/types";

export function serializeUser(user: PrismaUser): User {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export function serializePost(post: PrismaPost & { user?: PrismaUser | null }): Post {
  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    mediaUrls: (post.mediaUrls as string[] | null) ?? null,
    tags: (post.tags as string[] | null) ?? null,
    user: post.user ? serializeUser(post.user) : undefined,
  };
}
