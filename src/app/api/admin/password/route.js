import { getAdminSession, updateAdminPassword, verifyAdminPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function PUT(request) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Your admin session has expired." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const currentPassword = String(body.currentPassword || "");
  const newPassword = String(body.newPassword || "");

  if (!(await verifyAdminPassword(currentPassword))) {
    return Response.json({ error: "Your current password is incorrect." }, { status: 400 });
  }
  if (newPassword.length < 10 || newPassword.length > 128) {
    return Response.json({ error: "Use a new password between 10 and 128 characters." }, { status: 400 });
  }
  if (currentPassword === newPassword) {
    return Response.json({ error: "Your new password must be different from the current password." }, { status: 400 });
  }
  if (!(await updateAdminPassword(newPassword))) {
    return Response.json({ error: "MongoDB is required to save your new password." }, { status: 503 });
  }
  return Response.json({ success: true });
}
