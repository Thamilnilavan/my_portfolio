export const businessDefaults = {
  businessEnabled: true,
  businessDesktopImage: "/assets/arcstack-desktop.png",
  businessMobileImage: "/assets/arcstack-mobile.png",
  businessHeading: "Building ArcStack",
  businessHeadline: "Developer by craft.",
  businessHeadlineAccent: "Founder by ambition.",
  businessDescription: "Alongside my development work, I am building ArcStack — a digital studio helping businesses turn their ideas into websites, web applications, and useful digital solutions.",
  businessUrl: "https://arcstack-web.vercel.app/",
  businessLinkLabel: "Visit ArcStack",
  businessBuildText: "Thoughtful websites and applications, shaped around real business needs.",
  businessLaunchText: "Responsive experiences, ready for the people who will use them.",
  businessGrowText: "Ongoing improvements that help a business keep moving forward.",
};

export function getBusinessSettings(settings) {
  const content = { ...businessDefaults, ...settings };
  try {
    const url = new URL(content.businessUrl);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    content.businessUrl = url.href;
  } catch { content.businessUrl = businessDefaults.businessUrl; }
  return content;
}
