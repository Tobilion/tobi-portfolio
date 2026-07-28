import React, { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  style,
  spotlightColor = "rgba(0, 255, 136, 0.08)",
}: SpotlightCardProps): React.JSX.Element {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      onMouseEnter={prefersReducedMotion ? undefined : () => setHovered(true)}
      onMouseLeave={prefersReducedMotion ? undefined : () => setHovered(false)}
      className={`${className} relative overflow-hidden transition-all duration-300`}
      style={prefersReducedMotion ? style : {
        ...style,
        backgroundImage: hovered
          ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`
          : "none",
      }}
      role="presentation"
    >
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

export default SpotlightCard;
