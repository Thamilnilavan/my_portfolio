import { ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST() {
  const response = Response.json({ success: true });
  response.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
  return response;
}
