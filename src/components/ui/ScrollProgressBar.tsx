import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin blue line at the very top of the viewport showing scroll progress.
 */
export function ScrollProgressBar(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 500, damping: 50, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#0066CC] z-[9998] origin-left"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgressBar;
