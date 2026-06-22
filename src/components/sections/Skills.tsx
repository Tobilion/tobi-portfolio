import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { SKILLS } from "../../constants/portfolioData";
import { fadeUp, stagger } from "../../animations/variants";
import TiltCard from "../ui/TiltCard";
import SpotlightCard from "../ui/SpotlightCard";

interface SkillPillProps {
  label: string;
}

function SkillPill({ label }: SkillPillProps): React.JSX.Element {
  return (
    <motion.span
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(0, 102, 204, 0.3)",
      }}
      className="px-3 py-1.5 rounded-full text-xs font-mono text-[#86868B] dark:text-zinc-400 border border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:text-[#1D1D1F] dark:hover:text-zinc-200 transition-colors duration-200 cursor-default"
    >
      {label}
    </motion.span>
  );
}

interface BentoCardProps {
  title: string;
  items: string[];
  span?: string;
  icon: string;
}

function BentoCard({ title, items, span = "", icon }: BentoCardProps): React.JSX.Element {
  return (
    <TiltCard className={span}>
      <SpotlightCard
        spotlightColor="rgba(0, 102, 204, 0.04)"
        className="rounded-3xl p-6 border border-slate-200/50 dark:border-zinc-800/50 bg-[#F5F5F7]/85 dark:bg-zinc-900/85 backdrop-blur-md h-full shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none"
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-lg">{icon}</span>
            <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-wide uppercase">{title}</h3>
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

interface CardConfig {
  title: string;
  items: string[];
  span: string;
  icon: string;
}

export function Skills(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();

  const cards: CardConfig[] = [
    { title: "Languages", items: SKILLS.Languages, span: "lg:col-span-2", icon: "🌌" },
    { title: "Dev Tools", items: SKILLS["Dev Tools"], span: "", icon: "🛠️" },
    { title: "Architecture", items: SKILLS.Architecture, span: "lg:col-span-2", icon: "🏗️" },
    { title: "Currently Learning", items: ["WebAssembly", "eBPF", "Temporal", "Nix"], span: "", icon: "🧪" },
  ];

  return (
    <section id="skills" ref={ref} className="py-32 relative bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 mb-16"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono text-[#0066CC] tracking-widest uppercase font-semibold">
            02 / Skills
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Technical Stack
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#86868B] dark:text-zinc-400 max-w-md text-sm leading-relaxed">
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
