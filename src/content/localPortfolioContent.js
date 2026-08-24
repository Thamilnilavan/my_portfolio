import { experience } from "@/data/experience";
import { gallery } from "@/data/gallery";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { settings } from "@/data/settings";
import { skills } from "@/data/skills";
import { testimonials } from "@/data/testimonials";

function prepareCollection(items) {
  return items.map((item, index) => ({
    ...item,
    id: String(item.id),
    sortOrder: item.sortOrder ?? index,
    isPublished: item.isPublished ?? true,
  }));
}

export const localPortfolioContent = {
  settings: {
    ...settings,
    id: "site-settings",
  },
  projects: prepareCollection(projects),
  experience: prepareCollection(experience),
  skills: prepareCollection(skills),
  services: prepareCollection(services),
  gallery: prepareCollection(gallery),
  testimonials: prepareCollection(testimonials),
};
