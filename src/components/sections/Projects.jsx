import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { PROJECTS } from "../../constants/portfolioData";
import { fadeUp, stagger } from "../../animations/variants";
import { TiltCard } from "../ui/TiltCard"; // Import Tilt
import { SpotlightCard } from "../ui/SpotlightCard"; // Import Spotlight

function ProjectCard({ project, index }) {
  const { ref, isInView } = useSectionInView(0.2);
  return (
    <TiltCard>
      <SpotlightCard 
        spotlightColor={`${project.color}15`}
        className="rounded-2xl border border-white/5 bg-[#121214] overflow-hidden flex flex-col h-full"
      >
        {/* Image placeholder wrapper */}
        <div
          className="h-44 w-full relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}10 0%, #111 100%)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, ${project.color}20 0%, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl font-black text-white/5 select-none"
            >
              {project.title.split(" ")[0]}
            </motion.div>
          </div>
          <div
            className="absolute top-4 right-4 w-2 h-2 rounded-full"
            style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
          />
        </div>

        {/* Card Content info */}
        <div className="p-6 flex flex-col gap-4 flex-1">
          <h3 className="text-base font-bold text-white">{project.title}</h3>
          <p className="text-sm text-white/35 leading-relaxed flex-1">{project.desc}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md font-mono"
                style={{
                  background: `${project.color}12`,
                  color: project.color,
                  border: `1px solid ${project.color}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 text-xs font-semibold text-center py-2.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all duration-200"
            >
              ↗ Live Demo
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 text-xs font-semibold text-center py-2.5 rounded-full transition-all duration-200"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              ⌥ GitHub
            </motion.a>
          </div>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
}

export function Projects() {
  const { ref, isInView } = useSectionInView();
  return (
    <section id="projects" ref={ref} className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 mb-16"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
            04 / Projects
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Selected Work
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/30 max-w-md text-sm">
            Projects built for production, open-source, and experiments that pushed boundaries.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}