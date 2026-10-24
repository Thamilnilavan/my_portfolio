import { ImageResponse } from "next/og";
import { pages } from "@/lib/siteMetadata";
export const alt = pages.home.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#090b16", color: "white" }}>
    <div style={{ fontSize: 30, color: "#67e8f9", marginBottom: 30 }}>PORTFOLIO</div>
    <div style={{ fontSize: 78, fontWeight: 700 }}>Thamil</div>
    <div style={{ fontSize: 36, marginTop: 24, color: "#c4b5fd" }}>Full-Stack Developer &amp; UI/UX Designer</div>
  </div>, size);
}
