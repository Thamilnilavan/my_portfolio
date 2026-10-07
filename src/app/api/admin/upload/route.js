import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const requestedFolder = formData.get("folder") || "uploads";
    const ALLOWED_FOLDERS = ["uploads", "profile", "testimonials", "gallery", "projects", "cv"];
    const folder = ALLOWED_FOLDERS.includes(requestedFolder) ? requestedFolder : "uploads";

    if (!file || typeof file === "string" || !file.size) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    const isCv = folder === "cv";
    const validType = isCv
      ? /\.pdf$/i.test(file.name) && ["", "application/pdf", "application/octet-stream"].includes(file.type)
      : allowedTypes.includes(file.type);
    if (!validType) {
      return NextResponse.json(
        { error: isCv ? "Please upload your CV as a PDF." : "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG" },
        { status: 400 }
      );
    }

    // Vercel Functions accept request bodies up to 4.5 MB. Leave room for
    // multipart form data so uploads fail predictably before reaching Vercel.
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 4MB" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (isCv && bytes.subarray(0, 5).toString() !== "%PDF-") {
      return NextResponse.json({ error: "The selected file is not a valid PDF." }, { status: 400 });
    }

    const database = await getDatabase();
    if (!database) {
      return NextResponse.json(
        { error: "MongoDB is not configured or could not be reached." },
        { status: 503 }
      );
    }

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const upload = {
      folder,
      filename: originalName || "image",
      contentType: isCv ? "application/pdf" : file.type,
      size: file.size,
      data: bytes,
      createdAt: new Date(),
    };
    const result = await database.collection("uploads").insertOne(upload);

    const url = `/api/images/${result.insertedId.toString()}`;

    return NextResponse.json({
      success: true,
      url,
      filename: upload.filename,
      size: file.size,
      type: upload.contentType,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
