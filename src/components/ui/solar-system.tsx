"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface SolarSystemProps {
  timelineData: TimelineItem[];
}

// Each planet lives on its own orbit ring at a unique radius + speed
const ORBIT_CONFIG = [
  { radius: 72,  speed: 0.45,  size: 38 },
  { radius: 108, speed: 0.28,  size: 34 },
  { radius: 148, speed: 0.18,  size: 36 },
  { radius: 190, speed: 0.13,  size: 32 },
  { radius: 230, speed: 0.09,  size: 34 },
  { radius: 268, speed: 0.065, size: 30 },
];

function statusLabel(s: TimelineItem["status"]): string {
  return s === "completed" ? "EXPERT" : s === "in-progress" ? "ADVANCED" : "INTERMEDIATE";
}

function statusClass(s: TimelineItem["status"]): string {
  switch (s) {
    case "completed":   return "text-[#0066CC] dark:text-blue-400 border-[#0066CC]/30 bg-[#0066CC]/5";
    case "in-progress": return "text-purple-600 dark:text-purple-400 border-purple-300/40 bg-purple-50/50 dark:bg-purple-950/20";
    default:            return "text-slate-500 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50";
  }
}

export default function SolarSystem({ timelineData }: SolarSystemProps) {
  // Angle for each planet tracked independently (degrees)
  const anglesRef = useRef<number[]>(
    timelineData.map((_, i) => (i / timelineData.length) * 360)
  );
  const rafRef    = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const [, forceRender] = useState(0); // trigger re-render each frame

  const [activeId,   setActiveId]   = useState<number | null>(null);
  const [relatedIds, setRelatedIds] = useState<number[]>([]);

  // rAF animation loop — smooth 60fps, no jank
  const animate = useCallback(() => {
    if (!pausedRef.current) {
      anglesRef.current = anglesRef.current.map((a, i) => {
        const cfg = ORBIT_CONFIG[i] ?? ORBIT_CONFIG[ORBIT_CONFIG.length - 1];
        return (a + cfg.speed * 0.4) % 360; // step per frame
      });
      forceRender(n => n + 1);
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handlePlanetClick = (e: React.MouseEvent, item: TimelineItem) => {
    e.stopPropagation();
    if (activeId === item.id) {
      setActiveId(null);
      setRelatedIds([]);
      pausedRef.current = false;
    } else {
      setActiveId(item.id);
      setRelatedIds(item.relatedIds);
      pausedRef.current = true; // freeze orbit while card is open
    }
  };

  const handleBackdropClick = () => {
    setActiveId(null);
    setRelatedIds([]);
    pausedRef.current = false;
  };

  const activeItem = timelineData.find(t => t.id === activeId) ?? null;

  return (
    <div
      className="relative w-full flex items-center justify-center select-none"
      style={{ height: 580 }}
      onClick={handleBackdropClick}
    >
      {/* ── Orbit rings ── */}
      {timelineData.map((_, i) => {
        const cfg = ORBIT_CONFIG[i] ?? ORBIT_CONFIG[ORBIT_CONFIG.length - 1];
        const d = cfg.radius * 2;
        return (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border border-slate-200/60 dark:border-zinc-800/50 pointer-events-none"
            style={{ width: d, height: d }}
          />
        );
      })}

      {/* ── Sun (centre) ── */}
      <div className="absolute z-20 flex items-center justify-center" style={{ width: 56, height: 56 }}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0066CC] via-[#0ea5e9] to-[#7c3aed] shadow-lg shadow-[#0066CC]/30" />
        {/* halo rings */}
        <div className="absolute w-[72px] h-[72px] rounded-full border border-[#0066CC]/20 animate-ping opacity-50" />
        <div className="absolute w-[88px] h-[88px] rounded-full border border-slate-200/30 dark:border-zinc-700/30 animate-ping opacity-30"
          style={{ animationDelay: "0.6s" }} />
        <span className="relative z-10 text-[9px] font-mono font-bold text-white/90 tracking-widest">TECH</span>
      </div>

      {/* ── Planets ── */}
      {timelineData.map((item, i) => {
        const cfg     = ORBIT_CONFIG[i] ?? ORBIT_CONFIG[ORBIT_CONFIG.length - 1];
        const angleDeg = anglesRef.current[i] ?? 0;
        const rad      = (angleDeg * Math.PI) / 180;
        const px       = cfg.radius * Math.cos(rad);
        const py       = cfg.radius * Math.sin(rad);
        const isActive  = activeId === item.id;
        const isRelated = relatedIds.includes(item.id);
        const Icon      = item.icon;

        // depth effect: slightly shrink & fade planets "behind" the sun
        const depth   = (Math.sin(rad) + 1) / 2;          // 0 = back, 1 = front
        const opacity = 0.55 + 0.45 * depth;
        const scale   = 0.82 + 0.22 * depth;

        return (
          <div
            key={item.id}
            className="absolute flex flex-col items-center justify-center cursor-pointer group"
            style={{
              width: cfg.size,
              height: cfg.size,
              transform: `translate(${px}px, ${py}px) scale(${isActive ? 1.22 : scale})`,
              zIndex: isActive ? 50 : Math.round(10 + 40 * depth),
              opacity: isActive ? 1 : opacity,
              transition: "transform 0.18s ease, opacity 0.18s ease",
              willChange: "transform",
            }}
            onClick={(e) => handlePlanetClick(e, item)}
          >
            {/* Glow halo */}
            {(isActive || isRelated) && (
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  boxShadow: isActive
                    ? "0 0 18px 4px rgba(0,102,204,0.35)"
                    : "0 0 10px 2px rgba(0,102,204,0.2)",
                  borderRadius: "50%",
                }}
              />
            )}

            {/* Planet body */}
            <div
              className={`
                w-full h-full rounded-full flex items-center justify-center border transition-all duration-200
                ${isActive
                  ? "bg-[#0066CC] border-[#0066CC] shadow-md shadow-[#0066CC]/30 text-white"
                  : isRelated
                  ? "bg-[#0066CC]/10 border-[#0066CC]/50 text-[#0066CC] dark:text-blue-400 animate-pulse"
                  : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 group-hover:border-[#0066CC]/40 group-hover:bg-[#0066CC]/5"
                }
              `}
            >
              <Icon size={14} strokeWidth={2} />
            </div>

            {/* Label */}
            <span
              className={`
                absolute whitespace-nowrap text-[8.5px] font-mono font-semibold uppercase tracking-widest mt-1
                pointer-events-none
                ${isActive ? "text-[#1D1D1F] dark:text-white" : "text-[#86868B] dark:text-zinc-500"}
              `}
              style={{ top: "100%", marginTop: 4 }}
            >
              {item.title}
            </span>
          </div>
        );
      })}

      {/* ── Info card — appears when a planet is clicked ── */}
      {activeItem && (
        <div
          className="absolute z-[100] w-64 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xl shadow-slate-200/30 dark:shadow-none p-4 pointer-events-auto"
          style={{
            // Position card below the sun, always in view
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* caret */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[8px] border-b-white/95 dark:border-b-zinc-900/95" />

          <div className="flex items-center justify-between mb-2">
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border tracking-widest uppercase ${statusClass(activeItem.status)}`}>
              {statusLabel(activeItem.status)}
            </span>
            <span className="text-[9px] font-mono text-slate-400 dark:text-zinc-500">{activeItem.date}</span>
          </div>

          <h4 className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] font-mono mb-1">{activeItem.title}</h4>
          <p className="text-[10px] text-[#86868B] dark:text-zinc-400 leading-relaxed mb-3">{activeItem.content}</p>

          {/* Proficiency bar */}
          <div className="border-t border-slate-100 dark:border-zinc-800/50 pt-2 mb-2">
            <div className="flex justify-between text-[9px] mb-1">
              <span className="flex items-center gap-1 text-slate-400 dark:text-zinc-500">
                <Zap size={8} className="text-[#0066CC]" /> Proficiency
              </span>
              <span className="font-mono text-[#0066CC] dark:text-blue-400">{activeItem.energy}%</span>
            </div>
            <div className="w-full h-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0066CC] to-[#7c3aed] rounded-full transition-all duration-500"
                style={{ width: `${activeItem.energy}%` }}
              />
            </div>
          </div>

          {/* Related planets */}
          {activeItem.relatedIds.length > 0 && (
            <div className="border-t border-slate-100 dark:border-zinc-800/50 pt-2">
              <div className="flex items-center gap-1 text-[9px] text-slate-400 dark:text-zinc-500 mb-1.5">
                <Link size={8} /> ecosystem
              </div>
              <div className="flex flex-wrap gap-1">
                {activeItem.relatedIds.map(rid => {
                  const rel = timelineData.find(t => t.id === rid);
                  if (!rel) return null;
                  return (
                    <button
                      key={rid}
                      className="flex items-center gap-0.5 h-5 px-2 text-[8px] font-mono rounded border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 hover:border-[#0066CC]/40 hover:text-[#0066CC] transition-all"
                      onClick={(e) => { e.stopPropagation(); setActiveId(rid); setRelatedIds(rel.relatedIds); }}
                    >
                      {rel.title} <ArrowRight size={6} className="ml-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hint text */}
      {!activeItem && (
        <p className="absolute bottom-1 text-[9px] font-mono text-slate-300 dark:text-zinc-700 tracking-widest pointer-events-none">
          CLICK A PLANET TO EXPLORE
        </p>
      )}
    </div>
  );
}
