// src/App.jsx
import React, { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import TextRevealSection from "./components/sections/TextRevealSection";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import EvolvingBackground from "./components/ui/EvolvingBackground";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] antialiased selection:bg-[#0066CC]/10 selection:text-[#0066CC] relative overflow-x-hidden">
      <EvolvingBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <TextRevealSection />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}