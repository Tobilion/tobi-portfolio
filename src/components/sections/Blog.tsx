import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { fadeUp, stagger } from "../../animations/variants";
import { Hammer, GraduationCap, Tv, MapPin, RefreshCw } from "lucide-react";

interface NowCard {
  icon: React.ElementType;
  label: string;
  title: string;
  body: string;
  accent: string;
  active: boolean;
  meta?: string;
}

const NOW_CARDS: NowCard[] = [
  {
    icon: Hammer,
    label: "Currently Building",
    title: "Football Simulators",
    body: "Working through bug fixes and UX improvements on Matchday Exchange and Football Manager Simulator. Summer plan: serious feature development on both — new match engine, better data visualisation, and multiplayer groundwork.",
    accent: "#0ea5e9",
    active: true,
    meta: "Active",
  },
  {
    icon: GraduationCap,
    label: "Current Focus",
    title: "University Exams",
    body: "Sitting my exams at Covenant University, Lagos. Fully heads-down on academics right now. Dev mode resumes in full once summer starts — already have a list of projects lined up.",
    accent: "#7c3aed",
    active: false,
    meta: "Until July",
  },
  {
    icon: Tv,
    label: "Learning From",
    title: "YouTube Tech Channels",
    body: "Keeping sharp between study sessions with engineering deep-dives and system design content. Building a mental list of techniques to apply once the summer build sprint kicks off.",
    accent: "#ef4444",
    active: false,
    meta: "Ongoing",
  },
];

function NowCardItem({ card, index }: { card: NowCard; index: number }): React.JSX.Element {
  const Icon = card.icon;
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 bg-[#F5F5F7]/85 dark:bg-zinc-900/85 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 hover:border-slate-300 dark:hover:border-zinc-700 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none"
    >
      {/* Accent bar */}
      <div className="h-1 w-full" style={{ background: card.accent }} />

      <div className="p-7 flex flex-col gap-5 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-2xl"
            style={{ background: `${card.accent}15`, border: `1px solid ${card.accent}25` }}
          >
            <Icon size={18} style={{ color: card.accent }} strokeWidth={2} />
          </div>
          <div className="flex items-center gap-1.5">
            {card.active && (
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: card.accent }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: card.accent }}
                />
              </span>
            )}
            <span
              className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: card.accent,
                background: `${card.accent}12`,
                border: `1px solid ${card.accent}25`,
              }}
            >
              {card.meta}
            </span>
          </div>
        </div>

        {/* Label + Title */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
            {card.label}
          </span>
          <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] leading-snug">
            {card.title}
          </h3>
        </div>

        {/* Body */}
        <p className="text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed flex-1">
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

export function Blog(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      id="blog"
      ref={ref}
      className="py-32 relative bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-mono text-[#0066CC] tracking-widest uppercase font-semibold"
          >
            06 / Now
          </motion.span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight"
              >
                What I'm Up To
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[#86868B] dark:text-zinc-400 max-w-md text-sm leading-relaxed"
              >
                A snapshot of where my head is at right now — building, studying, and preparing for a big summer.
              </motion.p>
            </div>
            {/* Last updated + location */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 text-[11px] font-mono text-slate-400 dark:text-zinc-500 shrink-0 pb-1"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={11} />
                Lagos, Nigeria
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw size={11} />
                Updated June 2026
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {NOW_CARDS.map((card, i) => (
            <NowCardItem key={card.label} card={card} index={i} />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 text-center text-[11px] font-mono text-slate-300 dark:text-zinc-700 tracking-wide"
        >
          This page is updated manually whenever something changes. Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-slate-400 dark:hover:text-zinc-500 transition-colors"
          >
            nownownow.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}

export default Blog;
