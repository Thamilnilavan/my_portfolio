"use client";
import { usePortfolioContent } from "./PortfolioContentProvider";
import { getUiSettings } from "@/content/uiSettings";
export default function PortfolioAppearance({ children }) {
  const { settings } = usePortfolioContent();
  const ui = getUiSettings(settings);
  return <div className="portfolio-ui" data-spacing={ui.uiSectionSpacing} data-headings={ui.uiHeadingSize} data-font={ui.uiFont}>{children}</div>;
}
