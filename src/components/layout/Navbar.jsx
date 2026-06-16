import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../constants/portfolioData";
import { LiquidButton } from "../ui/liquid-glass-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220; // Perfect viewport offset for tracking

      if (window.scrollY < 60) {
        setActiveSection("hero");
        return;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        setActiveSection("contact");
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/75 backdrop-blur-xl border-b border-slate-250/80 shadow-[0_1px_8px_rgba(0,0,0,0.02)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        <motion.a
          href="#"
          className="font-mono text-xl font-bold text-[#1D1D1F] tracking-tight flex items-center"
          whileHover={{ scale: 1.03 }}
        >
          <span className="text-[#0066CC] font-semibold">&lt;</span>
          {" TJ "}
          <span className="text-[#0066CC] font-semibold">/&gt;</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1 bg-[#F5F5F7]/85 p-1 rounded-full border border-slate-200/40 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isLinkActive = activeSection === link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`relative text-[11px] transition-all duration-200 tracking-wide font-medium py-1.5 px-4 rounded-full ${
                  isLinkActive
                    ? "text-white font-semibold"
                    : "text-[#86868B] hover:text-[#1D1D1F]"
                }`}
              >
                {/* Sprung-loaded slide pill background */}
                {isLinkActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute inset-0 rounded-full z-[-1] pointer-events-none bg-[#0066CC]"
                  />
                )}
                {link}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center">
          <LiquidButton 
            onClick={() => window.open("/Tobiloba_Jagun_CV.pdf", "_blank")}
            className="text-xs h-8 px-4"
          >
            Resume →
          </LiquidButton>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.2 w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/50 hover:bg-slate-200/60 transition-colors z-[60]"
        >
          <span className={`h-[1.5px] w-4.5 bg-[#1D1D1F] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`h-[1.5px] w-4.5 bg-[#1D1D1F] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-4.5 bg-[#1D1D1F] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 pt-24 pb-10 px-6 z-50 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-semibold tracking-wide ${
                  activeSection === link.toLowerCase() ? "text-[#0066CC]" : "text-[#86868B]"
                }`}
              >
                {link}
              </a>
            ))}
            <LiquidButton
              onClick={() => {
                setMobileOpen(false);
                window.open("/Tobiloba_Jagun_CV.pdf", "_blank");
              }}
              className="w-full text-center py-2.5 h-11"
            >
              Resume →
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;