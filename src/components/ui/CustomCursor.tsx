import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Glowing custom cursor — hidden on touch devices.
 * A small dot tracks the exact mouse position; a larger aura follows
 * with a spring delay for a premium feel.
 */
export function CustomCursor(): React.JSX.Element | null {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const isHovering = useRef(false);

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });
  const auraX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.6 });
  const auraY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 });

  // Hide on touch / mobile devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  useEffect(() => {
    const move = (e: MouseEvent): void => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const over = (e: MouseEvent): void => {
      const el = e.target as HTMLElement;
      isHovering.current = !!(
        el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]")
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Aura — slow spring follower */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          background: "rgba(0, 102, 204, 0.15)",
          border: "1px solid rgba(0, 102, 204, 0.35)",
        }}
      />
      {/* Dot — snaps tightly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "#0066CC",
        }}
      />
    </>
  );
}

export default CustomCursor;
