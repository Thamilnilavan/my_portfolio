export const aboutDefaults = {
  aboutEyebrow: "A little about me",
  aboutHeading: "A curious mind.",
  aboutHeadingAccent: "A passion for building.",
  aboutImage: "",
  aboutPhotoCaption: "the person behind the pixels",
  aboutTagline: "Always learning. Always building.",
  aboutRoles: null,
  aboutJourneyLabel: "More about my journey",
  aboutContactLabel: "Let's work together",
  aboutCvLabel: "My CV",
  aboutAnimate: true,
  aboutShowStats: true,
  aboutShowFeatures: true,
  aboutFeature1Title: "Built with care",
  aboutFeature1Text: "Clean, maintainable code with attention to the small details.",
  aboutFeature2Title: "Made to perform",
  aboutFeature2Text: "Fast, responsive experiences that feel effortless to use.",
  aboutFeature3Title: "Designed for people",
  aboutFeature3Text: "Thoughtful interfaces, from the smallest screen to the largest.",
};

export function getAboutSettings(settings) {
  return {
    ...aboutDefaults,
    ...settings,
    aboutImage: settings.aboutImage || settings.profileImage || "",
    aboutRoles: settings.aboutRoles ?? settings.typewriterRoles ?? "",
  };
}
