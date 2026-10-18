export const contactDefaults = {
  contactEyebrow: "Get in touch",
  contactHeading: "Great things start with a",
  contactHeadingAccent: "conversation.",
  contactDescription: "Have an idea, a project, or an opportunity? Let’s turn that first conversation into something worth building.",
  contactDetailsHeading: "Let’s connect.",
  contactDetailsText: "Choose your preferred way to reach me, or leave a message using the form.",
  contactFormEyebrow: "Your idea starts here",
  contactFormHeading: "Let’s make it happen.",
  contactSubmitLabel: "Send message",
};
export function getContactSettings(settings) {
  return Object.fromEntries(Object.entries(contactDefaults).map(([key, fallback]) => [key, settings[key]?.trim() || fallback]));
}
