import React, { useEffect, Suspense, lazy } from "react";
import Lenis from "lenis";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import EvolvingBackground from "./components/ui/EvolvingBackground";

// Below-fold sections are lazy-loaded so they don't block the initial paint
const Footer    = lazy(() => import("./components/layout/Footer"));
const About     = lazy(() => import("./components/sections/About"));
const Skills    = lazy(() => import("./components/sections/Skills"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Projects  = lazy(() => import("./components/sections/Projects"));
const Contact   = lazy(() => import("./components/sections/Contact"));

/** Tiny skeleton shown while a lazy section hydrates */
function SectionSkeleton(): React.JSX.Element {
  return (
    <div className="w-full py-32 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#0066CC]/20 border-t-[#0066CC] animate-spin" />
    </div>
  );
}

export default function App(): React.JSX.Element {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    window.lenis = lenis;
    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0B0C] text-[#1D1D1F] dark:text-[#F5F5F7] antialiased selection:bg-[#0066CC]/10 selection:text-[#0066CC] relative overflow-x-hidden transition-colors duration-300">
      <EvolvingBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
