import React from "react";
import { motion } from "framer-motion";

export default React.memo(function FootballManagerGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Football manager simulator tactical graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <rect x="20" y="20" width="220" height="136" rx="4" fill={`${color}04`} stroke={`${color}20`} strokeWidth="0.8" />
      <line x1="130" y1="20" x2="130" y2="156" stroke={`${color}20`} strokeWidth="0.8" />
      <circle cx="130" cy="88" r="24" stroke={`${color}20`} strokeWidth="0.8" fill="none" />
      <circle cx="130" cy="88" r="2" fill={`${color}30`} />
      <rect x="20" y="53" width="25" height="70" stroke={`${color}20`} strokeWidth="0.8" fill="none" />
      <rect x="215" y="53" width="25" height="70" stroke={`${color}20`} strokeWidth="0.8" fill="none" />
      <motion.circle initial={false} cx="50" cy="88" r="5" fill={color} stroke="#fff" strokeWidth="1" />
      <motion.circle initial={false} cx="90" cy="50" r="5" fill={color} stroke="#fff" strokeWidth="1"
        animate={{ cx: [90, 95, 90], cy: [50, 48, 50] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle initial={false} cx="90" cy="126" r="5" fill={color} stroke="#fff" strokeWidth="1"
        animate={{ cx: [90, 85, 90], cy: [126, 128, 126] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle initial={false} cx="140" cy="88" r="5" fill={color} stroke="#fff" strokeWidth="1"
        animate={{ cx: [140, 145, 140], cy: [88, 92, 88] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle initial={false} cx="180" cy="45" r="5" fill={color} stroke="#fff" strokeWidth="1"
        animate={{ cx: [180, 190, 180] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle initial={false} cx="200" cy="88" r="5" fill={color} stroke="#fff" strokeWidth="1"
        animate={{ cx: [200, 205, 200], cy: [88, 80, 88] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path initial={false} d="M145 88 L195 88" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity={0.6}
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <rect x="260" y="20" width="120" height="136" rx="6" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <text x="272" y="42" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">TACTICS BOARD</text>
      <text x="272" y="62" fill={`${color}90`} fontSize="8" fontFamily="monospace">Style: Attacking</text>
      <text x="272" y="78" fill={`${color}90`} fontSize="8" fontFamily="monospace">Formation: 4-3-3</text>
      <text x="272" y="94" fill={`${color}90`} fontSize="8" fontFamily="monospace">Possession: 58%</text>
      <text x="272" y="110" fill={`${color}90`} fontSize="8" fontFamily="monospace">Rating: 4.8★</text>
      <rect x="272" y="124" width="48" height="16" rx="3" fill={`${color}25`} />
      <text x="296" y="135" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">82:14</text>
    </svg>
  );
});
