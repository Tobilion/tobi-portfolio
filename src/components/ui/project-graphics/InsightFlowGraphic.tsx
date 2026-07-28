import React from "react";
import { motion } from "framer-motion";

export default React.memo(function InsightFlowGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="InsightFlow data analysis utility graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <motion.path initial={false} d="M50 88 H350" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="50" cy="88" r="8" fill={`${color}60`} />
      <circle cx="200" cy="88" r="8" fill={`${color}60`} />
      <circle cx="350" cy="88" r="8" fill={`${color}60`} />
      <rect x="180" y="40" width="40" height="30" rx="2" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <rect x="185" y="55" width="8" height="15" rx="1" fill={color} />
      <rect x="195" y="45" width="8" height="25" rx="1" fill={color} />
      <rect x="205" y="50" width="8" height="20" rx="1" fill={color} />
      <text x="50" y="110" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace">Fetch</text>
      <text x="200" y="110" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace">Analyze</text>
      <text x="350" y="110" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace">Export</text>
    </svg>
  );
});
