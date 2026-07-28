import React, { Suspense, lazy } from "react";
import { LenisProvider } from "./providers/LenisProvider";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import { ScrollProgressBar } from "./components/ui/ScrollProgressBar";
import { Terminal } from "./components/ui/Terminal";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { GlassFilter } from "./components/ui/liquid-glass-button";

const Footer          = lazy(() => import("./components/layout/Footer"));
const About           = lazy(() => import("./components/sections/About"));
const Skills          = lazy(() => import("./components/sections/Skills"));
const Experience      = lazy(() => import("./components/sections/Experience"));
const Projects        = lazy(() => import("./components/sections/Projects"));
const Blog            = lazy(() => import("./components/sections/Blog"));
const GitHubActivity  = lazy(() => import("./components/sections/GitHubActivity"));
const Contact         = lazy(() => import("./components/sections/Contact"));

function SectionFallback(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center" aria-hidden="true">
      <div className="w-8 h-8 rounded-full border-2 border-slate-300/40 dark:border-zinc-700/60 border-t-[#0066CC] animate-spin" />
    </div>
  );
}

export default function App(): React.JSX.Element {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0B0C] text-[#1D1D1F] dark:text-[#F5F5F7] antialiased selection:bg-[#0066CC]/10 selection:text-[#0066CC] relative overflow-x-hidden transition-colors duration-300">
        <GlassFilter />
        <ScrollProgressBar />
        <Terminal />
        <Navbar />
        <main id="main-content" className="relative z-10">
          <ErrorBoundary fallback={null}><Hero /></ErrorBoundary>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><About /></ErrorBoundary></Suspense>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><Skills /></ErrorBoundary></Suspense>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><Experience /></ErrorBoundary></Suspense>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><Projects /></ErrorBoundary></Suspense>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><Blog /></ErrorBoundary></Suspense>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><GitHubActivity /></ErrorBoundary></Suspense>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><Contact /></ErrorBoundary></Suspense>
          <Suspense fallback={<SectionFallback />}><ErrorBoundary fallback={null}><Footer /></ErrorBoundary></Suspense>
        </main>
      </div>
    </LenisProvider>
  );
}
