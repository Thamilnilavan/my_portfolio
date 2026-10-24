import { isProductionSite, pages, pageUrl } from "@/lib/siteMetadata";
export default function sitemap() {
  return isProductionSite ? Object.values(pages).filter(page => page.indexable).map(page => ({ url: pageUrl(page) })) : [];
}
