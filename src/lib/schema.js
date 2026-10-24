import { pages, pageUrl, siteUrl } from "./siteMetadata";

export function portfolioSchema(settings) {
  const url = pageUrl(pages.home);
  const personId = `${siteUrl}/#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": personId, name: settings.name, url,
        sameAs: [settings.github, settings.linkedin, settings.twitter, settings.instagram].filter(value => /^https?:\/\//.test(value || "")) },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url, name: pages.home.title, publisher: { "@id": personId } },
      { "@type": "ProfilePage", "@id": `${url}#webpage`, url, name: pages.home.title,
        mainEntity: { "@id": personId }, isPartOf: { "@id": `${siteUrl}/#website` } },
    ],
  };
}
export function serializeSchema(value) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
