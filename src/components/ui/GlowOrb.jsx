import React from "react";

export function GlowOrb({ color, size, top, left, blur = 180 }) {
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
        opacity: 0.18,
      }}
    />
  );
}

export default GlowOrb;