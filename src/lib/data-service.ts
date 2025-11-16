import { randomUUID } from "crypto";
import { getPrismaClient } from "@/lib/db";
import { memoryStore } from "@/lib/memory-db";
import type { Post, User, PostType } from "@/lib/types";

type UserLike = {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
  theme?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

type PostLike = {
  id: string;
  userId: string;
  type: PostType;
  title?: string | null;
  content?: string | null;
  mediaUrls?: string[] | null;
  embedUrl?: string | null;
  tags?: string[] | null;
  isPinned?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  user?: UserLike;
};

function mapUser(user: UserLike | User): User {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    bio: user.bio ?? null,
    avatarUrl: user.avatarUrl ?? null,
    theme: user.theme ?? "LIGHT",
    createdAt: user.createdAt?.toISOString?.() ?? user.createdAt,
    updatedAt: user.updatedAt?.toISOString?.() ?? user.updatedAt
  };
}

function mapPost(post: PostLike | Post): Post {
  return {
    id: post.id,
    userId: post.userId,
    type: post.type,
    title: post.title ?? null,
    content: post.content ?? null,
    mediaUrls: post.mediaUrls ?? null,
    embedUrl: post.embedUrl ?? null,
    tags: post.tags ?? null,
    isPinned: post.isPinned ?? false,
    createdAt: post.createdAt?.toISOString?.() ?? post.createdAt,
    updatedAt: post.updatedAt?.toISOString?.() ?? post.updatedAt,
    user: post.user ? mapUser(post.user) : undefined
  };
}

export async function listPublicPosts(username: string) {
  const prisma = getPrismaClient();
  if (prisma) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { posts: { orderBy: { createdAt: "desc" } } }
    });
    if (!user) return undefined;
    const mappedUser = mapUser(user);
    return {
      user: mappedUser,
      posts: user.posts.map((post) => mapPost({ ...post, user: mappedUser }))
    };
  }
  const user = memoryStore.users.find((u) => u.username === username);
  if (!user) return undefined;
  const posts = memoryStore.posts
    .filter((post) => post.userId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return { user, posts };
}

export async function listCurrentUserPosts(userId: string) {
  const prisma = getPrismaClient();
  if (prisma) {
    const posts = await prisma.post.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
    return posts.map(mapPost);
  }
  return memoryStore.posts
    .filter((post) => post.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPostById(postId: string) {
  const prisma = getPrismaClient();
  if (prisma) {
    const post = await prisma.post.findUnique({ where: { id: postId }, include: { user: true } });
    return post ? mapPost(post) : undefined;
  }
  const post = memoryStore.posts.find((p) => p.id === postId);
  if (!post) return undefined;
  const user = memoryStore.users.find((u) => u.id === post.userId);
  return { ...post, user };
}

export async function createPost(data: Post) {
  const prisma = getPrismaClient();
  if (prisma) {
    const created = await prisma.post.create({ data: { ...data, tags: data.tags ?? [], mediaUrls: data.mediaUrls ?? [] } });
    return mapPost(created);
  }
  memoryStore.posts.unshift({ ...data, id: data.id ?? randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  return memoryStore.posts[0];
}

export async function updatePost(postId: string, data: Partial<Post>) {
  const prisma = getPrismaClient();
  if (prisma) {
    const updated = await prisma.post.update({ where: { id: postId }, data });
    return mapPost(updated);
  }
  const index = memoryStore.posts.findIndex((post) => post.id === postId);
  if (index === -1) return undefined;
  memoryStore.posts[index] = { ...memoryStore.posts[index], ...data, updatedAt: new Date().toISOString() };
  return memoryStore.posts[index];
}

export async function deletePost(postId: string) {
  const prisma = getPrismaClient();
  if (prisma) {
    await prisma.post.delete({ where: { id: postId } });
    return true;
  }
  const index = memoryStore.posts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    memoryStore.posts.splice(index, 1);
    return true;
  }
  return false;
}

export async function findUserByEmail(email: string) {
  const prisma = getPrismaClient();
  if (prisma) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? mapUser(user) : undefined;
  }
  return memoryStore.users.find((user) => user.email === email);
}

export async function findUserByUsername(username: string) {
  const prisma = getPrismaClient();
  if (prisma) {
    const user = await prisma.user.findUnique({ where: { username } });
    return user ? mapUser(user) : undefined;
  }
  return memoryStore.users.find((user) => user.username === username);
}

export async function createUser(data: Omit<User, "id" | "createdAt" | "updatedAt"> & { password: string }) {
  const prisma = getPrismaClient();
  if (prisma) {
    const created = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        name: data.name,
        bio: data.bio ?? null,
        avatarUrl: data.avatarUrl ?? null,
        theme: data.theme,
        password: data.password
      }
    });
    return mapUser(created);
  }
  const user: User = {
    id: randomUUID(),
    email: data.email,
    username: data.username,
    name: data.name,
    bio: data.bio ?? null,
    avatarUrl: data.avatarUrl ?? null,
    theme: data.theme,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  memoryStore.users.push(user);
  memoryStore.passwords[user.id] = data.password;
  return user;
}

export async function updateUser(userId: string, data: Partial<User>) {
  const prisma = getPrismaClient();
  if (prisma) {
    const updated = await prisma.user.update({ where: { id: userId }, data });
    return mapUser(updated);
  }
  const index = memoryStore.users.findIndex((user) => user.id === userId);
  if (index === -1) return undefined;
  memoryStore.users[index] = { ...memoryStore.users[index], ...data, updatedAt: new Date().toISOString() };
  return memoryStore.users[index];
}

export async function findUserCredentialsByEmail(email: string) {
  const prisma = getPrismaClient();
  if (prisma) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return undefined;
    return { user: mapUser(user), password: user.password };
  }
  const user = memoryStore.users.find((candidate) => candidate.email === email);
  if (!user) return undefined;
  return { user, password: memoryStore.passwords[user.id] };
}
