import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AnimatedBackground from "@/components/effects/AnimatedBackground";
import CustomCursor from "@/components/effects/CustomCursor";
import FloatingParticles from "@/components/effects/FloatingParticles";
import MouseGlow from "@/components/effects/MouseGlow";
import ScrollProgress from "@/components/effects/ScrollProgress";
import ServiceWorkerRegister from "@/components/effects/ServiceWorkerRegister";
import DevIndicatorRemover from "@/components/effects/DevIndicatorRemover";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thami | Full-Stack Developer & UI/UX Designer",
  description: "Award-winning portfolio of Thami, a senior full-stack developer and UI/UX designer specializing in creating premium digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-[#0A0A0A] text-white antialiased selection:bg-[#00D4FF]/30`}>
        <DevIndicatorRemover />
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
      </body>
    </html>
  );
}
