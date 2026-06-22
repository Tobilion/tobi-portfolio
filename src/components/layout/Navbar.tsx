import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidButton } from "../ui/liquid-glass-button";
import { ThemeToggle } from "../ui/theme-toggle";
import { NavBar } from "../ui/tubelight-navbar";
import { Home, User, Code2, Briefcase, FileText, Mail, X, PenLine, Activity } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", url: "#hero", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Skills", url: "#skills", icon: Code2 },
  { name: "Experience", url: "#experience", icon: Briefcase },
  { name: "Projects", url: "#projects", icon: FileText },
  { name: "Writing", url: "#blog", icon: PenLine },
  { name: "Activity", url: "#activity", icon: Activity },
  { name: "Contact", url: "#contact", icon: Mail },
];

export function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [pillVisible, setPillVisible] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Availability pill */}
      <AnimatePresence>
        {pillVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for freelance &amp; full-time — Lagos / Remote
            <button
              onClick={() => setPillVisible(false)}
              className="ml-1 text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <X size={11} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/70 dark:bg-black/75 backdrop-blur-xl border-b border-slate-200/50 dark:border-zinc-900 shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#"
            className="font-mono text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight flex items-center shrink-0"
            whileHover={{ scale: 1.03 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="text-[#0066CC] font-semibold">&lt;</span>
            {" TJ "}
            <span className="text-[#0066CC] font-semibold">/&gt;</span>
          </motion.a>

          <NavBar
            items={NAV_ITEMS}
            className="sm:static! sm:left-auto! sm:top-auto! sm:translate-x-0! sm:z-auto!"
          />

          <div className="flex items-center gap-4 shrink-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <LiquidButton
              onClick={() => window.open("/Tobiloba_Jagun_CV.pdf", "_blank")}
              className="text-xs h-8 px-4"
            >
              Resume →
            </LiquidButton>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
