"use client";
import React, { useState, useEffect, useRef } from "react";
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

// Orbit config — radius in px (at full desktop size), CSS animation duration in seconds
const BASE_ORBIT = [
  { radius: 72,  duration: 8  },
  { radius: 108, duration: 13 },
  { radius: 148, duration: 20 },
  { radius: 190, duration: 28 },
  { radius: 230, duration: 38 },
  { radius: 268, duration: 50 },
];

const MAX_RADIUS = 268;
const PLANET_SIZE = 34;

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [relatedIds, setRelatedIds] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Inject CSS keyframes once
  useEffect(() => {
    const styleId = "solar-orbit-keyframes";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes orbit-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbit-label { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(-360deg); } }
    `;
    document.head.appendChild(style);
  }, []);

  const PADDING = 52;
  const availableRadius = Math.max(60, containerWidth / 2 - PADDING);
  const scaleFactor = Math.min(1, availableRadius / MAX_RADIUS);

  const orbitConfig = BASE_ORBIT.map(c => ({
    radius: Math.round(c.radius * scaleFactor),
    duration: c.duration,
    size: Math.max(24, Math.round(PLANET_SIZE * (0.65 + 0.35 * scaleFactor))),
  }));

  const outerRadius = orbitConfig[orbitConfig.length - 1]?.radius ?? 60;
  const containerH = Math.round(outerRadius * 2 + 80);

  const handlePlanetClick = (e: React.MouseEvent, item: TimelineItem) => {
    e.stopPropagation();
    if (activeId === item.id) {
      setActiveId(null); setRelatedIds([]); setPaused(false);
    } else {
      setActiveId(item.id); setRelatedIds(item.relatedIds); setPaused(true);
    }
  };

  const handleBackdrop = () => {
    setActiveId(null); setRelatedIds([]); setPaused(false);
  };

  const activeItem = timelineData.find(t => t.id === activeId) ?? null;
  const isMobile = containerWidth < 480;

  return (
    <div ref={wrapperRef} className="relative w-full select-none" onClick={handleBackdrop}>
      {/* Solar canvas */}
      <div className="relative w-full flex items-center justify-center" style={{ height: containerH }}>

        {/* Orbit rings */}
        {timelineData.map((_, i) => {
          const cfg = orbitConfig[i] ?? orbitConfig[orbitConfig.length - 1]!;
          const d = cfg.radius * 2;
          return (
            <div
              key={`ring-${i}`}
              className="absolute rounded-full border border-slate-200/60 dark:border-zinc-800/50 pointer-events-none"
              style={{ width: d, height: d }}
            />
          );
        })}

        {/* Sun */}
        <div className="absolute z-20 flex items-center justify-center" style={{ width: 48, height: 48 }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0066CC] via-[#0ea5e9] to-[#7c3aed] shadow-lg shadow-[#0066CC]/30" />
          <div className="absolute w-[64px] h-[64px] rounded-full border border-[#0066CC]/20 animate-ping opacity-50" />
          <div
            className="absolute w-[80px] h-[80px] rounded-full border border-slate-200/30 dark:border-zinc-700/30 animate-ping opacity-25"
            style={{ animationDelay: "0.6s" }}
          />
          <span className="relative z-10 text-[8px] font-mono font-bold text-white/90 tracking-widest">TECH</span>
        </div>

        {/* Planets — each sits in a CSS-animated rotating arm, zero JS overhead */}
        {timelineData.map((item, i) => {
          const cfg = orbitConfig[i] ?? orbitConfig[orbitConfig.length - 1]!;
          const isActive  = activeId === item.id;
          const isRelated = relatedIds.includes(item.id);
          const Icon = item.icon;
          // Stagger start angle so planets distribute around the sun
          const startDeg = (i / timelineData.length) * 360;

          return (
            <div
              key={item.id}
              className="absolute"
              style={{
                width: cfg.radius * 2,
                height: cfg.radius * 2,
                animationName: "orbit-cw",
                animationDuration: `${cfg.duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: paused ? "paused" : "running",
                animationDelay: `-${(startDeg / 360) * cfg.duration}s`,
              }}
            >
              {/* Planet disc — sits at the right edge (3 o'clock) of the arm */}
              <div
                className="absolute cursor-pointer group"
                style={{
                  width: cfg.size,
                  height: cfg.size,
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                }}
                onClick={(e) => handlePlanetClick(e, item)}
              >
                {(isActive || isRelated) && (
                  <div
                    className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                    style={{
                      boxShadow: isActive
                        ? "0 0 18px 4px rgba(0,102,204,0.4)"
                        : "0 0 10px 2px rgba(0,102,204,0.2)",
                    }}
                  />
                )}

                <div className={`
                  w-full h-full rounded-full flex items-center justify-center border transition-all duration-200
                  ${isActive
                    ? "bg-[#0066CC] border-[#0066CC] shadow-md shadow-[#0066CC]/30 text-white"
                    : isRelated
                    ? "bg-[#0066CC]/10 border-[#0066CC]/50 text-[#0066CC] dark:text-blue-400 animate-pulse"
                    : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 group-hover:border-[#0066CC]/40 group-hover:bg-[#0066CC]/5"
                  }
                `}>
                  <Icon size={Math.max(10, Math.round(13 * scaleFactor + 3))} strokeWidth={2} />
                </div>

                {/* Label counter-rotates to stay upright */}
                {containerWidth >= 320 && (
                  <span
                    className={`
                      absolute whitespace-nowrap font-mono font-semibold uppercase tracking-wider pointer-events-none
                      ${isMobile ? "text-[7px]" : "text-[8.5px]"}
                      ${isActive ? "text-[#1D1D1F] dark:text-white" : "text-[#86868B] dark:text-zinc-500"}
                    `}
                    style={{
                      top: "100%",
                      left: "50%",
                      marginTop: 3,
                      animationName: "orbit-label",
                      animationDuration: `${cfg.duration}s`,
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                      animationPlayState: paused ? "paused" : "running",
                      animationDelay: `-${(startDeg / 360) * cfg.duration}s`,
                    }}
                  >
                    {item.title}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {!activeItem && (
          <p className="absolute bottom-0 text-[8px] font-mono text-slate-300 dark:text-zinc-700 tracking-widest pointer-events-none">
            {isMobile ? "TAP A PLANET" : "CLICK A PLANET TO EXPLORE"}
          </p>
        )}
      </div>

      {/* Info card */}
      {activeItem && (
        <div
          className="relative mx-auto mt-4 w-full max-w-xs bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xl shadow-slate-200/30 dark:shadow-none p-4 pointer-events-auto z-[100]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border tracking-widest uppercase ${statusClass(activeItem.status)}`}>
              {statusLabel(activeItem.status)}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-slate-400 dark:text-zinc-500">{activeItem.date}</span>
              <button
                onClick={handleBackdrop}
                className="text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors text-xs leading-none"
                aria-label="Close"
              >✕</button>
            </div>
          </div>

          <h4 className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] font-mono mb-1">{activeItem.title}</h4>
          <p className="text-[10px] text-[#86868B] dark:text-zinc-400 leading-relaxed mb-3">{activeItem.content}</p>

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
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId(rid);
                        setRelatedIds(rel.relatedIds);
                      }}
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
    </div>
  );
}
