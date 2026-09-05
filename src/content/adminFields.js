export const adminSections = {
  settings: { label: "Site settings", singular: "Settings" },
  projects: { label: "Projects", singular: "Project" },
  experience: { label: "Experience", singular: "Experience" },
  skills: { label: "Skills", singular: "Skill" },
  services: { label: "Services", singular: "Service" },
  gallery: { label: "Gallery", singular: "Gallery item" },
  testimonials: { label: "Testimonials", singular: "Testimonial" },
};

export const adminFields = {
  settings: [
    ["name", "Full name"],
    ["profileImage", "Profile image URL"],
    ["availabilityText", "Availability"],
    ["heroBio", "Hero biography", "textarea"],
    ["typewriterRoles", "Roles (comma separated)"],
    ["aboutText", "About text", "textarea"],
    ["cvUrl", "CV URL"],
    ["email", "Email", "email"],
    ["phone", "Phone"],
    ["location", "Location"],
    ["github", "GitHub URL", "url"],
    ["linkedin", "LinkedIn URL", "url"],
    ["twitter", "X / Twitter URL", "url"],
    ["instagram", "Instagram URL", "url"],
    ["whatsapp", "WhatsApp URL", "url"],
  ],
  projects: [
    ["title", "Title"], ["description", "Description", "textarea"],
    ["image", "Image URL"], ["category", "Category"],
    ["techStack", "Technology stack", "array"], ["github", "GitHub URL", "url"],
    ["liveUrl", "Live URL", "url"], ["sortOrder", "Display order", "number"],
    ["isPublished", "Published", "boolean"],
  ],
  experience: [
    ["title", "Job title"], ["company", "Company"], ["location", "Location"],
    ["startDate", "Start date"], ["endDate", "End date"],
    ["description", "Description", "textarea"], ["sortOrder", "Display order", "number"],
    ["isPublished", "Published", "boolean"],
  ],
  skills: [
    ["name", "Skill"], ["category", "Category"], ["level", "Level", "number"],
    ["sortOrder", "Display order", "number"], ["isPublished", "Published", "boolean"],
  ],
  services: [
    ["title", "Title"], ["description", "Description", "textarea"],
    ["icon", "Icon", "select"], ["sortOrder", "Display order", "number"],
    ["isPublished", "Published", "boolean"],
  ],
  gallery: [
    ["title", "Title"], ["src", "Image URL"], ["category", "Category"],
    ["sortOrder", "Display order", "number"], ["isPublished", "Published", "boolean"],
  ],
  testimonials: [
    ["name", "Name"], ["role", "Role"], ["content", "Testimonial", "textarea"],
    ["rating", "Star Rating", "number"], ["avatar", "Avatar URL"],
    ["sortOrder", "Display order", "number"], ["isPublished", "Published", "boolean"],
  ],
};

export function createEmptyRecord(section) {
  return Object.fromEntries(
    adminFields[section].map(([key, , type]) => [
      key,
      type === "boolean" ? true : type === "number" ? 0 : type === "array" ? [] : "",
    ])
  );
}
