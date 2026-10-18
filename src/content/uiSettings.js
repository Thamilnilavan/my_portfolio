export const uiDefaults = {
  "uiSectionSpacing": "compact",
  "uiHeadingSize": "default",
  "uiFont": "default",
  "uiProjectCardSize": "compact",
  "uiServiceCardSize": "compact",
  "sectionProjectsLabel": "Portfolio",
  "sectionProjectsHeading": "Featured Projects",
  "sectionProjectsDescription": "A selection of my recent work, showcasing complex problem-solving and clean design.",
  "sectionSkillsLabel": "My Expertise",
  "sectionSkillsHeading": "Technical Skills",
  "sectionSkillsDescription": "A showcase of my technical proficiencies and the tools I use to bring ideas to life.",
  "sectionServicesLabel": "What I do",
  "sectionServicesHeading": "Thoughtful design.",
  "sectionServicesAccent": "Powerful development.",
  "sectionServicesDescription": "Design, development, and the details in between. Here's how I can help.",
  "sectionJourneyLabel": "My Journey",
  "sectionJourneyHeading": "Every chapter.",
  "sectionJourneyAccent": "A step forward.",
  "sectionJourneyDescription": "The projects, people, and experiences that shape how I build.",
  "sectionGalleryLabel": "Behind the scenes",
  "sectionGalleryHeading": "Gallery"
};

export const uiOptions = {
  uiSectionSpacing: ["compact", "balanced", "spacious"],
  uiHeadingSize: ["default", "small", "large"],
  uiFont: ["default", "system", "mono"],
  uiProjectCardSize: ["compact", "large"],
  uiServiceCardSize: ["compact", "large"],
};

export function getUiSettings(settings) {
  return Object.fromEntries(Object.entries(uiDefaults).map(([key, fallback]) => {
    const value = settings[key];
    return [key, uiOptions[key] ? (uiOptions[key].includes(value) ? value : fallback) : (typeof value === "string" && value.trim() ? value.trim() : fallback)];
  }));
}
