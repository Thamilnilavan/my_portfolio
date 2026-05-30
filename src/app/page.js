import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import About from "@/components/public/About";
import Skills from "@/components/public/Skills";
import Projects from "@/components/public/Projects";
import Experience from "@/components/public/Experience";
import Services from "@/components/public/Services";
import Gallery from "@/components/public/Gallery";
import Contact from "@/components/public/Contact";
import Footer from "@/components/public/Footer";
import PageLoader from "@/components/effects/PageLoader";
import SectionTransition from "@/components/effects/SectionTransition";

export default function Home() {
  return (
    <>
      <PageLoader />
      <Navbar />
      
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
          <Gallery />
        </SectionTransition>
        <SectionTransition delay={0.7}>
          <Contact />
        </SectionTransition>
      </main>

      <Footer />
    </>
  );
}
