import { redirect } from "next/navigation";
import AdminLogin from "@/components/admin/AdminLogin";
import { authIsConfigured, getAdminSession } from "@/lib/adminAuth";

import { pages } from "@/lib/siteMetadata";

export const metadata = { title: pages.login.title, robots: { index: false, follow: true } };

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return <AdminLogin configured={authIsConfigured()} />;
}
