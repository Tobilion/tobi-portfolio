import React from "react";
import { motion } from "framer-motion";

export default React.memo(function DuplicateFileGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Duplicate File Analyzer hashing graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <rect x="40" y="30" width="80" height="100" rx="4" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <rect x="50" y="42" width="60" height="4" rx="1" fill={`${color}60`} />
      <rect x="50" y="54" width="40" height="4" rx="1" fill={`${color}40`} />
      <rect x="50" y="66" width="52" height="4" rx="1" fill={`${color}40`} />
      <rect x="50" y="78" width="30" height="4" rx="1" fill={`${color}40`} />
      <rect x="50" y="90" width="48" height="4" rx="1" fill={`${color}40`} />
      <text x="80" y="148" textAnchor="middle" fill={`${color}80`} fontSize="7" fontFamily="monospace">File A</text>
      <rect x="140" y="30" width="80" height="100" rx="4" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <rect x="150" y="42" width="60" height="4" rx="1" fill={`${color}60`} />
      <rect x="150" y="54" width="40" height="4" rx="1" fill={`${color}40`} />
      <rect x="150" y="66" width="52" height="4" rx="1" fill={`${color}40`} />
      <rect x="150" y="78" width="30" height="4" rx="1" fill={`${color}40`} />
      <rect x="150" y="90" width="48" height="4" rx="1" fill={`${color}40`} />
      <text x="180" y="148" textAnchor="middle" fill={`${color}80`} fontSize="7" fontFamily="monospace">File B</text>
      <motion.rect
        x="40" y="70" width="180" height="2" rx="1" fill={color}
        animate={{ y: [70, 120, 70] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.5}
      />
      <motion.rect x="240" y="55" width="128" height="48" rx="6" fill={`${color}15`} stroke={color} strokeWidth="0.8"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <text x="304" y="72" textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" fontWeight="700">SHA-256</text>
      <text x="304" y="88" textAnchor="middle" fill={`${color}80`} fontSize="6" fontFamily="monospace">f7a3b...9c1d2</text>
      <text x="304" y="98" textAnchor="middle" fill={`${color}50`} fontSize="6" fontFamily="monospace">MATCH ✓</text>
    </svg>
  );
});
