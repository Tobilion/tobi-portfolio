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
    date: "Expert",
    content:
      "My primary tool for building scalable web apps, robust backend services, and type-safe developer tooling. Extensive experience in React and Node.js ecosystems.",
    category: "Languages",
    icon: Code,
    relatedIds: [4, 6],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Python",
    date: "Expert",
    content:
      "Extensively used for data engineering pipelines, ML infrastructure, automation scripting, and backend development with FastAPI/PyTorch.",
    category: "Languages",
    icon: Brain,
    relatedIds: [1, 6],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Rust",
    date: "Advanced",
    content:
      "Utilized for performance-critical systems, WebAssembly tooling, network protocol design, and safe concurrency patterns.",
    category: "Languages",
    icon: Terminal,
    relatedIds: [5],
    status: "in-progress",
    energy: 80,
  },
  {
    id: 4,
    title: "Go",
    date: "Advanced",
    content:
      "Used to build highly concurrent microservices, CLI tools, Kubernetes controllers, and high-performance network daemons.",
    category: "Languages",
    icon: Binary,
    relatedIds: [1, 6],
    status: "in-progress",
    energy: 85,
  },
  {
    id: 5,
    title: "C++",
    date: "Intermediate",
    content:
      "Applied for graphics rendering engines, algorithm performance optimizations, and memory-constrained system engineering.",
    category: "Languages",
    icon: Cpu,
    relatedIds: [3],
    status: "pending",
    energy: 65,
  },
  {
    id: 6,
    title: "SQL",
    date: "Expert",
    content:
      "Proficient in database schema design, indexing strategies, querying optimization, and transactional performance tuning in PostgreSQL.",
    category: "Languages",
    icon: Database,
    relatedIds: [1, 2, 4],
    status: "completed",
    energy: 88,
  },
];

export function About(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 relative bg-white dark:bg-[#0B0B0C] transition-colors duration-300"
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
            Each planet represents a language I work with — orbit speed reflects how often I use it.
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
                I'm a passionate software engineer with a deep obsession for
                distributed systems, developer experience, and the craftsmanship
                of high-quality software. My journey started tinkering with
                network protocols at 14 — today I architect systems at scale.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[#86868B] dark:text-zinc-400 leading-[1.8] text-base mb-8"
              >
                My approach combines clean code principles with modern design
                aesthetics, ensuring that every project delivers exceptional value
                to users and stakeholders alike. I believe the best code is
                invisible — it empowers teams, survives ambiguity, and ages
                gracefully.
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
