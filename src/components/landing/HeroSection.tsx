"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

import layer1Img from "../../../assets/landing/Layer 1.png";
import layer2Img from "../../../assets/landing/Layer 2.png";
import layer3Img from "../../../assets/landing/Layer 3.png";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Inject Devfolio script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smoother scroll for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Layer 3 (Background) - Completely static
  const layer3Y = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);
  // Layer 2 (Midground Building) - Rising effect (moves UP as we scroll down)
  const layer2Y = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
  // Layer 1 (Foreground Bottom Strip) - Anchored at the bottom so it doesn't reveal the building's bottom
  const layer1Y = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);

  // Content Parallax & Fade
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#010005]"
    >
      {/* Logos Header */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex flex-row gap-8 md:gap-0 justify-start md:justify-between items-start z-50 pointer-events-auto">
        <div className="text-lg md:text-xl font-bold text-white tracking-[0.15em] flex flex-col items-start cursor-pointer hover:text-[#0284c7] transition-colors font-mono">
          <span>IEEE<span className="text-[#0284c7]">.</span></span>
          <span className="text-[8px] font-mono text-slate-400/80 mt-1 uppercase tracking-[0.2em]">Logo Placeholder</span>
        </div>
        <div className="text-base md:text-lg font-bold text-slate-200 tracking-[0.1em] flex flex-col items-start md:items-end cursor-pointer hover:text-[#0284c7] transition-colors font-mono">
          <span>IEEE MACE SB</span>
          <span className="text-[8px] font-mono text-slate-400/80 mt-1 uppercase tracking-[0.2em]">Logo Placeholder</span>
        </div>
      </div>

      {/* Deep Space Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-[#2563EB]/10 blur-[150px]" />
      </div>

      {/* Layer Stack Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Layer 3 - Background (Farthest depth) */}
        <motion.div
          className="absolute inset-0 w-full h-[110%] scale-105 z-0"
          style={{
            y: layer3Y,
            x: mousePos.x * 0.2,
            translateY: mousePos.y * 0.2,
            willChange: "transform",
          }}
        >
          <Image
            src={layer3Img}
            alt=""
            fill
            className="object-cover object-right"
            priority
          />
        </motion.div>

        {/* Layer 2 - Midground (Main City Visual) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[125%] scale-105 z-10"
          style={{
            y: layer2Y,
            x: mousePos.x * 0.6,
            translateY: mousePos.y * 0.6,
            willChange: "transform",
          }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ y: "-10%", opacity: 1 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <Image
              src={layer2Img}
              alt=""
              fill
              className="object-cover object-center md:object-bottom"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Layer 1 - Foreground Bottom Strip (Anchored below bottom to hide parallax gap) */}
        <motion.div
          className="absolute -bottom-[5vh] left-0 w-full sm:w-[65%] h-[35vh] md:h-[40vh] lg:h-[45vh] z-30"
          style={{
            y: layer1Y,
            x: mousePos.x * 1.5,
            translateY: mousePos.y * 1.5,
            willChange: "transform",
          }}
        >
          <Image
            src={layer1Img}
            alt=""
            fill
            className="object-cover object-right"
            priority
          />
        </motion.div>
      </div>

      {/* Overlays for Contrast & Readability */}
      {/* 1. Global dark gradient overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617]/50 pointer-events-none" />
      {/* 2. Left-side readability gradient */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent pointer-events-none w-full md:w-3/4 lg:w-2/3" />
      {/* 3. Soft radial blue glow around title zone */}
      <div className="absolute top-1/3 left-10 z-20 pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-[#1D4ED8]/15 blur-[120px]" />
      </div>
      {/* 4. Vignette / Edge darkening */}
      <div className="absolute inset-0 z-20 shadow-[inset_0_0_150px_rgba(2,6,23,0.9)] pointer-events-none" />

      {/* Content Container (Left-aligned on md+, Centered on mobile) */}
      <motion.div
        className="relative z-40 flex flex-col justify-center items-center md:items-start h-full w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-24 pointer-events-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0.01, x: "var(--start-x)", y: "var(--start-y)" }}
          animate={{ opacity: 1, x: "0px", y: "0px" }}
          transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 max-w-2xl items-center text-center md:items-start md:text-left mx-auto md:mx-0 w-full px-6 sm:px-8 md:px-0 [--start-x:0px] [--start-y:40px] md:[--start-x:-40px] md:[--start-y:0px]"
        >

          {/* Title */}
          <h1 className="text-[5rem] sm:text-[6.5rem] md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.95] drop-shadow-lg font-blanka">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#38BDF8]">
              {">.hack26"}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 font-light leading-relaxed max-w-md mt-2 px-4 md:px-0 font-sans">
            Build bold ideas, ship real prototypes, and compete with the next
            generation of student innovators.
          </p>

          {/* Countdown Timer */}
          <CountdownTimer targetDate="2026-09-04T00:00:00" />

          {/* CTAs - Devfolio Native Button styling */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 w-full sm:w-auto px-4 sm:px-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-8 py-3.5 bg-[#3770FF] hover:bg-[#2B5DE5] text-white rounded-md font-semibold text-[17px] transition-colors shadow-lg w-full sm:w-auto min-w-[300px]"
            >
              <svg className="w-6 h-6" viewBox="0 0 115.46 123.46" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M115.46 68a55.43 55.43 0 0 1-50.85 55.11S28.12 131 16 123.76V68.13c0-15.54 11.23-26.68 26.68-26.68h72.78z"/>
                <path d="M115.46 56.46a55.43 55.43 0 0 0-50.85-55.11S28.12-6 16 1.24v55.63c0 15.54 11.23 26.68 26.68 26.68h72.78z"/>
              </svg>
              Apply with Devfolio
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
