import { NextResponse } from "next/server";
import { hashPassword, createSession } from "@/lib/auth";
import { createUser, findUserByEmail, findUserByUsername } from "@/lib/data-service";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, username, name } = body;
  if (!email || !password || !username || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }
  const usernameTaken = await findUserByUsername(username);
  if (usernameTaken) {
    return NextResponse.json({ error: "Username taken" }, { status: 400 });
  }
  const hashed = await hashPassword(password);
  const user = await createUser({ email, username, name, theme: "LIGHT", password: hashed });
  createSession(user);
  return NextResponse.json({ user });
}
