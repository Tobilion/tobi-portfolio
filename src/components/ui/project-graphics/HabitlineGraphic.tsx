import React from "react";
import { motion } from "framer-motion";

const pattern = [0,1,2,0,3,1,0, 2,3,1,0,2,0,1, 1,0,3,2,0,1,3, 0,2,1,3,1,2,0, 3,1,0,2,3,0,1, 2,0,2,1,0,3,2];
const opacities = ["10", "35", "65", "FF"];

export default React.memo(function HabitlineGraphic({ color }: { color: string }): React.JSX.Element {
  const cells: React.JSX.Element[] = [];
  for (let w = 0; w < 14; w++) {
    for (let d = 0; d < 3; d++) {
      const v = pattern[(w * 3 + d) % pattern.length];
      cells.push(
        <rect key={`${w}-${d}`} x={20 + w * 17} y={56 + d * 17} width="13" height="13" rx="3" fill={`${color}${opacities[v]}`} />
      );
    }
  }
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Habitline habit tracker heatmap graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <text x="20" y="32" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">HABITLINE — 14 WEEK STREAK MAP</text>
      {cells}
      <motion.rect
        initial={false}
        x={20 + 13 * 17} y={56 + 2 * 17} width="13" height="13" rx="3" fill={color}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <rect x="278" y="120" width="106" height="36" rx="6" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <text x="290" y="135" fill={`${color}90`} fontSize="8" fontFamily="monospace">Streak: 23 🔥</text>
      <text x="290" y="149" fill={`${color}90`} fontSize="8" fontFamily="monospace">Today: 3/4 done</text>
      <circle cx="40" cy="138" r="14" stroke={`${color}25`} strokeWidth="3" fill="none" />
      <motion.circle
        initial={false}
        cx="40" cy="138" r="14" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"
        strokeDasharray="88"
        animate={{ strokeDashoffset: [88, 22] }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        transform="rotate(-90 40 138)"
      />
      <text x="40" y="141" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">75%</text>
    </svg>
  );
});
