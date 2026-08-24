import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/adminAuth";
import { isMongoConfigured } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminDashboard
      adminEmail={session.email}
      databaseConfigured={isMongoConfigured()}
    />
  );
}
