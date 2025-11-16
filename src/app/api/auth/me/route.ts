import { NextResponse } from "next/server";
import { destroySession, getCurrentSession } from "@/lib/auth";
import { updateUser } from "@/lib/data-service";

export async function GET() {
  const user = getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
  const current = getCurrentSession();
  if (!current) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const updated = await updateUser(current.id, body);
  return NextResponse.json({ user: updated });
}

export async function DELETE() {
  destroySession();
  return NextResponse.json({ success: true });
}
