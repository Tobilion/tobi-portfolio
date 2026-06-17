import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LiquidButton } from "../ui/liquid-glass-button";
import { ThemeToggle } from "../ui/theme-toggle";
import { NavBar } from "../ui/tubelight-navbar";
import { Home, User, Code2, Briefcase, FileText, Mail } from "lucide-react";

export function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
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

  const navItems = [
    { name: "Home", url: "#hero", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Skills", url: "#skills", icon: Code2 },
    { name: "Experience", url: "#experience", icon: Briefcase },
    { name: "Projects", url: "#projects", icon: FileText },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return (
    <>
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
            items={navItems}
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
