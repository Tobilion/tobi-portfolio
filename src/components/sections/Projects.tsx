import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { PROJECTS } from "../../constants/portfolioData";
import { fadeUp, stagger } from "../../animations/variants";
import { TiltCard } from "../ui/TiltCard";
import { SpotlightCard } from "../ui/SpotlightCard";

interface Project {
  title: string;
  desc: string;
  tags: string[];
  color: string;
  githubUrl: string;
  demoUrl: string;
  npmUrl?: string;
  npmInstall?: string;
}

interface ProjectCardProps {
  project: Project;
}

/* ── Lazy-loaded SVG illustrations ── */

const NetPulseGraphic = lazy(() => import("../ui/project-graphics/NetPulseGraphic"));
const DreamKickGraphic = lazy(() => import("../ui/project-graphics/DreamKickGraphic"));
const HabitlineGraphic = lazy(() => import("../ui/project-graphics/HabitlineGraphic"));
const StudyFlashGraphic = lazy(() => import("../ui/project-graphics/StudyFlashGraphic"));
const LogAnalyzerGraphic = lazy(() => import("../ui/project-graphics/LogAnalyzerGraphic"));
const DuplicateFileGraphic = lazy(() => import("../ui/project-graphics/DuplicateFileGraphic"));
const InsightFlowGraphic = lazy(() => import("../ui/project-graphics/InsightFlowGraphic"));
const FootballBetGraphic = lazy(() => import("../ui/project-graphics/FootballBetGraphic"));
const FootballManagerGraphic = lazy(() => import("../ui/project-graphics/FootballManagerGraphic"));
const JokeKickGraphic = lazy(() => import("../ui/project-graphics/JokeKickGraphic"));

/* ── Real screenshot map — add entries here as you get more images ── */
const PROJECT_IMAGES: Record<string, string> = {
  "Matchday Exchange":          "/Images/Bet-simulator_demo.jpg",
  "SportSim Pro":               "/Images/sportsim_demo.jpg",
  "Local Project Console":      "/Images/project-console.png",
};

/* ── SVG project illustration router (fallback for projects without a screenshot) ── */

function ProjectIllustrationFallback(): React.JSX.Element {
  return <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900 animate-pulse" />;
}

function ProjectIllustration({ project }: { project: Project }): React.JSX.Element {
  const title = project.title.toLowerCase();
  let Graphic;
  if (title.includes("netpulse")) Graphic = NetPulseGraphic;
  else if (title.includes("dream kick")) Graphic = DreamKickGraphic;
  else if (title.includes("habit")) Graphic = HabitlineGraphic;
  else if (title.includes("studyflash") || title.includes("flashcard")) Graphic = StudyFlashGraphic;
  else if (title.includes("log")) Graphic = LogAnalyzerGraphic;
  else if (title.includes("duplicate")) Graphic = DuplicateFileGraphic;
  else if (title.includes("insight")) Graphic = InsightFlowGraphic;
  else if (title.includes("matchday") || title.includes("bet")) Graphic = FootballBetGraphic;
  else if (title.includes("manager") || title.includes("sport")) Graphic = FootballManagerGraphic;
  else if (title.includes("joke")) Graphic = JokeKickGraphic;
  else Graphic = InsightFlowGraphic;
  return (
    <Suspense fallback={<ProjectIllustrationFallback />}>
      <Graphic color={project.color} />
    </Suspense>
  );
}

/* ── Project Card ── */

const ProjectCard = React.memo(function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <TiltCard>
      <SpotlightCard
        spotlightColor={`${project.color}08`}
        className="rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 bg-[#F5F5F7]/85 dark:bg-zinc-900/85 backdrop-blur-md overflow-hidden flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300"
        style={{ '--proj-color': project.color } as React.CSSProperties}
      >
        {/* Project preview — real screenshot or SVG fallback */}
        {(() => {
          const img = PROJECT_IMAGES[project.title];
          return img ? (
            <div className="h-44 w-full relative overflow-hidden">
              <img
                src={img}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F5F5F7]/80 dark:from-zinc-900/80 to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--proj-color)]" />
            </div>
          ) : (
            <div className="h-44 w-full relative overflow-hidden bg-[#F5F5F7] dark:bg-zinc-950 transition-colors duration-300">
              <ProjectIllustration project={project} />
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--proj-color)]" />
            </div>
          );
        })()}

        {/* Card Content info */}
        <div className="p-6 flex flex-col gap-4 flex-1">
          <h3 className="text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{project.title}</h3>
          <p className="text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed flex-1">{project.desc}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md font-mono font-semibold bg-[var(--proj-color)]/5 text-[var(--proj-color)] border border-[var(--proj-color)]/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.npmUrl && project.npmInstall && (
            <a
              href={project.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono py-2 px-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-slate-500 dark:text-zinc-400 hover:text-[var(--proj-color)] hover:border-[var(--proj-color)]/30 transition-all duration-200 cursor-pointer"
            >
              <span className="text-[var(--proj-color)]">$</span>
              <span className="truncate">{project.npmInstall}</span>
              <span className="ml-auto shrink-0">↗ npm</span>
            </a>
          )}

          <div className="flex gap-3 pt-2">
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 text-xs font-semibold text-center py-2.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
              >
                ↗ Live Demo
              </motion.a>
            )}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 text-xs font-semibold text-center py-2.5 rounded-full transition-all duration-200 cursor-pointer text-white shadow-sm bg-[var(--proj-color)] border border-[var(--proj-color)]"
            >
              ⌥ GitHub
            </motion.a>
          </div>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
});

export function Projects(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();
  return (
    <section id="projects" ref={ref} className="py-32 relative bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 mb-16"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono text-[#0066cc] tracking-widest uppercase font-semibold">
            04 / Projects
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Selected Work
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#86868B] dark:text-zinc-400 max-w-md text-sm leading-relaxed">
            Projects built for production, open-source, and experiments that pushed boundaries.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => <ProjectCard key={p.title} project={p as Project} />)}
        </div>
      </div>
    </section>
  );
}

export default Projects;
