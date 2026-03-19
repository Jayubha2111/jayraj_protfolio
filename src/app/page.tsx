"use client";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main style={{ backgroundColor: "#050505" }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
