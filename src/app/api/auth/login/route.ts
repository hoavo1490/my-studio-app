import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { findUserCredentialsByEmail } from "@/lib/data-service";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const credentials = await findUserCredentialsByEmail(email);
  if (!credentials) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const valid = await verifyPassword(password, credentials.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  createSession(credentials.user);
  return NextResponse.json({ user: credentials.user });
}
