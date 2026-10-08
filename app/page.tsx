import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Portfolio } from "@/components/projects/Projects";
import { Certificates } from "@/components/certificates/Certificates";
import { Timeline } from "@/components/timeline/Timeline";
import { TechStack } from "@/components/tech-stack/TechStack";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="main-layout flex-1" tabIndex={-1}>
        <Hero />
        <About />
        <Portfolio />
        <Certificates />
        <Timeline />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
