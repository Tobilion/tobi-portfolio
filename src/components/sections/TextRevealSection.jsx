import React from "react";
import { TextRevealByWord } from "../ui/text-reveal";

export function TextRevealSection() {
  return (
    <section className="relative w-full bg-[#F5F5F7] border-y border-slate-200/50">
      <TextRevealByWord 
        text="Crafting high-performance distributed systems, premium user interfaces, and custom developer tools with absolute attention to detail." 
      />
    </section>
  );
}

export default TextRevealSection;
