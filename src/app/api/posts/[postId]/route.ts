import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { serializePost } from "@/lib/serializers";
import { postSchema } from "@/lib/validators/post-schema";

export async function GET(
  _request: Request,
  { params }: { params: { postId: string } }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const post = await prisma.post.findFirst({ where: { id: params.postId, userId: user.id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post: serializePost(post) });
}

export async function PATCH(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const json = await request.json();
  const payload = postSchema.extend({ isPinned: postSchema.shape.isPinned }).partial().parse(json);
  const existing = await prisma.post.findFirst({ where: { id: params.postId, userId: user.id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const finalType = (payload.type ?? existing.type) as any;
  const finalMedia = payload.mediaUrls ?? ((existing.mediaUrls as string[] | null) ?? null);
  const finalEmbed = payload.embedUrl ?? existing.embedUrl;
  if (finalType === "IMAGE" && !finalMedia?.length) {
    return NextResponse.json({ error: "Image posts require media" }, { status: 400 });
  }
  if ((finalType === "VIDEO" || finalType === "AUDIO") && !finalMedia?.length && !finalEmbed) {
    return NextResponse.json({ error: "Video/Audio posts need media or embed" }, { status: 400 });
  }
  const post = await prisma.post.update({
    where: { id: params.postId, userId: user.id },
    data: payload,
  });
  return NextResponse.json({ post: serializePost(post) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { postId: string } }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.post.deleteMany({ where: { id: params.postId, userId: user.id } });
  return NextResponse.json({ ok: true });
}
