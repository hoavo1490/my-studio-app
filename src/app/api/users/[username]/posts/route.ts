import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serializePost, serializeUser } from "@/lib/serializers";

export async function GET(
  _request: Request,
  { params }: { params: { username: string } }
) {
  const user = await prisma.user.findUnique({ where: { username: params.username } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ user: serializeUser(user), posts: posts.map((post) => serializePost(post)) });
}
