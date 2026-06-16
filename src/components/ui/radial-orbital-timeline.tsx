"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  radius?: number;
}

export default function RadialOrbitalTimeline({
  timelineData,
  radius = 105,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.35) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-[#0066CC] dark:text-blue-400 bg-[#0066CC]/5 dark:bg-blue-950/20 border-[#0066CC]/20 dark:border-blue-900/30";
      case "in-progress":
        return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/30";
      case "pending":
        return "text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800";
      default:
        return "text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800";
    }
  };

  return (
    <div
      className="w-full h-[360px] flex flex-col items-center justify-center bg-transparent overflow-visible relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-[320px] h-full flex items-center justify-center overflow-visible">
        <div
          className="absolute w-full h-full flex items-center justify-center overflow-visible"
          ref={orbitRef}
          style={{
            perspective: "1000px",
          }}
        >
          {/* Centered Sun/Core */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#0066CC] via-[#0ea5e9] to-[#7c3aed] animate-pulse flex items-center justify-center z-10 shadow-lg shadow-[#0066CC]/20">
            <div className="absolute w-16 h-16 rounded-full border border-[#0066CC]/20 animate-ping opacity-60"></div>
            <div
              className="absolute w-20 h-20 rounded-full border border-slate-200 animate-ping opacity-35"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-6 h-6 rounded-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-[#0066CC] dark:text-blue-400 font-bold shadow-sm border border-slate-100 dark:border-zinc-900">
              Tech
            </div>
          </div>

          {/* Orbit Line Ring */}
          <div className="absolute rounded-full border border-slate-200/80 dark:border-zinc-800/80" style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}></div>

          {/* Render Language Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 300 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer flex flex-col items-center justify-center"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Glow ring based on energy */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,102,204,0.1) 0%, rgba(0,102,204,0) 70%)`,
                    width: `${item.energy * 0.35 + 32}px`,
                    height: `${item.energy * 0.35 + 32}px`,
                    left: `-${(item.energy * 0.35 + 32 - 32) / 2}px`,
                    top: `-${(item.energy * 0.35 + 32 - 32) / 2}px`,
                  }}
                ></div>

                {/* Node Dot button */}
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#0066CC] text-white"
                      : isRelated
                      ? "bg-[#0066CC]/10 text-[#0066CC] dark:text-blue-400"
                      : "bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
                  }
                  border
                  ${
                    isExpanded
                      ? "border-[#0066CC] shadow-md shadow-[#0066CC]/20"
                      : isRelated
                      ? "border-[#0066CC]/50 animate-pulse"
                      : "border-slate-200/80 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : "hover:scale-110"}
                `}
                >
                  <Icon size={13} />
                </div>

                {/* Node Title Text */}
                <div
                  className={`
                  absolute top-9 whitespace-nowrap
                  text-[9px] font-mono font-semibold uppercase tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-[#1d1d1f] dark:text-white scale-110" : "text-[#86868b] dark:text-zinc-400 opacity-85"}
                `}
                >
                  {item.title}
                </div>

                {/* Node Detail overlay Card */}
                {isExpanded && (
                  <Card className="absolute top-14 w-60 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-visible z-[400] -translate-x-1/2 left-1/2">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white dark:border-b-zinc-900"></div>
                    <CardHeader className="p-3 pb-1.5">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-1.5 py-0.5 text-[8px] tracking-wider rounded-md border font-mono ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "EXPERT"
                            : item.status === "in-progress"
                            ? "ADVANCED"
                            : "INTERMEDIATE"}
                        </Badge>
                        <span className="text-[9px] font-mono text-[#86868b]">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-xs text-[#1d1d1f] dark:text-[#F5F5F7] font-bold font-mono mt-1">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-[10px] text-[#86868b] dark:text-zinc-400 leading-relaxed">
                      <p>{item.content}</p>

                      {/* Profiency progress bar */}
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800/50">
                        <div className="flex justify-between items-center text-[9px] mb-1">
                          <span className="flex items-center text-[#86868b]/70 dark:text-zinc-400">
                            <Zap size={8} className="mr-1 text-[#0066CC]" />
                            Proficiency
                          </span>
                          <span className="font-mono text-[#0066CC]">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0066CC] to-[#7c3aed]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Connected Tech Links */}
                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800/50">
                          <div className="flex items-center mb-1 text-[9px] text-[#86868b]/70">
                            <Link size={8} className="mr-1" />
                            <span>ecosystem</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-5 px-1.5 py-0 text-[8px] rounded border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-850 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 transition-all font-mono"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={6}
                                    className="ml-1 text-slate-400"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
