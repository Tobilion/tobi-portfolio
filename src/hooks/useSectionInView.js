import { useRef } from "react";
import { useInView } from "framer-motion";

export function useSectionInView(threshold = 0.05) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: threshold });
  return { ref, isInView };
}

export default useSectionInView;