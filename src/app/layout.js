import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AnimatedBackground from "@/components/effects/AnimatedBackground";
import CustomCursor from "@/components/effects/CustomCursor";
import FloatingParticles from "@/components/effects/FloatingParticles";
import MouseGlow from "@/components/effects/MouseGlow";
import ScrollProgress from "@/components/effects/ScrollProgress";
import ServiceWorkerRegister from "@/components/effects/ServiceWorkerRegister";
import MotionProvider from "@/components/effects/MotionProvider";

const inter = Inter({ subsets: ["latin"] });

import { isProductionSite, pages, siteUrl } from "@/lib/siteMetadata";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: pages.home.title, template: "%s | Thamil" },
  description: pages.home.description,
  robots: { index: isProductionSite, follow: true },
  icons: { icon: "/assets/my1.png" },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-[var(--bg-primary)] text-white antialiased selection:bg-[#00D4FF]/30`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <MotionProvider>
          <AnimatedBackground />
          <CustomCursor />
          <FloatingParticles />
          <MouseGlow />
          <ScrollProgress />
          <ServiceWorkerRegister />
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0c0c14',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
