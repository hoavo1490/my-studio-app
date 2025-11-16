import { NextResponse } from "next/server";
import { listPublicPosts } from "@/lib/data-service";

interface Params {
  params: { username: string };
}

export async function GET(_: Request, { params }: Params) {
  const result = await listPublicPosts(params.username);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result);
}
