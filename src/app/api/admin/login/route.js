import {
  ADMIN_COOKIE,
  adminCookieOptions,
  authIsConfigured,
  createSessionToken,
  verifyAdminCredentials,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

const attempts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < 15 * 60 * 1000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 8;
}

export async function POST(request) {
  if (!authIsConfigured()) {
    return Response.json(
      { error: "Admin authentication is not configured yet." },
      { status: 503 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many login attempts. Please wait 15 minutes." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => ({}));
  if (!(await verifyAdminCredentials(body.email, body.password))) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = createSessionToken(body.email.trim().toLowerCase());
  const response = Response.json({ success: true });
  response.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=${token}; Path=/; Max-Age=${adminCookieOptions().maxAge}; HttpOnly; SameSite=Strict${
      adminCookieOptions().secure ? "; Secure" : ""
    }`
  );
  return response;
}
