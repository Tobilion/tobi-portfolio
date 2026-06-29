import React from "react";
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
}

interface ProjectCardProps {
  project: Project;
}

/* ── Project-specific inline SVG illustrations ── */

function LogAnalyzerGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Log Analyzer terminal dashboard graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      {/* Terminal title bar */}
      <rect x="0" y="0" width="400" height="24" rx="8" fill={`${color}15`} />
      <circle cx="16" cy="12" r="4" fill={`${color}40`} />
      <circle cx="28" cy="12" r="4" fill={`${color}30`} />
      <circle cx="40" cy="12" r="4" fill={`${color}20`} />
      <text x="200" y="16" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="600">log_analyzer — tail -f</text>
      {/* Log lines */}
      <text x="16" y="44" fill={`${color}90`} fontSize="9" fontFamily="monospace">
        [INFO]  Server listening on port 8080<tspan fill={color}> ▎</tspan>
      </text>
      <text x="16" y="60" fill={`${color}70`} fontSize="9" fontFamily="monospace">
        [DEBUG] Buffer flushed — chunk size 4.2 KB
      </text>
      <text x="16" y="76" fill={`${color}70`} fontSize="9" fontFamily="monospace">
        [WARN]  Response latency spike detected — 1200ms<tspan fill={`${color}`}> ⚠</tspan>
      </text>
      <text x="16" y="92" fill={`${color}60`} fontSize="9" fontFamily="monospace">
        [INFO]  Reconnecting idle worker pool...
      </text>
      {/* Pulse wave */}
      <motion.path
        d="M0 140 Q50 120 100 140 T200 140 T300 140 T400 140"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity={0.4}
        animate={{ d: ["M0 140 Q50 120 100 140 T200 140 T300 140 T400 140", "M0 140 Q50 160 100 140 T200 140 T300 140 T400 140", "M0 140 Q50 120 100 140 T200 140 T300 140 T400 140"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0 150 Q50 140 100 150 T200 150 T300 150 T400 150"
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        opacity={0.2}
        animate={{ d: ["M0 150 Q50 140 100 150 T200 150 T300 150 T400 150", "M0 150 Q50 160 100 150 T200 150 T300 150 T400 150", "M0 150 Q50 140 100 150 T200 150 T300 150 T400 150"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Alert badge */}
      <rect x="280" y="110" width="104" height="20" rx="4" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <text x="332" y="123" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">3 CRITICAL ALERTS</text>
    </svg>
  );
}

function DuplicateFileGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Duplicate File Analyzer hashing graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      {/* File blocks */}
      <rect x="40" y="30" width="80" height="100" rx="4" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <rect x="50" y="42" width="60" height="4" rx="1" fill={`${color}60`} />
      <rect x="50" y="54" width="40" height="4" rx="1" fill={`${color}40`} />
      <rect x="50" y="66" width="52" height="4" rx="1" fill={`${color}40`} />
      <rect x="50" y="78" width="30" height="4" rx="1" fill={`${color}40`} />
      <rect x="50" y="90" width="48" height="4" rx="1" fill={`${color}40`} />
      <text x="80" y="148" textAnchor="middle" fill={`${color}80`} fontSize="7" fontFamily="monospace">File A</text>

      <rect x="140" y="30" width="80" height="100" rx="4" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <rect x="150" y="42" width="60" height="4" rx="1" fill={`${color}60`} />
      <rect x="150" y="54" width="40" height="4" rx="1" fill={`${color}40`} />
      <rect x="150" y="66" width="52" height="4" rx="1" fill={`${color}40`} />
      <rect x="150" y="78" width="30" height="4" rx="1" fill={`${color}40`} />
      <rect x="150" y="90" width="48" height="4" rx="1" fill={`${color}40`} />
      <text x="180" y="148" textAnchor="middle" fill={`${color}80`} fontSize="7" fontFamily="monospace">File B</text>

      {/* Scanner laser */}
      <motion.rect
        x="40" y="70" width="180" height="2" rx="1" fill={color}
        animate={{ y: [70, 120, 70] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.5}
      />
      {/* Cryptographic hash display */}
      <motion.rect x="240" y="55" width="128" height="48" rx="6" fill={`${color}15`} stroke={color} strokeWidth="0.8"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <text x="304" y="72" textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" fontWeight="700">SHA-256</text>
      <text x="304" y="88" textAnchor="middle" fill={`${color}80`} fontSize="6" fontFamily="monospace">f7a3b...9c1d2</text>
      <text x="304" y="98" textAnchor="middle" fill={`${color}50`} fontSize="6" fontFamily="monospace">MATCH ✓</text>
    </svg>
  );
}

function VaultexGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Vaultex secrets manager graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      {/* Shield / Vault outline */}
      <motion.path
        d="M200 24 L290 60 L290 105 Q290 140 200 160 Q110 140 110 105 L110 60 Z"
        fill={`${color}10`}
        stroke={color}
        strokeWidth="1.2"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "200px 92px" }}
      />
      {/* Key icon inside shield */}
      <circle cx="185" cy="85" r="6" stroke={color} strokeWidth="1.2" fill={`${color}15`} />
      <line x1="190" y1="88" x2="205" y2="103" stroke={color} strokeWidth="1.2" />
      <line x1="198" y1="94" x2="208" y2="94" stroke={color} strokeWidth="1.2" />
      {/* Encryption particles */}
      <motion.circle cx="240" cy="40" r="2" fill={color} animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="310" cy="55" r="2" fill={color} animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <motion.circle cx="150" cy="38" r="1.5" fill={color} animate={{ opacity: [0, 0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }} />
      <motion.circle cx="265" cy="145" r="2" fill={color} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.9 }} />
      {/* Lock badge */}
      <rect x="280" y="125" width="96" height="20" rx="4" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <text x="328" y="138" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">AES-256-GCM</text>
    </svg>
  );
}

function InsightFlowGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="InsightFlow data analysis utility graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      {/* Pipeline flow */}
      <motion.path
        d="M50 88 H350"
        stroke={`${color}40`}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle cx="50" cy="88" r="8" fill={`${color}60`} />
      <circle cx="200" cy="88" r="8" fill={`${color}60`} />
      <circle cx="350" cy="88" r="8" fill={`${color}60`} />
      
      {/* Charts */}
      <rect x="180" y="40" width="40" height="30" rx="2" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <rect x="185" y="55" width="8" height="15" rx="1" fill={color} />
      <rect x="195" y="45" width="8" height="25" rx="1" fill={color} />
      <rect x="205" y="50" width="8" height="20" rx="1" fill={color} />

      {/* Wizard steps decoration */}
      <text x="50" y="110" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace">Fetch</text>
      <text x="200" y="110" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace">Analyze</text>
      <text x="350" y="110" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace">Export</text>
    </svg>
  );
}

function FootballBetGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Football bet simulator dashboard graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      {/* Odds board */}
      <rect x="20" y="30" width="160" height="110" rx="6" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <text x="32" y="52" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">LIVE MATCH ODDS</text>
      <text x="32" y="72" fill={`${color}80`} fontSize="8" fontFamily="monospace">ARS vs CHE: 1.85 | 3.40</text>
      <text x="32" y="88" fill={`${color}80`} fontSize="8" fontFamily="monospace">MUN vs MCI: 3.10 | 2.10</text>
      <text x="32" y="104" fill={`${color}80`} fontSize="8" fontFamily="monospace">LIV vs RM : 2.25 | 2.80</text>
      
      {/* Bet ticket */}
      <rect x="200" y="30" width="180" height="110" rx="6" fill={`${color}15`} stroke={color} strokeWidth="0.8" />
      <text x="212" y="52" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">BET SLIP — ACTIVE</text>
      <line x1="212" y1="62" x2="368" y2="62" stroke={`${color}30`} strokeWidth="1" />
      <text x="212" y="78" fill={`${color}90`} fontSize="8" fontFamily="monospace">Selection: MCI to Win</text>
      <text x="212" y="92" fill={`${color}90`} fontSize="8" fontFamily="monospace">Stake: $100.00 @ 2.10</text>
      <text x="212" y="106" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">Est. Return: $210.00</text>
      
      {/* Animated pulse indicator */}
      <motion.circle
        cx="160"
        cy="49"
        r="3"
        fill={color}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Profit Line Chart */}
      <motion.path
        d="M212 130 L250 125 L290 132 L330 115 L368 122"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity={0.7}
        animate={{ d: [
          "M212 130 L250 125 L290 132 L330 115 L368 122",
          "M212 130 L250 120 L290 135 L330 110 L368 125",
          "M212 130 L250 125 L290 132 L330 115 L368 122"
        ] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function FootballManagerGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Football manager simulator tactical graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      {/* Football pitch background style */}
      <rect x="20" y="20" width="220" height="136" rx="4" fill={`${color}04`} stroke={`${color}20`} strokeWidth="0.8" />
      {/* Pitch markings */}
      <line x1="130" y1="20" x2="130" y2="156" stroke={`${color}20`} strokeWidth="0.8" />
      <circle cx="130" cy="88" r="24" stroke={`${color}20`} strokeWidth="0.8" fill="none" />
      <circle cx="130" cy="88" r="2" fill={`${color}30`} />
      {/* Penalty boxes */}
      <rect x="20" y="53" width="25" height="70" stroke={`${color}20`} strokeWidth="0.8" fill="none" />
      <rect x="215" y="53" width="25" height="70" stroke={`${color}20`} strokeWidth="0.8" fill="none" />
      
      {/* Tactical Nodes */}
      <motion.circle cx="50" cy="88" r="5" fill={color} stroke="#fff" strokeWidth="1" />
      
      <motion.circle 
        cx="90" 
        cy="50" 
        r="5" 
        fill={color} 
        stroke="#fff" 
        strokeWidth="1"
        animate={{ cx: [90, 95, 90], cy: [50, 48, 50] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle 
        cx="90" 
        cy="126" 
        r="5" 
        fill={color} 
        stroke="#fff" 
        strokeWidth="1"
        animate={{ cx: [90, 85, 90], cy: [126, 128, 126] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.circle 
        cx="140" 
        cy="88" 
        r="5" 
        fill={color} 
        stroke="#fff" 
        strokeWidth="1"
        animate={{ cx: [140, 145, 140], cy: [88, 92, 88] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle 
        cx="180" 
        cy="45" 
        r="5" 
        fill={color} 
        stroke="#fff" 
        strokeWidth="1"
        animate={{ cx: [180, 190, 180] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle 
        cx="200" 
        cy="88" 
        r="5" 
        fill={color} 
        stroke="#fff" 
        strokeWidth="1"
        animate={{ cx: [200, 205, 200], cy: [88, 80, 88] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Tactical pass path */}
      <motion.path
        d="M145 88 L195 88"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity={0.6}
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Dashboard Stats */}
      <rect x="260" y="20" width="120" height="136" rx="6" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <text x="272" y="42" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">TACTICS BOARD</text>
      <text x="272" y="62" fill={`${color}90`} fontSize="8" fontFamily="monospace">Style: Attacking</text>
      <text x="272" y="78" fill={`${color}90`} fontSize="8" fontFamily="monospace">Formation: 4-3-3</text>
      <text x="272" y="94" fill={`${color}90`} fontSize="8" fontFamily="monospace">Possession: 58%</text>
      <text x="272" y="110" fill={`${color}90`} fontSize="8" fontFamily="monospace">Rating: 4.8★</text>
      
      {/* Match clock */}
      <rect x="272" y="124" width="48" height="16" rx="3" fill={`${color}25`} />
      <text x="296" y="135" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">82:14</text>
    </svg>
  );
}

/* ── Real screenshot map — add entries here as you get more images ── */
const PROJECT_IMAGES: Record<string, string> = {
  "Football Bet Simulator":     "/Images/Bet-simulator_demo.jpg",
  "Football Manager Simulator": "/Images/sportsim_demo.jpg",
};

/* ── SVG project illustration router (fallback for projects without a screenshot) ── */

function ProjectIllustration({ project }: { project: Project }): React.JSX.Element {
  const title = project.title.toLowerCase();
  if (title.includes("log")) return <LogAnalyzerGraphic color={project.color} />;
  if (title.includes("duplicate")) return <DuplicateFileGraphic color={project.color} />;
  if (title.includes("insight")) return <InsightFlowGraphic color={project.color} />;
  if (title.includes("bet")) return <FootballBetGraphic color={project.color} />;
  if (title.includes("manager") || title.includes("sport")) return <FootballManagerGraphic color={project.color} />;
  return <VaultexGraphic color={project.color} />;
}

/* ── Project Card ── */

function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <TiltCard>
      <SpotlightCard
        spotlightColor={`${project.color}08`}
        className="rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 bg-[#F5F5F7]/85 dark:bg-zinc-900/85 backdrop-blur-md overflow-hidden flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300"
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
              {/* Subtle bottom fade so the card content blends in */}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F5F5F7]/80 dark:from-zinc-900/80 to-transparent pointer-events-none" />
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full"
                style={{ background: project.color }}
              />
            </div>
          ) : (
            <div className="h-44 w-full relative overflow-hidden bg-[#F5F5F7] dark:bg-zinc-950 transition-colors duration-300">
              <ProjectIllustration project={project} />
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full"
                style={{ background: project.color }}
              />
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
                className="text-xs px-2.5 py-1 rounded-md font-mono font-semibold"
                style={{
                  background: `${project.color}08`,
                  color: project.color,
                  border: `1px solid ${project.color}15`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

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
              className="flex-1 text-xs font-semibold text-center py-2.5 rounded-full transition-all duration-200 cursor-pointer text-white shadow-sm"
              style={{
                background: project.color,
                border: `1px solid ${project.color}`,
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
