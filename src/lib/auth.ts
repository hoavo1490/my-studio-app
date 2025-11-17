import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/db";
import { serializeUser } from "@/lib/serializers";

const SESSION_COOKIE = "duskroom_session";
const ALGORITHM = "HS256";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession(req?: NextRequest) {
  const store = req ? req.cookies : await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { userId: string };
  } catch (error) {
    console.error("Failed to verify session", error);
    return null;
  }
}

export async function getCurrentUser(req?: NextRequest) {
  const session = await getSession(req);
  if (!session?.userId) return null;
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  return user ? serializeUser(user) : null;
}
