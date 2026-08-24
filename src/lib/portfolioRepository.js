import "server-only";

import { localPortfolioContent } from "@/content/localPortfolioContent";
import { getDatabase } from "@/lib/mongodb";

function published(items) {
  return items
    .filter((item) => item.isPublished)
    .sort((first, second) => first.sortOrder - second.sortOrder);
}

/**
 * Public content gateway.
 *
 * The UI only consumes the object returned here. When the admin dashboard is
 * connected to a database, replace this local implementation with database
 * queries while keeping the returned shape unchanged.
 */
export async function getPortfolioContent() {
  const database = await getDatabase();
  if (database) {
    const collectionNames = [
      "projects",
      "experience",
      "skills",
      "services",
      "gallery",
      "testimonials",
    ];
    const [settings, ...collections] = await Promise.all([
      database.collection("settings").findOne(
        { id: "site-settings" },
        { projection: { _id: 0 } }
      ),
      ...collectionNames.map((name) =>
        database
          .collection(name)
          .find({ isPublished: { $ne: false } }, { projection: { _id: 0 } })
          .sort({ sortOrder: 1 })
          .toArray()
      ),
    ]);

    if (settings || collections.some((items) => items.length)) {
      return {
        settings: settings || localPortfolioContent.settings,
        ...Object.fromEntries(
          collectionNames.map((name, index) => [
            name,
            collections[index].length
              ? collections[index]
              : published(localPortfolioContent[name]),
          ])
        ),
      };
    }
  }

  return {
    settings: localPortfolioContent.settings,
    projects: published(localPortfolioContent.projects),
    experience: published(localPortfolioContent.experience),
    skills: published(localPortfolioContent.skills),
    services: published(localPortfolioContent.services),
    gallery: published(localPortfolioContent.gallery),
    testimonials: published(localPortfolioContent.testimonials),
  };
}
