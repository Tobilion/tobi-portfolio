import React from "react";
import { motion } from "framer-motion";

export default React.memo(function StudyFlashGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="StudyFlash flashcard review graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <rect x="76" y="34" width="200" height="104" rx="8" fill={`${color}08`} stroke={`${color}20`} strokeWidth="0.8" transform="rotate(-4 176 86)" />
      <rect x="82" y="32" width="200" height="104" rx="8" fill={`${color}10`} stroke={`${color}30`} strokeWidth="0.8" transform="rotate(-2 182 84)" />
      <motion.g
        initial={false}
        animate={{ rotateY: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "190px 84px" }}
      >
        <rect x="90" y="30" width="200" height="104" rx="8" fill={`${color}15`} stroke={color} strokeWidth="1" />
        <text x="190" y="66" textAnchor="middle" fill={`${color}90`} fontSize="9" fontFamily="monospace">Q: What does SM-2</text>
        <text x="190" y="80" textAnchor="middle" fill={`${color}90`} fontSize="9" fontFamily="monospace">schedule?</text>
        <line x1="110" y1="94" x2="270" y2="94" stroke={`${color}25`} strokeWidth="0.8" />
        <text x="190" y="112" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="600">tap to reveal ↻</text>
      </motion.g>
      <rect x="112" y="146" width="36" height="14" rx="3" fill={`${color}15`} stroke={`${color}40`} strokeWidth="0.5" />
      <text x="130" y="156" textAnchor="middle" fill={`${color}80`} fontSize="7" fontFamily="monospace">AGAIN</text>
      <rect x="154" y="146" width="36" height="14" rx="3" fill={`${color}20`} stroke={`${color}50`} strokeWidth="0.5" />
      <text x="172" y="156" textAnchor="middle" fill={`${color}80`} fontSize="7" fontFamily="monospace">HARD</text>
      <rect x="196" y="146" width="36" height="14" rx="3" fill={`${color}30`} stroke={color} strokeWidth="0.5" />
      <text x="214" y="156" textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace">GOOD</text>
      <rect x="238" y="146" width="36" height="14" rx="3" fill={`${color}40`} stroke={color} strokeWidth="0.7" />
      <text x="256" y="156" textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" fontWeight="700">EASY</text>
      <rect x="300" y="20" width="84" height="20" rx="4" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <text x="342" y="33" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">17 CARDS DUE</text>
      <motion.text initial={false} x="316" y="60" fill={color} fontSize="9" fontFamily="monospace" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>🔥 12-day</motion.text>
    </svg>
  );
});
