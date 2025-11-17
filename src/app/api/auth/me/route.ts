import { NextResponse } from "next/server";
import { destroySession, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serializeUser } from "@/lib/serializers";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  const updated = await prisma.user.update({
    where: { id: sessionUser.id },
    data: {
      name: data.name ?? sessionUser.name,
      bio: data.bio ?? sessionUser.bio,
      avatarUrl: data.avatarUrl ?? sessionUser.avatarUrl,
      theme: data.theme ?? sessionUser.theme,
    },
  });
  return NextResponse.json({ user: serializeUser(updated) });
}

export async function DELETE() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.post.deleteMany({ where: { userId: sessionUser.id } });
  await prisma.user.delete({ where: { id: sessionUser.id } });
  await destroySession();
  return NextResponse.json({ ok: true });
}
