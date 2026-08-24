import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "portfolio";

let clientPromise;

export function isMongoConfigured() {
  return Boolean(uri);
}

export async function getDatabase() {
  if (!uri) return null;

  if (!clientPromise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    clientPromise = client.connect();
  }

  try {
    const client = await clientPromise;
    return client.db(databaseName);
  } catch (error) {
    clientPromise = undefined;
    console.error("MongoDB connection failed:", error.message);
    return null;
  }
}
