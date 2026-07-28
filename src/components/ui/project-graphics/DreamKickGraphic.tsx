import React from "react";
import { motion } from "framer-motion";

export default React.memo(function DreamKickGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Dream Kick 3D football game graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <path d="M120 150 L280 150 L250 40 L150 40 Z" fill={`${color}08`} stroke={`${color}30`} strokeWidth="1" />
      <path d="M200 150 L200 40" stroke={`${color}20`} strokeWidth="0.8" />
      <ellipse cx="200" cy="95" rx="28" ry="12" stroke={`${color}25`} strokeWidth="0.8" fill="none" />
      <rect x="180" y="32" width="40" height="12" stroke={color} strokeWidth="1" fill="none" />
      <motion.circle initial={false} cx="170" cy="120" r="5" fill={color} animate={{ cx: [170, 178, 170] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle initial={false} cx="228" cy="105" r="5" fill={`${color}70`} animate={{ cy: [105, 98, 105] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      <circle cx="200" cy="48" r="4" fill={`${color}50`} />
      <motion.circle
        initial={false}
        cx="185" cy="110" r="3.5" fill="#fff" stroke={color} strokeWidth="1"
        animate={{ cx: [185, 200, 185], cy: [110, 60, 110] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="16" y="16" width="76" height="20" rx="4" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <text x="54" y="29" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">2 - 1  ·  78:42</text>
      <rect x="312" y="120" width="72" height="40" rx="4" fill={`${color}10`} stroke={`${color}40`} strokeWidth="0.8" />
      <circle cx="330" cy="135" r="2" fill={color} />
      <circle cx="350" cy="145" r="2" fill={`${color}60`} />
      <circle cx="365" cy="130" r="2" fill={`${color}60`} />
      <text x="16" y="158" fill={`${color}60`} fontSize="8" fontFamily="monospace">WASD move · X pass · Z shoot — Three.js, zero assets</text>
      <rect x="312" y="16" width="72" height="20" rx="4" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <text x="348" y="29" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">3D · PWA</text>
    </svg>
  );
});
