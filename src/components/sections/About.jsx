import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { MagneticButton } from "../ui/MagneticButton"; // Import Magnetic wrapper
import { fadeUp, stagger } from "../../animations/variants";

export function About() {
  const { ref, isInView } = useSectionInView();

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_2fr] gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-32"
        >
          <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
            ABOUT ME
          </span>
          <div className="mt-3 w-12 h-px bg-[#00ff88]/40" />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-8"
        >
          <div className="rounded-2xl border border-white/5 bg-[#121214] p-8 lg:p-10 shadow-2xl">
            <motion.p variants={fadeUp} className="text-white/70 leading-[1.8] text-base mb-6">
              I'm a passionate software engineer with a deep obsession for distributed systems, 
              developer experience, and the craftsmanship of high-quality software. My journey started 
              tinkering with network protocols at 14 — today I architect systems at scale.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/70 leading-[1.8] text-base mb-8">
              My approach combines clean code principles with modern design aesthetics, ensuring that 
              every project delivers exceptional value to users and stakeholders alike. I believe the 
              best code is invisible — it empowers teams, survives ambiguity, and ages gracefully.
            </motion.p>

            {/* Wrap Download CV Button in Magnetic proximity wrapper */}
            <MagneticButton className="w-fit">
              <motion.a
                variants={fadeUp}
                href="/Tobiloba_Jagun_CV.pdf"
                download="Tobiloba_Jagun_CV.pdf"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#00ff88] border border-[#00ff88]/30 bg-[#00ff88]/5 hover:bg-[#00ff88]/10 transition-all duration-200 block"
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download CV
              </motion.a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}