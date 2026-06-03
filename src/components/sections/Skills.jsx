import React from "react";
import { motion } from "framer-motion";
import useSectionInView from "../../hooks/useSectionInView";
import { SKILLS } from "../../constants/portfolioData";
import { fadeUp, stagger } from "../../animations/variants";
import TiltCard from "../ui/TiltCard";
import SpotlightCard from "../ui/SpotlightCard";

function SkillPill({ label }) {
  return (
    <motion.span
      whileHover={{
        scale: 1.05,
        borderColor: "rgba(0,255,136,0.4)",
        color: "rgba(255,255,255,0.9)",
      }}
      className="px-3 py-1.5 rounded-full text-xs font-mono text-white/40 border border-white/10 bg-white/[0.03] transition-colors duration-200 cursor-default"
    >
      {label}
    </motion.span>
  );
}

function BentoCard({ title, items, span = "", accent = "#00ff88", icon }) {
  return (
    <TiltCard className={span}>
      <SpotlightCard
        spotlightColor={`${accent}15`}
        className="rounded-2xl p-6 border border-white/5 bg-[#0d0d0f]/60 backdrop-blur-xl h-full"
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-lg">{icon}</span>
            <h3 className="text-sm font-bold text-white/80 tracking-wide uppercase">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <SkillPill key={item} label={item} />
            ))}
          </div>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
}

export function Skills() {
  const { ref, isInView } = useSectionInView();

  const cards = [
    { title: "Languages", items: SKILLS.Languages, span: "lg:col-span-2", accent: "#00ff88", icon: "🌌" },
    { title: "Dev Tools", items: SKILLS["Dev Tools"], span: "", accent: "#7c3aed", icon: "🛠️" },
    { title: "Architecture", items: SKILLS.Architecture, span: "lg:col-span-2", accent: "#0ea5e9", icon: "🏗️" },
    {
      title: "Currently Learning",
      items: ["WebAssembly", "eBPF", "Temporal", "Nix"],
      span: "",
      accent: "#f59e0b",
      icon: "🧪",
    },
  ];

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 mb-16"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
            02 / Skills
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Technical Stack
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/30 max-w-md text-sm">
            A curated toolkit refined over years of production systems, open-source contributions, and deep technical curiosity.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {cards.map((card, i) => (
            <motion.div key={card.title} variants={fadeUp} custom={i} className={card.span}>
              <BentoCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;