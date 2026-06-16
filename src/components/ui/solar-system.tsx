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

// Natural (desktop) orbit config — radii are scaled down on smaller screens
const BASE_ORBIT = [
  { radius: 72,  speed: 0.45,  size: 38 },
  { radius: 108, speed: 0.28,  size: 34 },
  { radius: 148, speed: 0.18,  size: 36 },
  { radius: 190, speed: 0.13,  size: 32 },
  { radius: 230, speed: 0.09,  size: 34 },
  { radius: 268, speed: 0.065, size: 30 },
];

const MAX_RADIUS = 268; // largest natural orbit radius

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
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const anglesRef    = useRef<number[]>(timelineData.map((_, i) => (i / timelineData.length) * 360));
  const rafRef       = useRef<number>(0);
  const pausedRef    = useRef<boolean>(false);
  const [, forceRender] = useState(0);

  // Responsive: track actual container width
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Scale factor: fit the largest orbit inside the available half-width with padding
  const PADDING = 52; // room for planet label + margin
  const availableRadius = Math.max(60, containerWidth / 2 - PADDING);
  const scaleFactor     = Math.min(1, availableRadius / MAX_RADIUS);

  // Scaled config derived from BASE_ORBIT
  const orbitConfig = BASE_ORBIT.map(c => ({
    radius: c.radius * scaleFactor,
    speed:  c.speed,
    size:   Math.max(24, Math.round(c.size * (0.65 + 0.35 * scaleFactor))),
  }));

  // Dynamic container height — exactly enough for outermost orbit + labels
  const outerRadius  = (orbitConfig[orbitConfig.length - 1]?.radius ?? 60);
  const containerH   = Math.round(outerRadius * 2 + 80);

  const [activeId,   setActiveId]   = useState<number | null>(null);
  const [relatedIds, setRelatedIds] = useState<number[]>([]);

  // 60 fps rAF loop
  const animate = useCallback(() => {
    if (!pausedRef.current) {
      anglesRef.current = anglesRef.current.map((a, i) => {
        const speed = orbitConfig[i]?.speed ?? orbitConfig[orbitConfig.length - 1]!.speed;
        return (a + speed * 0.4) % 360;
      });
      forceRender(n => n + 1);
    }
    rafRef.current = requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scaleFactor]); // re-create when scale changes so speeds stay correct

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handlePlanetClick = (e: React.MouseEvent, item: TimelineItem) => {
    e.stopPropagation();
    if (activeId === item.id) {
      setActiveId(null); setRelatedIds([]); pausedRef.current = false;
    } else {
      setActiveId(item.id); setRelatedIds(item.relatedIds); pausedRef.current = true;
    }
  };

  const handleBackdrop = () => {
    setActiveId(null); setRelatedIds([]); pausedRef.current = false;
  };

  const activeItem = timelineData.find(t => t.id === activeId) ?? null;

  // Info card: on mobile sit below the system, on desktop same bottom anchor
  const isMobile = containerWidth < 480;

  return (
    <div ref={wrapperRef} className="relative w-full select-none" onClick={handleBackdrop}>
      {/* Solar canvas */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: containerH }}
      >
        {/* ── Orbit rings ── */}
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

        {/* ── Sun ── */}
        <div className="absolute z-20 flex items-center justify-center" style={{ width: 48, height: 48 }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0066CC] via-[#0ea5e9] to-[#7c3aed] shadow-lg shadow-[#0066CC]/30" />
          <div className="absolute w-[64px] h-[64px] rounded-full border border-[#0066CC]/20 animate-ping opacity-50" />
          <div className="absolute w-[80px] h-[80px] rounded-full border border-slate-200/30 dark:border-zinc-700/30 animate-ping opacity-25"
            style={{ animationDelay: "0.6s" }} />
          <span className="relative z-10 text-[8px] font-mono font-bold text-white/90 tracking-widest">TECH</span>
        </div>

        {/* ── Planets ── */}
        {timelineData.map((item, i) => {
          const cfg      = orbitConfig[i] ?? orbitConfig[orbitConfig.length - 1]!;
          const angleDeg = anglesRef.current[i] ?? 0;
          const rad      = (angleDeg * Math.PI) / 180;
          const px       = cfg.radius * Math.cos(rad);
          const py       = cfg.radius * Math.sin(rad);
          const isActive  = activeId === item.id;
          const isRelated = relatedIds.includes(item.id);
          const Icon      = item.icon;
          const depth     = (Math.sin(rad) + 1) / 2;
          const opacity   = 0.55 + 0.45 * depth;
          const depthScale = 0.82 + 0.22 * depth;

          return (
            <div
              key={item.id}
              className="absolute flex flex-col items-center justify-center cursor-pointer group"
              style={{
                width: cfg.size,
                height: cfg.size,
                transform: `translate(${px}px, ${py}px) scale(${isActive ? 1.22 : depthScale})`,
                zIndex: isActive ? 50 : Math.round(10 + 40 * depth),
                opacity: isActive ? 1 : opacity,
                transition: "transform 0.15s ease, opacity 0.15s ease",
                willChange: "transform",
              }}
              onClick={(e) => handlePlanetClick(e, item)}
            >
              {(isActive || isRelated) && (
                <div className="absolute inset-0 rounded-full animate-pulse" style={{
                  boxShadow: isActive ? "0 0 18px 4px rgba(0,102,204,0.35)" : "0 0 10px 2px rgba(0,102,204,0.2)",
                  borderRadius: "50%",
                }} />
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

              {/* Hide text labels on very small screens to avoid overlap */}
              {containerWidth >= 320 && (
                <span
                  className={`
                    absolute whitespace-nowrap font-mono font-semibold uppercase tracking-wider pointer-events-none
                    ${isMobile ? "text-[7px]" : "text-[8.5px]"}
                    ${isActive ? "text-[#1D1D1F] dark:text-white" : "text-[#86868B] dark:text-zinc-500"}
                  `}
                  style={{ top: "100%", marginTop: 3 }}
                >
                  {item.title}
                </span>
              )}
            </div>
          );
        })}

        {/* Hint */}
        {!activeItem && (
          <p className="absolute bottom-0 text-[8px] font-mono text-slate-300 dark:text-zinc-700 tracking-widest pointer-events-none">
            {isMobile ? "TAP A PLANET" : "CLICK A PLANET TO EXPLORE"}
          </p>
        )}
      </div>

      {/* ── Info card — rendered OUTSIDE the orbit canvas so it never clips ── */}
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
    </div>
  );
}
