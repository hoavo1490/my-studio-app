import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { listCurrentUserPosts, createPost } from "@/lib/data-service";
import { validatePostPayload } from "@/lib/validators/post-schema";

export async function GET() {
  const user = getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await listCurrentUserPosts(user.id);
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const user = getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const parsed = validatePostPayload(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.errors }, { status: 400 });
  }
  const post = await createPost({
    id: randomUUID(),
    userId: user.id,
    type: parsed.data.type,
    title: parsed.data.title ?? null,
    content: parsed.data.content ?? null,
    mediaUrls: parsed.data.mediaUrls ?? [],
    embedUrl: parsed.data.embedUrl ?? null,
    tags: parsed.data.tags ?? [],
    isPinned: parsed.data.isPinned ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return NextResponse.json({ post });
}
