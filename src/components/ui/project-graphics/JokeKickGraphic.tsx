import React from "react";
import { motion } from "framer-motion";

export default React.memo(function JokeKickGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="2D football prototype graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />

      {/* 2D top-down pitch */}
      <rect x="30" y="26" width="236" height="124" rx="6" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <line x1="148" y1="26" x2="148" y2="150" stroke={`${color}40`} strokeWidth="0.8" />
      <circle cx="148" cy="88" r="18" stroke={`${color}40`} strokeWidth="0.8" fill="none" />
      <rect x="30" y="58" width="34" height="60" stroke={`${color}40`} strokeWidth="0.8" fill="none" />
      <rect x="30" y="74" width="10" height="28" fill={`${color}60`} />

      {/* Goal flash on each kick */}
      <motion.rect
        initial={false}
        x="30" y="74" width="10" height="28" fill={color} opacity="0"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Striker closes in on goal */}
      <motion.circle
        initial={false}
        cx="118" cy="88" r="7" fill={color}
        animate={{ cx: [118, 74, 118] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ball kicked along an arc into the net */}
      <motion.circle
        initial={false}
        cx="118" cy="88" r="3" fill="#fff" stroke={color}
        animate={{ cx: [118, 78, 34], cy: [88, 78, 88] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Kick trajectory trail */}
      <motion.path
        initial={false}
        d="M118 88 Q78 68 36 88" stroke={`${color}70`} strokeWidth="1" strokeDasharray="4 4" fill="none"
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Right panel — prototype notes */}
      <text x="290" y="52" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">JOKE KICK</text>
      <text x="290" y="70" fill={`${color}80`} fontSize="8" fontFamily="monospace">2D CANVAS PROTOTYPE</text>
      <line x1="290" y1="80" x2="372" y2="80" stroke={`${color}30`} strokeWidth="1" />
      <text x="290" y="98" fill={`${color}90`} fontSize="8" fontFamily="monospace">Controls: WASD / Touch</text>
      <text x="290" y="112" fill={`${color}90`} fontSize="8" fontFamily="monospace">11v11 canvas matches</text>
      <text x="290" y="126" fill={`${color}90`} fontSize="8" fontFamily="monospace">100% code-drawn graphics</text>
      <motion.circle
        initial={false}
        cx="352" cy="140" r="3" fill={color}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
});
