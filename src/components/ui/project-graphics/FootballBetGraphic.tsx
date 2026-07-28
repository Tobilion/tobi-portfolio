import React from "react";
import { motion } from "framer-motion";

export default React.memo(function FootballBetGraphic({ color }: { color: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 400 176" fill="none" className="w-full h-full" role="img" aria-label="Football bet simulator dashboard graphic">
      <rect width="400" height="176" rx="8" fill={`${color}08`} />
      <rect x="20" y="30" width="160" height="110" rx="6" fill={`${color}12`} stroke={color} strokeWidth="0.8" />
      <text x="32" y="52" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">LIVE MATCH ODDS</text>
      <text x="32" y="72" fill={`${color}80`} fontSize="8" fontFamily="monospace">ARS vs CHE: 1.85 | 3.40</text>
      <text x="32" y="88" fill={`${color}80`} fontSize="8" fontFamily="monospace">MUN vs MCI: 3.10 | 2.10</text>
      <text x="32" y="104" fill={`${color}80`} fontSize="8" fontFamily="monospace">LIV vs RM : 2.25 | 2.80</text>
      <rect x="200" y="30" width="180" height="110" rx="6" fill={`${color}15`} stroke={color} strokeWidth="0.8" />
      <text x="212" y="52" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">BET SLIP — ACTIVE</text>
      <line x1="212" y1="62" x2="368" y2="62" stroke={`${color}30`} strokeWidth="1" />
      <text x="212" y="78" fill={`${color}90`} fontSize="8" fontFamily="monospace">Selection: MCI to Win</text>
      <text x="212" y="92" fill={`${color}90`} fontSize="8" fontFamily="monospace">Stake: $100.00 @ 2.10</text>
      <text x="212" y="106" fill={color} fontSize="8" fontFamily="monospace" fontWeight="700">Est. Return: $210.00</text>
      <motion.circle initial={false} cx="160" cy="49" r="3" fill={color} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.path
        initial={false}
        d="M212 130 L250 125 L290 132 L330 115 L368 122" stroke={color} strokeWidth="1.5" fill="none" opacity={0.7}
        animate={{ d: ["M212 130 L250 125 L290 132 L330 115 L368 122", "M212 130 L250 120 L290 135 L330 110 L368 125", "M212 130 L250 125 L290 132 L330 115 L368 122"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
});
