import { randomUUID } from "node:crypto";
import { getAdminSession } from "@/lib/adminAuth";
import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import { localPortfolioContent } from "@/content/localPortfolioContent";
import { adminFields } from "@/content/adminFields";

export const runtime = "nodejs";

const COLLECTIONS = [
  "settings",
  "projects",
  "experience",
  "skills",
  "services",
  "gallery",
  "testimonials",
];

async function authorized() {
  return Boolean(await getAdminSession());
}

function validCollection(name) {
  return COLLECTIONS.includes(name);
}

function cleanRecord(collection, value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const allowedFields = new Set([
    "id",
    "createdAt",
    "updatedAt",
    ...adminFields[collection].map(([key]) => key),
  ]);
  const record = Object.fromEntries(
    Object.entries(value).filter(([key]) => allowedFields.has(key))
  );
  return record;
}

async function readAll(database) {
  return Object.fromEntries(
    await Promise.all(
      COLLECTIONS.map(async (name) => {
        const records = await database
          .collection(name)
          .find({}, { projection: { _id: 0 } })
          .sort({ sortOrder: 1 })
          .toArray();
        return [name, name === "settings" ? records[0] || null : records];
      })
    )
  );
}

export async function GET() {
  if (!(await authorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const database = await getDatabase();
  if (!database) {
    return Response.json({
      configured: false,
      content: localPortfolioContent,
      source: "local-preview",
    });
  }

  return Response.json({
    configured: true,
    content: await readAll(database),
    source: "mongodb",
  });
}

export async function POST(request) {
  if (!(await authorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return Response.json({ error: "MongoDB is not configured." }, { status: 503 });
  }

  const database = await getDatabase();
  if (!database) {
    return Response.json({ error: "MongoDB could not be reached." }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));

  if (body.action === "seed") {
    for (const name of COLLECTIONS) {
      const collection = database.collection(name);
      const records = name === "settings"
        ? [localPortfolioContent.settings]
        : localPortfolioContent[name];
      if ((await collection.countDocuments()) === 0 && records.length) {
        await collection.insertMany(records);
      }
    }
    return Response.json({ success: true, content: await readAll(database) });
  }

  if (!validCollection(body.collection)) {
    return Response.json({ error: "Invalid collection." }, { status: 400 });
  }
  const record = cleanRecord(body.collection, body.data);
  if (!record) {
    return Response.json({ error: "Invalid record." }, { status: 400 });
  }

  record.id = body.collection === "settings" ? "site-settings" : String(record.id || randomUUID());
  record.updatedAt = new Date().toISOString();
  record.createdAt ||= record.updatedAt;
  record.isPublished ??= true;
  record.sortOrder ??= Date.now();

  await database.collection(body.collection).updateOne(
    { id: record.id },
    { $set: record },
    { upsert: true }
  );
  return Response.json({ success: true, record });
}

export async function PUT(request) {
  if (!(await authorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const database = await getDatabase();
  if (!database) {
    return Response.json({ error: "MongoDB could not be reached." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  if (!validCollection(body.collection) || !body.id) {
    return Response.json({ error: "Invalid update request." }, { status: 400 });
  }
  const record = cleanRecord(body.collection, body.data);
  if (!record) {
    return Response.json({ error: "Invalid record." }, { status: 400 });
  }

  record.id = String(body.id);
  record.updatedAt = new Date().toISOString();
  await database.collection(body.collection).updateOne(
    { id: record.id },
    { $set: record },
    { upsert: body.collection === "settings" }
  );
  return Response.json({ success: true, record });
}

export async function DELETE(request) {
  if (!(await authorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const database = await getDatabase();
  if (!database) {
    return Response.json({ error: "MongoDB could not be reached." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  if (!validCollection(body.collection) || body.collection === "settings" || !body.id) {
    return Response.json({ error: "Invalid delete request." }, { status: 400 });
  }

  await database.collection(body.collection).deleteOne({ id: String(body.id) });
  return Response.json({ success: true });
}
