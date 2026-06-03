import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Custom local-friendly framer-motion import
import { NAV_LINKS } from "../../constants/portfolioData";

const SECTION_COLORS = {
  hero: "#00ff88",       // Electric Emerald
  about: "#00e5ff",      // Futuristic Cyan
  skills: "#9d4edf",      // Cyber Violet
  experience: "#ff477e",  // Neon Pink
  projects: "#3b82f6",    // Deep Azure
  contact: "#10b981",     // Mint
};

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

  const currentColor = SECTION_COLORS[activeSection] || "#00ff88";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3.5 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Decorative dynamic underglow border for scrolled state */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-700 ease-in-out pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 15%, ${currentColor} 50%, transparent 85%)`,
          boxShadow: scrolled ? `0 1px 18px 2px ${currentColor}90` : "none",
          opacity: scrolled ? 1 : 0
        }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        <motion.a
          href="#"
          className="font-mono text-xl font-bold text-white tracking-tight flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="transition-colors duration-500" style={{ color: currentColor }}>&lt;</span>
          {" TJ "}
          <span className="transition-colors duration-500" style={{ color: currentColor }}>/&gt;</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-2 bg-[#121214]/45 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isLinkActive = activeSection === link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`relative text-xs transition-all duration-300 tracking-wide font-medium py-1.5 px-3.5 rounded-full ${
                  isLinkActive
                    ? "text-white font-semibold"
                    : "text-white/40 hover:text-white/85"
                }`}
              >
                {/* Sprung-loaded slide pill background */}
                {isLinkActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute inset-0 rounded-full z-[-1] pointer-events-none"
                    style={{
                      background: `rgba(${
                        activeSection === 'skills'
                          ? '157, 78, 223'
                          : activeSection === 'about'
                          ? '0, 229, 255'
                          : activeSection === 'experience'
                          ? '255, 71, 126'
                          : activeSection === 'projects'
                          ? '59, 130, 246'
                          : '16, 185, 129'
                      }, 0.12)`,
                      border: `1px solid ${currentColor}40`,
                      boxShadow: `0 0 16px ${currentColor}25`,
                    }}
                  />
                )}
                {link}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={() => window.open("/Tobiloba_Jagun_CV.pdf", "_blank")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-xs font-semibold text-[#0a0a0a] px-4 py-2 rounded-full transition-all duration-500 tracking-wide cursor-pointer"
            style={{
              backgroundColor: currentColor,
              boxShadow: `0 0 15px ${currentColor}35`,
            }}
          >
            → Resume
          </motion.button>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-[60]"
        >
          <span className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 bg-[#0a0a0c]/98 backdrop-blur-2xl border-b border-white/5 pt-24 pb-10 px-6 z-50 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-medium tracking-wide ${
                  activeSection === link.toLowerCase() ? "text-[#00ff88]" : "text-white/60"
                }`}
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                window.open("/Tobiloba_Jagun_CV.pdf", "_blank");
              }}
              className="w-full text-center py-3 bg-[#00ff88] text-[#0a0a0a] font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-[#00ff88]/10"
            >
              Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;