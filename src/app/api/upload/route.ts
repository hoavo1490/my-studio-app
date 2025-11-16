import { NextResponse } from "next/server";
import { createWriteStream } from "fs";
import { mkdir, stat } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getCurrentUser } from "@/lib/auth";

const uploadDir = path.join(process.cwd(), "public", "uploads");

async function ensureUploadDir() {
  try {
    await stat(uploadDir);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  await ensureUploadDir();

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileExt = path.extname(file.name) || "";
  const fileName = `${crypto.randomUUID()}${fileExt}`;
  const filePath = path.join(uploadDir, fileName);

  await new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(filePath);
    stream.on("error", reject);
    stream.on("finish", resolve);
    stream.write(buffer);
    stream.end();
  });

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
