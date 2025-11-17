import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { serializeUser } from "@/lib/serializers";

export async function POST(request: Request) {
  const { email, password, username, name } = await request.json();
  if (!email || !password || !username || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      username,
      name,
    },
  });

  await createSession(user.id);

  return NextResponse.json({ user: serializeUser(user) }, { status: 201 });
}
