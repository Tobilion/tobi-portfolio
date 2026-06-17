import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function EvolvingBackground(): React.JSX.Element {
  const { scrollYProgress } = useScroll();

  const smoothY = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    mass: 1.2,
  });

  const orb1X = useTransform(smoothY, [0, 0.2, 0.4, 0.6, 0.8, 1], ["5%", "25%", "-10%", "50%", "30%", "10%"]);
  const orb1Y = useTransform(smoothY, [0, 0.2, 0.4, 0.6, 0.8, 1], ["5%", "35%", "70%", "15%", "85%", "50%"]);
  const orb1Scale = useTransform(smoothY, [0, 0.35, 0.7, 1], [1, 1.4, 0.85, 1.2]);
  const orb1Color = useTransform(
    smoothY,
    [0, 0.25, 0.5, 0.75, 1],
    ["rgba(0, 102, 204, 0.06)", "rgba(0, 180, 216, 0.06)", "rgba(124, 58, 237, 0.06)", "rgba(236, 72, 153, 0.06)", "rgba(0, 102, 204, 0.06)"]
  );

  const orb2X = useTransform(smoothY, [0, 0.2, 0.4, 0.6, 0.8, 1], ["85%", "10%", "80%", "20%", "75%", "90%"]);
  const orb2Y = useTransform(smoothY, [0, 0.2, 0.4, 0.6, 0.8, 1], ["20%", "55%", "15%", "90%", "45%", "85%"]);
  const orb2Scale = useTransform(smoothY, [0, 0.5, 1], [0.9, 1.35, 1.1]);
  const orb2Color = useTransform(
    smoothY,
    [0, 0.25, 0.5, 0.75, 1],
    ["rgba(124, 58, 237, 0.06)", "rgba(0, 102, 204, 0.06)", "rgba(14, 165, 233, 0.06)", "rgba(245, 158, 11, 0.06)", "rgba(124, 58, 237, 0.06)"]
  );

  const orb3X = useTransform(smoothY, [0, 0.3, 0.6, 1], ["35%", "75%", "15%", "50%"]);
  const orb3Y = useTransform(smoothY, [0, 0.3, 0.6, 1], ["80%", "20%", "45%", "90%"]);
  const orb3Scale = useTransform(smoothY, [0, 0.5, 1], [1.2, 0.8, 1.4]);
  const orb3Color = useTransform(
    smoothY,
    [0, 0.3, 0.6, 1],
    ["rgba(14, 165, 233, 0.05)", "rgba(236, 72, 153, 0.05)", "rgba(124, 58, 237, 0.05)", "rgba(0, 102, 204, 0.05)"]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300">
      {/* Light grid lines */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:hidden"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1.2px, transparent 1.2px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Dark grid lines */}
      <div
        className="absolute inset-0 opacity-[0.12] hidden dark:block"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1.2px, transparent 1.2px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/50 to-[#FAF9F6] dark:from-black/10 dark:via-black/50 dark:to-[#0B0B0C]" />

      <motion.div
        className="absolute rounded-full filter blur-[150px] md:blur-[220px]"
        style={{
          width: "560px",
          height: "560px",
          left: orb1X,
          top: orb1Y,
          scale: orb1Scale,
          backgroundColor: orb1Color,
        }}
      />

      <motion.div
        className="absolute rounded-full filter blur-[160px] md:blur-[240px]"
        style={{
          width: "490px",
          height: "490px",
          left: orb2X,
          top: orb2Y,
          scale: orb2Scale,
          backgroundColor: orb2Color,
        }}
      />

      <motion.div
        className="absolute rounded-full filter blur-[150px] md:blur-[220px]"
        style={{
          width: "440px",
          height: "440px",
          left: orb3X,
          top: orb3Y,
          scale: orb3Scale,
          backgroundColor: orb3Color,
        }}
      />
    </div>
  );
}

export default EvolvingBackground;
