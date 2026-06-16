import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { EXPERIENCES } from "../../constants/portfolioData";
import DisplayCards from "../ui/display-cards";
import { GraduationCap, Briefcase, ChevronUp } from "lucide-react";

function TimelineNode({ item, index }) {
  const { ref, isInView } = useSectionInView(0.3);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-8 pl-8 animate-in fade-in-0 slide-in-from-left-5 duration-500"
    >
      {/* Visual Timeline Path dot and Icon */}
      <div className="absolute left-0 top-1 flex flex-col items-center">
        <motion.div
          animate={isInView ? { scale: [0, 1.2, 1], opacity: [0, 1, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-[#0066cc]/30 flex items-center justify-center relative z-10 text-xs shadow-md shadow-[#0066cc]/5"
        >
          {item.type === "education" ? (
            <GraduationCap className="w-5 h-5 text-[#0066cc]" />
          ) : (
            <Briefcase className="w-5 h-5 text-[#0066cc]" />
          )}
        </motion.div>
      </div>

      {/* Styled card wrapper matches reference timeline style */}
      <div className="flex flex-col gap-2 pb-12 pl-4 flex-1">
        <div className="rounded-3xl border border-slate-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 shadow-md shadow-slate-200/5 dark:shadow-none relative overflow-hidden group hover:border-[#0066cc]/30 transition-all duration-300">
          <span className="text-xs font-mono text-[#0066cc] tracking-widest font-semibold block mb-1">{item.period}</span>
          <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0066cc] transition-colors duration-200">{item.role}</h3>
          <span className="text-sm text-slate-500 dark:text-zinc-400 font-medium block mt-0.5 mb-3">{item.company}</span>
          <p className="text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed max-w-xl">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

const experienceStackCards = [
  {
    icon: <GraduationCap className="size-4 text-blue-600 dark:text-blue-455" />,
    title: "Covenant University",
    description: "B.Sc. Computer Science (2024 - Pres)",
    date: "Education Journey",
    iconClassName: "bg-blue-50 p-1 rounded-full text-blue-600 border border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40",
    titleClassName: "text-blue-600 dark:text-blue-400 font-semibold",
    className: "[grid-area:stack] hover:-translate-y-10 border-slate-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900 shadow-md shadow-slate-200/20 dark:shadow-none grayscale-[100%] hover:before:opacity-0 hover:grayscale-0",
  },
  {
    icon: <Briefcase className="size-4 text-purple-600 dark:text-purple-455" />,
    title: "Quantum Systems",
    description: "Senior Software Engineer (2023 - Pres)",
    date: "Work History",
    iconClassName: "bg-purple-50 p-1 rounded-full text-purple-600 border border-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/40",
    titleClassName: "text-purple-600 dark:text-purple-400 font-semibold",
    className: "[grid-area:stack] translate-x-8 translate-y-6 hover:-translate-y-4 border-slate-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900 shadow-md shadow-slate-200/20 dark:shadow-none grayscale-[100%] hover:before:opacity-0 hover:grayscale-0",
  },
  {
    icon: <Briefcase className="size-4 text-amber-600" />,
    title: "NexaCloud",
    description: "Full-Stack Engineer (2021 - 2023)",
    date: "Work History",
    iconClassName: "bg-amber-50 p-1 rounded-full text-amber-600 border border-amber-100 dark:bg-amber-955/40 dark:text-amber-400 dark:border-amber-900/40",
    titleClassName: "text-amber-600 dark:text-amber-400 font-semibold",
    className: "[grid-area:stack] translate-x-16 translate-y-12 hover:-translate-y-2 border-slate-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900 shadow-md shadow-slate-200/20 dark:shadow-none grayscale-[100%] hover:before:opacity-0 hover:grayscale-0",
  },
  {
    icon: <Briefcase className="size-4 text-green-600 dark:text-emerald-450" />,
    title: "Vertex Labs",
    description: "Software Developer (2019 - 2021)",
    date: "Work History",
    iconClassName: "bg-green-50 p-1 rounded-full text-green-600 border border-green-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
    titleClassName: "text-green-600 dark:text-emerald-400 font-semibold",
    className: "[grid-area:stack] translate-x-24 translate-y-18 hover:translate-y-8 border-slate-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900 shadow-md shadow-slate-200/20 dark:shadow-none",
  },
];

export function Experience() {
  const { ref, isInView } = useSectionInView();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="experience" ref={ref} className="py-32 relative bg-white dark:bg-[#0B0B0C] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_2.2fr] gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-32"
        >
          <span className="text-xs font-mono text-[#0066cc] tracking-widest uppercase font-semibold">
            EXPERIENCE & EDUCATION
          </span>
          <h2 className="text-4xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] mt-3 leading-tight tracking-tight">
            My Journey
          </h2>
          <div className="mt-3 w-12 h-px bg-[#0066cc]/40" />
          <p className="mt-6 text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed max-w-xs">
            An interactive timeline of my professional experience and academic milestones. Click the stack to explore.
          </p>
        </motion.div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-6 w-full cursor-pointer group"
                onClick={() => setIsExpanded(true)}
              >
                <div className="relative w-full max-w-[28rem] h-[320px] flex items-center justify-center">
                  <DisplayCards cards={experienceStackCards} />
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-6 py-3 rounded-full border border-[#0066cc]/30 bg-[#0066cc]/5 hover:bg-[#0066cc]/10 text-xs font-mono font-semibold tracking-wider text-[#0066cc] uppercase transition-colors"
                >
                  Click Stack to Expand Journey Timeline →
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative pl-2"
              >
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
                    Journey Timeline
                  </h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="px-4 py-2 text-xs font-mono font-semibold rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronUp size={14} />
                    Collapse Stack
                  </button>
                </div>

                <div className="relative">
                  {/* Vertical timeline connector */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute left-5 top-5 bottom-0 w-px bg-gradient-to-b from-[#0066cc]/30 via-[#0066cc]/10 to-transparent origin-top"
                  />
                  {EXPERIENCES.map((item, i) => (
                    <TimelineNode key={item.company + i} item={item} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Experience;