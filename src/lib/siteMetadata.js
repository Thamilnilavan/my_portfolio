// One registry for metadata and crawlable page URLs. Section anchors are not pages.
export const siteUrl = "https://thamilnilavan.vercel.app";
export const isProductionSite = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.SITE_ENV === "production";
export const pages = {
  home: {
    path: "/",
    title: "Thamil | Full-Stack Developer & UI/UX Designer",
    description: "portfolio of Thamil, a senior full-stack developer and UI/UX designer specializing in creating premium digital experiences.",
    indexable: true,
  },
  admin: { path: "/admin", title: "Portfolio Admin", indexable: false },
  login: { path: "/admin/login", title: "Admin Login", indexable: false },
};
export function pageUrl(page) { return new URL(page.path, siteUrl).href.replace(/\/$/, ""); }
export function homeMetadata() {
  const page = pages.home;
  const url = pageUrl(page);
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: page.title }];
  return {
    title: { absolute: page.title }, description: page.description,
    alternates: { canonical: url },
    robots: { index: isProductionSite, follow: true },
    openGraph: { type: "website", title: page.title, description: page.description, url, images },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: ["/opengraph-image"] },
  };
}
