import React, { useEffect, Suspense, lazy } from "react";
import Lenis from "lenis";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import EvolvingBackground from "./components/ui/EvolvingBackground";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ScrollProgressBar } from "./components/ui/ScrollProgressBar";
import { Terminal } from "./components/ui/Terminal";

const Footer    = lazy(() => import("./components/layout/Footer"));
const About     = lazy(() => import("./components/sections/About"));
const Skills    = lazy(() => import("./components/sections/Skills"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Projects  = lazy(() => import("./components/sections/Projects"));
const Contact   = lazy(() => import("./components/sections/Contact"));

export default function App(): React.JSX.Element {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      duration: isMobile ? 0.6 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: isMobile ? 1.2 : 2,
      wheelMultiplier: isMobile ? 0.8 : 1.2,
    });
    (window as any).lenis = lenis;
    let rafId: number;
    function raf(time: number): void {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0B0C] text-[#1D1D1F] dark:text-[#F5F5F7] antialiased selection:bg-[#0066CC]/10 selection:text-[#0066CC] relative overflow-x-hidden transition-colors duration-300">
      <CustomCursor />
      <ScrollProgressBar />
      <Terminal />
      <EvolvingBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={null}><About /></Suspense>
        <Suspense fallback={null}><Skills /></Suspense>
        <Suspense fallback={null}><Experience /></Suspense>
        <Suspense fallback={null}><Projects /></Suspense>
        <Suspense fallback={null}><Contact /></Suspense>
        <Suspense fallback={null}><Footer /></Suspense>
      </main>
    </div>
  );
}
