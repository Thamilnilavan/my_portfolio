import { redirect } from "next/navigation";
import AdminLogin from "@/components/admin/AdminLogin";
import { authIsConfigured, getAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return <AdminLogin configured={authIsConfigured()} />;
}
