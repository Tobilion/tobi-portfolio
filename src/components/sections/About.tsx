import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import MagneticButton from "../ui/MagneticButton";
import { fadeUp, stagger } from "../../animations/variants";
import SolarSystem, { TimelineItem } from "../ui/solar-system";
import { Code, Terminal, Database, Cpu, Binary, Brain } from "lucide-react";
import { MetalButton } from "../ui/liquid-glass-button";

const languageData: TimelineItem[] = [
  {
    id: 1,
    title: "TypeScript",
    date: "Daily driver",
    content:
      "My main language for the web — this portfolio and both football simulators are written in it. I like the safety net the types give me as projects grow.",
    category: "Languages",
    icon: Code,
    relatedIds: [2, 4],
    status: "completed",
    energy: 75,
  },
  {
    id: 2,
    title: "JavaScript",
    date: "Daily",
    content:
      "Where I started with web development — the foundation under everything I build in the browser, from DOM logic to the match engines in my simulators.",
    category: "Languages",
    icon: Terminal,
    relatedIds: [1, 4],
    status: "completed",
    energy: 78,
  },
  {
    id: 3,
    title: "Python",
    date: "Project work",
    content:
      "My tool for desktop utilities and data work — InsightFlow (PySide6 + Pandas) and the Duplicate File Analyzer CLI are both built with it.",
    category: "Languages",
    icon: Brain,
    relatedIds: [6],
    status: "completed",
    energy: 70,
  },
  {
    id: 4,
    title: "React",
    date: "Every web project",
    content:
      "The framework behind all my deployed projects — component design, hooks, and animation with Framer Motion.",
    category: "Frameworks",
    icon: Binary,
    relatedIds: [1, 5],
    status: "completed",
    energy: 72,
  },
  {
    id: 5,
    title: "Tailwind CSS",
    date: "Every project",
    content:
      "How I style everything I ship — fast to iterate with, and it keeps my designs consistent across projects.",
    category: "Frameworks",
    icon: Cpu,
    relatedIds: [4],
    status: "completed",
    energy: 68,
  },
  {
    id: 6,
    title: "SQL",
    date: "In coursework",
    content:
      "Currently learning relational databases and query design as part of my CS degree — next on the list for my projects.",
    category: "Languages",
    icon: Database,
    relatedIds: [3],
    status: "in-progress",
    energy: 40,
  },
];

export function About(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 relative bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 mb-14"
        >
          <span className="text-xs font-mono text-[#0066cc] tracking-widest uppercase font-semibold">
            01 / About Me
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Tech Solar System
          </h2>
          <p className="text-sm text-[#86868B] dark:text-zinc-400 max-w-md leading-relaxed">
            Each planet is a language or tool I build with — orbit speed reflects how often I use it.
            Click any planet to see proficiency &amp; ecosystem connections.
          </p>
        </motion.div>

        {/* Two-column layout: solar system left, bio right */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          {/* Solar system — full width, large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full flex items-center justify-center"
          >
            <SolarSystem timelineData={languageData} />
          </motion.div>

          {/* Bio card */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-8"
          >
            <div className="rounded-3xl border border-slate-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 backdrop-blur-md p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.025)] dark:shadow-none hover:border-slate-200 dark:hover:border-zinc-700 transition-all duration-300">
              <motion.p
                variants={fadeUp}
                className="text-[#86868B] dark:text-zinc-400 leading-[1.8] text-base mb-6"
              >
                I'm Tobiloba Jagun, a computer science student at Covenant
                University. It all started with numbers — as a kid I'd spend
                hours playing with the maths books my mum left me, and that
                love of maths (Further Maths especially) never left. These
                days it shows up as an obsession with building things in code.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[#86868B] dark:text-zinc-400 leading-[1.8] text-base mb-8"
              >
                The tech spark came from watching Iron Man — Jarvis, the
                gadgets, the idea that you can build your way out of any
                problem. I keep that curiosity fed with tech YouTube and
                builder biographies, and I put it to work shipping web apps
                and simulation games. I'm still figuring out exactly where
                I'll make my mark — but I'm building towards it every day.
              </motion.p>

              <MagneticButton className="w-fit">
                <MetalButton
                  variant="success"
                  onClick={() =>
                    window.open("/Tobiloba_Jagun_CV.pdf", "_blank")
                  }
                >
                  <svg
                    className="w-4 h-4 inline-block mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download CV
                </MetalButton>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
