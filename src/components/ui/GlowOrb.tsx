import React from "react";

interface GlowOrbProps {
  color: string;
  size: string;
  top: string;
  left: string;
  blur?: number;
  opacity?: number;
}

export function GlowOrb({ color, size, top, left, blur = 180, opacity = 0.18 }: GlowOrbProps): React.JSX.Element {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );
}

export default GlowOrb;
