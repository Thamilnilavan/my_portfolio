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
    const ALLOWED_FOLDERS = ["uploads", "profile", "testimonials", "gallery", "projects"];
    const folder = ALLOWED_FOLDERS.includes(requestedFolder) ? requestedFolder : "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG" },
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

    const database = await getDatabase();
    if (!database) {
      return NextResponse.json(
        { error: "MongoDB is not configured or could not be reached." },
        { status: 503 }
      );
    }

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const bytes = await file.arrayBuffer();
    const upload = {
      folder,
      filename: originalName || "image",
      contentType: file.type,
      size: file.size,
      data: Buffer.from(bytes),
      createdAt: new Date(),
    };
    const result = await database.collection("uploads").insertOne(upload);

    const url = `/api/images/${result.insertedId.toString()}`;

    return NextResponse.json({
      success: true,
      url,
      filename: upload.filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
