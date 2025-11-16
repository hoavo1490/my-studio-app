import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { deletePost, getPostById, updatePost } from "@/lib/data-service";
import { validatePartialPostPayload } from "@/lib/validators/post-schema";

interface Params {
  params: { postId: string };
}

export async function GET(_: Request, { params }: Params) {
  const user = getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const post = await getPostById(params.postId);
  if (!post || post.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: Params) {
  const user = getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const existing = await getPostById(params.postId);
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = await request.json();
  const parsed = validatePartialPostPayload(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.errors }, { status: 400 });
  }
  const updates = Object.fromEntries(
    Object.entries(parsed.data).filter(([, value]) => value !== undefined)
  );
  const updated = await updatePost(params.postId, { ...updates, updatedAt: new Date().toISOString() });
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post: updated });
}

export async function DELETE(_: Request, { params }: Params) {
  const user = getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const post = await getPostById(params.postId);
  if (!post || post.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await deletePost(params.postId);
  return NextResponse.json({ success: true });
}
