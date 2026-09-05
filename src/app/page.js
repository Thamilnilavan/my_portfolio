import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import About from "@/components/public/About";
import Skills from "@/components/public/Skills";
import Projects from "@/components/public/Projects";
import Experience from "@/components/public/Experience";
import Services from "@/components/public/Services";
import Testimonials from "@/components/public/Testimonials";
import Gallery from "@/components/public/Gallery";
import Contact from "@/components/public/Contact";
import Footer from "@/components/public/Footer";
import SectionTransition from "@/components/effects/SectionTransition";
import CommandPalette from "@/components/effects/CommandPalette";
import PortfolioContentProvider from "@/components/providers/PortfolioContentProvider";
import { getPortfolioContent } from "@/lib/portfolioRepository";

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <PortfolioContentProvider content={content}>
      <Navbar />
      <CommandPalette />
      
      <main className="flex flex-col min-h-screen">
        <Hero />
        <SectionTransition delay={0.1}>
          <About />
        </SectionTransition>
        <SectionTransition delay={0.2}>
          <Skills />
        </SectionTransition>
        <SectionTransition delay={0.3}>
          <Services />
        </SectionTransition>
        <SectionTransition delay={0.4}>
          <Projects />
        </SectionTransition>
        <SectionTransition delay={0.5}>
          <Experience />
        </SectionTransition>
        <SectionTransition delay={0.6}>
          <Testimonials />
        </SectionTransition>
        <SectionTransition delay={0.7}>
          <Gallery />
        </SectionTransition>
        <SectionTransition delay={0.8}>
          <Contact />
        </SectionTransition>
      </main>

      <Footer />
    </PortfolioContentProvider>
  );
}
