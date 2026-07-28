import React from "react";
import { motion } from "framer-motion";

export default React.memo(function NetPulseGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="NetPulse network dashboard graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <text x="16" y="28" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">NETPULSE — LIVE MONITOR</text>
      <rect x="16" y="40" width="240" height="100" rx="4" fill={`${color}06`} stroke={`${color}20`} strokeWidth="0.8" />
      <line x1="16" y1="65" x2="256" y2="65" stroke={`${color}10`} strokeWidth="0.5" />
      <line x1="16" y1="90" x2="256" y2="90" stroke={`${color}10`} strokeWidth="0.5" />
      <line x1="16" y1="115" x2="256" y2="115" stroke={`${color}10`} strokeWidth="0.5" />
      <motion.path
        initial={false}
        d="M20 100 L50 85 L80 95 L110 70 L140 80 L170 60 L200 75 L230 55 L252 65"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <path d="M20 125 L60 122 L100 128 L140 120 L180 126 L220 118 L252 124" stroke={`${color}50`} strokeWidth="1" fill="none" strokeDasharray="3 2" />
      <motion.circle initial={false} cx="252" cy="65" r="3" fill={color} animate={{ opacity: [1, 0.3, 1], r: [3, 4.5, 3] }} transition={{ duration: 1.2, repeat: Infinity }} />
      <rect x="150" y="42" width="3" height="96" fill={`${color}25`} />
      <rect x="272" y="40" width="112" height="100" rx="6" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <text x="284" y="60" fill={`${color}90`} fontSize="8" fontFamily="monospace">↓ 87.4 Mbps</text>
      <text x="284" y="76" fill={`${color}90`} fontSize="8" fontFamily="monospace">↑ 21.2 Mbps</text>
      <text x="284" y="92" fill={`${color}90`} fontSize="8" fontFamily="monospace">Ping: 18 ms</text>
      <text x="284" y="108" fill={`${color}90`} fontSize="8" fontFamily="monospace">Uptime: 99.2%</text>
      <rect x="284" y="118" width="60" height="14" rx="3" fill={`${color}25`} />
      <text x="314" y="128" textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" fontWeight="700">1 OUTAGE</text>
      <text x="16" y="158" fill={`${color}60`} fontSize="8" fontFamily="monospace">Hour-of-day congestion profile · 30-min cycles · SQLite</text>
    </svg>
  );
});
