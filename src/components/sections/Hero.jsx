import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowOrb } from "../ui/GlowOrb";
import { AbstractCanvas } from "../ui/AbstractCanvas";
import { MagneticButton } from "../ui/MagneticButton"; // Import Magnetic wrapper
import { fadeUp, stagger } from "../../animations/variants";

export function Hero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <GlowOrb color="#00ff88" size="600px" top="-100px" left="-200px" />
      <GlowOrb color="#7c3aed" size="500px" top="200px" left="60%" blur={220} />
      <GlowOrb color="#0ea5e9" size="400px" top="60%" left="20%" blur={200} />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div 
        style={{ scale, opacity, y }}
        className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          <motion.span variants={fadeUp} className="text-[#a0a0a0] text-lg font-light tracking-wide">
            Hi there, I'm
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-[#8e8e93]">Tobiloba</span>
            <br />
            <span className="text-white">Jagun</span>
          </motion.h1>

          <motion.div 
            variants={fadeUp} 
            className="w-fit px-5 py-2.5 rounded-full border border-white/5 bg-[#161618] text-[#8e8e93] text-xs font-mono font-semibold tracking-wider uppercase shadow-inner"
          >
            Front-End Developer
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base text-white/40 leading-relaxed max-w-md font-light pt-2"
          >
            Software engineer crafting high-performance systems and elegant interfaces. 
            Specialising in distributed architecture, developer tooling, and ML infrastructure.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            {/* Wrap CTA 1 in Magnetic */}
            <MagneticButton>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px #00ff8840" }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full text-sm font-bold text-[#0a0a0a] bg-[#00ff88] transition-all duration-200 block"
              >
                View My Work →
              </motion.a>
            </MagneticButton>

            {/* Wrap CTA 2 in Magnetic */}
            <MagneticButton>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200 block"
              >
                Get in Touch
              </motion.a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="relative w-full aspect-square max-w-[480px] mx-auto">
          <AbstractCanvas />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}