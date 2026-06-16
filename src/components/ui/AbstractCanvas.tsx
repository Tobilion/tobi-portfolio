import React from "react";
import { motion } from "framer-motion";

interface Node {
  angle: number;
  r: number;
  color: string;
  label: string;
}

const nodes: Node[] = [
  { angle: 0,   r: 42, color: "#00ff88", label: "Node.js" },
  { angle: 72,  r: 42, color: "#7c3aed", label: "Rust"    },
  { angle: 144, r: 42, color: "#0ea5e9", label: "K8s"     },
  { angle: 216, r: 42, color: "#f59e0b", label: "React"   },
  { angle: 288, r: 42, color: "#ec4899", label: "ML"      },
];

export function AbstractCanvas(): React.JSX.Element {
  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-[#00ff88]/10"
        style={{ background: "conic-gradient(from 0deg, transparent 60%, #00ff8820 100%)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[12%] rounded-full border border-[#7c3aed]/15"
        style={{ background: "conic-gradient(from 180deg, transparent 60%, #7c3aed18 100%)" }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[24%] rounded-full border border-[#0ea5e9]/15"
        style={{ background: "conic-gradient(from 90deg, transparent 60%, #0ea5e918 100%)" }}
      />

      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full"
          style={{
            background: "radial-gradient(circle, #00ff8840 0%, #00ff8810 50%, transparent 70%)",
            boxShadow: "0 0 60px 20px #00ff8820",
          }}
        />
      </div>

      {/* Floating nodes */}
      {nodes.map(({ angle, r, color, label }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <motion.div
            key={label}
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            className="absolute flex items-center justify-center"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border text-[10px] font-mono font-bold"
              style={{
                background: `${color}15`,
                borderColor: `${color}40`,
                color,
                boxShadow: `0 0 16px ${color}30`,
              }}
            >
              {label}
            </div>
          </motion.div>
        );
      })}

      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="100" stroke="#00ff88" strokeWidth="0.3" />
            <line x1="0" y1={v} x2="100" y2={v} stroke="#00ff88" strokeWidth="0.3" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default AbstractCanvas;
