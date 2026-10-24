import { pages } from "@/lib/siteMetadata";

export const metadata = {
  title: pages.admin.title,
  robots: { index: false, follow: true },
};

export default function AdminLayout({ children }) {
  return children;
}
