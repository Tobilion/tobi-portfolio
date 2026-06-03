import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { EXPERIENCES } from "../../constants/portfolioData";

function TimelineNode({ item, index }) {
  const { ref, isInView } = useSectionInView(0.3);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-8 pl-8"
    >
      {/* Visual Timeline Path dot and Icon */}
      <div className="absolute left-0 top-1 flex flex-col items-center">
        <motion.div
          animate={isInView ? { scale: [0, 1.2, 1], opacity: [0, 1, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="w-10 h-10 rounded-full bg-[#121214] border border-[#00ff88]/30 flex items-center justify-center relative z-10 text-xs"
          style={{ boxShadow: "0 0 12px rgba(0, 255, 136, 0.15)" }}
        >
          {item.type === "education" ? (
            /* Graduation Cap Icon */
            <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.263 10.185a.75.75 0 000 1.35l7.302 3.245a.75.75 0 00.67 0l7.302-3.245a.75.75 0 000-1.35L12.235 6.94a.75.75 0 00-.67 0L4.263 10.185zM4.263 10.185L11.5 13.4m0 0l7.237-3.215M11.5 13.4v5.356a1.5 1.5 0 00.865 1.354l.5.222a.75.75 0 00.67 0l.5-.222a1.5 1.5 0 00.865-1.354V13.4" />
            </svg>
          ) : (
            /* Briefcase Icon */
            <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .966-.784 1.75-1.75 1.75H5.5a1.75 1.75 0 01-1.75-1.75v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.5A2.25 2.25 0 003.25 14.15m17 0V9.45c0-.966-.784-1.75-1.75-1.75h-1.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75h-1.5c-.966 0-1.75.784-1.75 1.75v4.7m14.5 0H3.25" />
            </svg>
          )}
        </motion.div>
      </div>

      {/* Styled card wrapper matches reference timeline style */}
      <div className="flex flex-col gap-2 pb-12 pl-4 flex-1">
        <div className="rounded-2xl border border-white/5 bg-[#121214] p-6 shadow-xl relative overflow-hidden group hover:border-[#00ff88]/20 transition-all duration-300">
          <span className="text-xs font-mono text-[#00ff88] tracking-widest block mb-1">{item.period}</span>
          <h3 className="text-xl font-bold text-white group-hover:text-[#00ff88] transition-colors duration-200">{item.role}</h3>
          <span className="text-sm text-white/40 font-medium block mt-0.5 mb-3">{item.company}</span>
          <p className="text-sm text-white/50 leading-relaxed max-w-xl">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { ref, isInView } = useSectionInView();

  return (
    <section id="experience" ref={ref} className="py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_2fr] gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-32"
        >
          <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
            EXPERIENCE & EDUCATION
          </span>
          <h2 className="text-4xl font-black text-white mt-3 leading-tight tracking-tight">
            My Journey
          </h2>
          <div className="mt-3 w-12 h-px bg-[#00ff88]/40" />
          <p className="mt-6 text-sm text-white/25 leading-relaxed max-w-xs">
            A chronological timeline of academic achievements and professional roles in engineering.
          </p>
        </motion.div>

        <div className="relative pl-2">
          {/* Vertical timeline connector */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-5 top-5 bottom-0 w-px bg-gradient-to-b from-[#00ff88]/30 via-[#00ff88]/10 to-transparent origin-top"
          />
          {EXPERIENCES.map((item, i) => (
            <TimelineNode key={item.company + i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;