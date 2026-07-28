import { useRef } from "react";
import { useInView } from "framer-motion";

export function useSectionInView(threshold = 0.25) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

export default useSectionInView;