import { isProductionSite, siteUrl } from "@/lib/siteMetadata";
export default function robots() {
  return isProductionSite
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/admin/"] }, sitemap: `${siteUrl}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
