import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowOrb } from "../ui/GlowOrb";
import { SplineScene } from "../ui/splite";
import { MagneticButton } from "../ui/MagneticButton";
import { fadeUp, stagger } from "../../animations/variants";
import { MetalButton } from "../ui/liquid-glass-button";
import { useTextScramble } from "../../hooks/useTextScramble";

const TITLES = ["innovative", "adaptive", "detail-oriented", "resourceful", "passionate"];

export function Hero(): React.JSX.Element {
  const containerRef = React.useRef<HTMLElement>(null);
  const [titleNumber, setTitleNumber] = React.useState(0);
  const firstName = useTextScramble("Tobiloba", 400);
  const lastName  = useTextScramble("Jagun", 700);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber(prev => (prev + 1) % TITLES.length);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300"
    >
      {/* Soft light studio highlights */}
      <GlowOrb color="#0066CC" size="600px" top="-150px" left="-250px" blur={220} opacity={0.06} />
      <GlowOrb color="#7c3aed" size="500px" top="150px" left="65%" blur={220} opacity={0.05} />
      <GlowOrb color="#0ea5e9" size="400px" top="55%" left="25%" blur={200} opacity={0.04} />

      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        style={{ scale, opacity, y }}
        className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center z-10"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          <motion.span variants={fadeUp} className="text-[#86868B] dark:text-zinc-400 text-lg font-normal tracking-wide font-mono">
            Hi there, I'm
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-6xl lg:text-7xl font-extrabold leading-[1.0] tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-[#86868B] dark:text-zinc-500 font-mono">{firstName}</span>
            <br />
            <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-mono">{lastName}</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="relative flex items-center h-10 w-full overflow-hidden font-sans text-spektr-cyan-50 text-2xl md:text-3xl font-regular"
          >
            <span className="text-zinc-500 dark:text-zinc-400 mr-2">I am</span>
            <div className="relative flex-1 h-full" aria-live="polite" aria-atomic="true" aria-label={`I am ${TITLES[titleNumber]}`}>
              {TITLES.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold text-[#0066CC] dark:text-[#0070F3] left-0"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="w-fit px-5 py-2.5 rounded-full border border-slate-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 text-[#86868B] dark:text-zinc-400 text-xs font-mono font-semibold tracking-wider uppercase"
          >
            Front-End Developer
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base text-[#86868B] dark:text-zinc-400 leading-relaxed max-w-md font-light pt-2"
          >
            Software engineer crafting high-performance systems and elegant interfaces.
            Specialising in distributed architecture, developer tooling, and ML infrastructure.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4 items-center">
            <MagneticButton>
              <MetalButton
                variant="primary"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Work
              </MetalButton>
            </MagneticButton>

            <MagneticButton>
              <MetalButton
                variant="default"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </MetalButton>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="relative w-full aspect-square max-w-[480px] mx-auto" role="img" aria-label="Interactive 3D abstract hero graphic">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
            offlineFallback="/Images/hero-3d.jpeg"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#86868B]/60">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-200 to-transparent" />
      </motion.div>
    </section>
  );
}

export default Hero;
