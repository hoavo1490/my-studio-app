import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { serializePost } from "@/lib/serializers";
import { postSchema, type PostInput } from "@/lib/validators/post-schema";

function validateType(payload: PostInput) {
  if (payload.type === "IMAGE" && !payload.mediaUrls?.length) {
    return "Image posts require media urls";
  }
  if ((payload.type === "VIDEO" || payload.type === "AUDIO") && !payload.mediaUrls?.length && !payload.embedUrl) {
    return "Video/Audio posts require a file or embed URL";
  }
  return null;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await prisma.post.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ posts: posts.map((post) => serializePost(post)) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const json = await request.json();
  const payload = postSchema.parse(json);
  const error = validateType(payload);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  const post = await prisma.post.create({ data: { ...payload, userId: user.id } });
  return NextResponse.json({ post: serializePost(post) }, { status: 201 });
}
