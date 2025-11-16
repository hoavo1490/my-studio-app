import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";

export async function POST(request: Request) {
  const user = getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const fileName = `${Date.now()}-${file.name}`;
  await fs.writeFile(path.join(uploadDir, fileName), bytes);
  const url = `/uploads/${fileName}`;
  return NextResponse.json({ url });
}
