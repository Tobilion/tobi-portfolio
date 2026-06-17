"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";

export function ScrollShowcase() {
  return (
    <div className="flex flex-col overflow-hidden bg-[#FAF9F6] dark:bg-[#0B0B0C] py-20 transition-colors duration-300">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono text-[#0066cc] tracking-widest uppercase font-semibold mb-2">
              03 / Scroll Showcase
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
              Unleash the Power of <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-1 bg-gradient-to-r from-[#0066CC] to-[#0ea5e9] bg-clip-text text-transparent leading-none">
                Fluid Animations
              </span>
            </h1>
          </div>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
          alt="Technical visualizer showcasing elegant system graphics"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export default ScrollShowcase;
