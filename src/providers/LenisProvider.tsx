import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const instance = new Lenis({
      duration: isMobile ? 0.6 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: isMobile ? 1.2 : 2,
      wheelMultiplier: isMobile ? 1.2 : 1,
      infinite: false,
      wrapper: window,
      content: document.documentElement,
    });

    lenisRef.current = instance;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    let rafId: number;
    function raf(time: number): void {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLenis() {
  const ctx = useContext(LenisContext);
  return ctx;
}