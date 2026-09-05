import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return new Response("Image not found", { status: 404 });
  }

  const database = await getDatabase();
  if (!database) {
    return new Response("Image storage is unavailable", { status: 503 });
  }

  const image = await database.collection("uploads").findOne(
    { _id: new ObjectId(id) },
    { projection: { data: 1, contentType: 1, size: 1 } }
  );
  if (!image?.data) {
    return new Response("Image not found", { status: 404 });
  }

  // The MongoDB driver returns binary fields as BSON Binary objects by default.
  // Read its Buffer payload rather than the wrapper object, which otherwise
  // serializes as an empty byte array in a Response.
  const binary = image.data;
  const bytes = Buffer.isBuffer(binary) ? binary : binary.buffer;
  if (!bytes?.length) {
    return new Response("Image data is empty", { status: 404 });
  }

  return new Response(bytes, {
    headers: {
      "Content-Type": image.contentType || "application/octet-stream",
      "Content-Length": String(bytes.length),
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
