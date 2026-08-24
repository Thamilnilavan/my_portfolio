import "server-only";

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getDatabase } from "@/lib/mongodb";

export const ADMIN_COOKIE = "portfolio_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret
    ? createHmac("sha256", secret).update(value).digest("base64url")
    : null;
}

export function authIsConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.ADMIN_SESSION_SECRET
  );
}

function passwordMatchesHash(password, passwordHash) {
  const [salt, expectedHex] = (passwordHash || "").split(":");
  if (!salt || !expectedHex || !password) return false;

  try {
    const actual = scryptSync(password, salt, 64);
    const expected = Buffer.from(expectedHex, "hex");
    return expected.length === actual.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function hashAdminPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

async function getStoredPasswordHash() {
  const database = await getDatabase();
  if (!database) return null;
  const credentials = await database.collection("admin_auth").findOne({ _id: "credentials" });
  return credentials?.passwordHash || null;
}

export async function verifyAdminPassword(password) {
  const storedHash = await getStoredPasswordHash();
  return passwordMatchesHash(password, storedHash || process.env.ADMIN_PASSWORD_HASH);
}

export async function verifyAdminCredentials(email, password) {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return (
    Boolean(expectedEmail) &&
    email?.trim().toLowerCase() === expectedEmail &&
    (await verifyAdminPassword(password))
  );
}

export async function updateAdminPassword(password) {
  const database = await getDatabase();
  if (!database) return false;
  await database.collection("admin_auth").updateOne(
    { _id: "credentials" },
    { $set: { passwordHash: hashAdminPassword(password), updatedAt: new Date() } },
    { upsert: true }
  );
  return true;
}

export function createSessionToken(email) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
    })
  ).toString("base64url");
  const signature = sign(payload);
  return signature ? `${payload}.${signature}` : null;
}

export function readSessionToken(token) {
  if (!token) return null;
  const [payload, providedSignature] = token.split(".");
  const expectedSignature = sign(payload);
  if (!payload || !providedSignature || !expectedSignature) return null;

  const provided = Buffer.from(providedSignature);
  const expected = Buffer.from(expectedSignature);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}
