import React from "react";
import { motion } from "framer-motion";

export default React.memo(function LogAnalyzerGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Log Analyzer terminal dashboard graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <rect x="0" y="0" width="400" height="24" rx="8" fill={`${color}15`} />
      <circle cx="16" cy="12" r="4" fill={`${color}40`} />
      <circle cx="28" cy="12" r="4" fill={`${color}30`} />
      <circle cx="40" cy="12" r="4" fill={`${color}20`} />
      <text x="200" y="16" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="600">log_analyzer — tail -f</text>
      <text x="16" y="44" fill={`${color}90`} fontSize="9" fontFamily="monospace">
        [INFO]  Server listening on port 8080<tspan fill={color}> ▎</tspan>
      </text>
      <text x="16" y="60" fill={`${color}70`} fontSize="9" fontFamily="monospace">
        [DEBUG] Buffer flushed — chunk size 4.2 KB
      </text>
      <text x="16" y="76" fill={`${color}70`} fontSize="9" fontFamily="monospace">
        [WARN]  Response latency spike detected — 1200ms<tspan fill={`${color}`}> ⚠</tspan>
      </text>
      <text x="16" y="92" fill={`${color}60`} fontSize="9" fontFamily="monospace">
        [INFO]  Reconnecting idle worker pool...
      </text>
      <motion.path
        initial={false}
        d="M0 140 Q50 120 100 140 T200 140 T300 140 T400 140"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity={0.4}
        animate={{ d: ["M0 140 Q50 120 100 140 T200 140 T300 140 T400 140", "M0 140 Q50 160 100 140 T200 140 T300 140 T400 140", "M0 140 Q50 120 100 140 T200 140 T300 140 T400 140"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        initial={false}
        d="M0 150 Q50 140 100 150 T200 150 T300 150 T400 150"
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        opacity={0.2}
        animate={{ d: ["M0 150 Q50 140 100 150 T200 150 T300 150 T400 150", "M0 150 Q50 160 100 150 T200 150 T300 150 T400 150", "M0 150 Q50 140 100 150 T200 150 T300 150 T400 150"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="280" y="110" width="104" height="20" rx="4" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
      <text x="332" y="123" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">3 CRITICAL ALERTS</text>
    </svg>
  );
});
