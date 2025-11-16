import { cookies } from "next/headers";
import { randomUUID, createHash, randomBytes, timingSafeEqual } from "crypto";
import { memoryStore } from "@/lib/memory-db";
import type { User } from "@/lib/types";

const SESSION_COOKIE = "duskroom_session";

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashed = createHash("sha256").update(salt + password).digest("hex");
  return `${salt}:${hashed}`;
}

export async function verifyPassword(password: string, hashed: string) {
  const [salt, digest] = hashed.split(":");
  if (!salt || !digest) return false;
  const comparison = createHash("sha256").update(salt + password).digest("hex");
  const left = Buffer.from(digest);
  const right = Buffer.from(comparison);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function getCurrentSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return undefined;
  const userId = memoryStore.sessions[token];
  if (!userId) return undefined;
  return memoryStore.users.find((user) => user.id === userId);
}

export function requireAuth() {
  const user = getCurrentSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export function createSession(user: User) {
  const token = randomUUID();
  memoryStore.sessions[token] = user.id;
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production"
  });
}

export function destroySession() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    delete memoryStore.sessions[token];
  }
  cookieStore.delete(SESSION_COOKIE);
}
