"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion";
import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

import layer1Img from "../../../assets/landing/Layer 1.png";
import layer2Img from "../../../assets/landing/Layer 2.png";
import layer3Img from "../../../assets/landing/Layer 3.png";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const controls = useAnimation();
  const layerControls = useAnimation();

  useEffect(() => {
    // Check if images are already cached/loaded fast
    if (imagesLoaded >= 3) {
      if (typeof window !== "undefined") {
        (window as any).__HERO_READY__ = true;
        window.dispatchEvent(new Event("hero-ready"));
      }
    }
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    const handleTransitionComplete = () => {
      controls.start({
        opacity: 1,
        x: "0px",
        y: "0px",
        transition: { duration: 2, ease: [0.16, 1, 0.3, 1] }
      });
      layerControls.start({
        y: "0%",
        opacity: 1,
        transition: { duration: 1.6, ease: "easeOut" }
      });
    };

    if (typeof window !== "undefined" && (window as any).__ECHO_DONE__) {
      handleTransitionComplete();
    } else {
      window.addEventListener("echo-transition-complete", handleTransitionComplete);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("echo-transition-complete", handleTransitionComplete);
      }
    };
  }, [controls]);

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

  const registrationOpenAt = new Date("2026-07-15T00:00:00+05:30");
  const isRegistrationOpen = new Date() >= registrationOpenAt;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#010005]"
    >
      {/* Logos Header */}
      <div className="absolute top-6 left-0 w-full px-6 md:px-8 h-12 flex flex-row gap-3 md:gap-0 justify-start md:justify-between items-center z-50 pointer-events-auto">
        <div className="relative h-5 md:h-7 w-20 md:w-24 cursor-pointer transition-transform hover:scale-105">
          <Image 
            src="/logos/IEEE-mace.png" 
            alt="IEEE MACE SB Logo" 
            fill 
            className="object-contain object-left" 
            priority
          />
        </div>
        <div className="relative h-5 md:h-7 w-16 md:w-20 cursor-pointer transition-transform hover:scale-105">
          <Image 
            src="/logos/IEEE.png" 
            alt="IEEE Logo" 
            fill 
            className="object-contain object-left md:object-right" 
            priority
          />
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
            alt="IEEE SB MACE .hack26 hackathon background layer 3"
            fill
            className="object-cover object-right"
            priority
            onLoad={handleImageLoad}
            onError={handleImageLoad}
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
            animate={layerControls}
          >
            <Image
              src={layer2Img}
              alt="IEEE SB MACE .hack26 hackathon background layer 2"
              fill
              className="object-cover object-center md:object-bottom"
              priority
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
          </motion.div>
        </motion.div>

        {/* Layer 1 - Foreground Bottom Strip (Anchored below bottom to hide parallax gap) */}
        <motion.div
          className="absolute -bottom-[5vh] left-0 w-full sm:w-[65%] h-[35vh] md:h-[40vh] lg:h-[45vh] z-50"
          style={{
            y: layer1Y,
            x: mousePos.x * 1.5,
            translateY: mousePos.y * 1.5,
            willChange: "transform",
          }}
        >
          <Image
            src={layer1Img}
            alt="IEEE SB MACE .hack26 hackathon background layer 1"
            fill
            className="object-cover object-right"
            priority
            onLoad={handleImageLoad}
            onError={handleImageLoad}
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
          animate={controls}
          className="flex flex-col gap-2 max-w-2xl items-center text-center md:items-start md:text-left mx-auto md:mx-0 w-full px-2 min-[400px]:px-6 sm:px-8 md:px-0 [--start-x:0px] [--start-y:40px] md:[--start-x:-40px] md:[--start-y:0px]"
        >

          {/* Title */}
          <h1 className="relative w-full shrink-0 h-[16vw] min-[400px]:h-[4.75rem] sm:h-[6.175rem] md:h-[5.7rem] lg:h-[7.6rem]">
            <Image
              src="/logos/hack-logo.png"
              alt=">.hack26"
              fill
              className="object-contain object-center md:object-left drop-shadow-lg"
              priority
            />
          </h1>

          <div className="mt-2 md:mt-3 flex items-center gap-3 text-center md:text-left">
            
            <p className="text-[10px] sm:text-xs md:text-[13px] font-mono font-semibold uppercase tracking-[0.38em] text-white/95">
              DEFINE DESIGN DEPLOY
            </p>
           
          </div>

          {/* Countdown Timer */}
          <CountdownTimer targetDate="2026-09-04T00:00:00" />

          {/* CTAs - Devfolio Native Button styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8 w-full sm:w-auto px-4 sm:px-0">
            <motion.a
              href={isRegistrationOpen ? "https://dothack26.devfolio.co/" : undefined}
              target={isRegistrationOpen ? "_blank" : undefined}
              rel={isRegistrationOpen ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!isRegistrationOpen) e.preventDefault();
              }}
              whileHover={isRegistrationOpen ? { scale: 1.02 } : undefined}
              whileTap={isRegistrationOpen ? { scale: 0.98 } : undefined}
              className={`flex items-center justify-center gap-3 px-6 py-3.5 rounded-md font-semibold text-[15px] sm:text-[17px] transition-colors shadow-lg w-[85vw] max-w-[280px] sm:w-auto sm:min-w-[300px] ${
                isRegistrationOpen
                  ? "bg-[#3770FF] hover:bg-[#2B5DE5] text-white"
                  : "bg-slate-700/60 text-slate-300 opacity-60 pointer-events-none"
              }`}
            >
              {isRegistrationOpen && (
                <svg className="w-6 h-6" viewBox="0 0 115.46 123.46" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.46 68a55.43 55.43 0 0 1-50.85 55.11S28.12 131 16 123.76V68.13c0-15.54 11.23-26.68 26.68-26.68h72.78z"/>
                  <path d="M115.46 56.46a55.43 55.43 0 0 0-50.85-55.11S28.12-6 16 1.24v55.63c0 15.54 11.23 26.68 26.68 26.68h72.78z"/>
                </svg>
              )}
              {isRegistrationOpen ? "Apply with Devfolio" : "Registration opens tomorrow"}
            </motion.a>
            <motion.a
              href="https://chat.whatsapp.com/GqOOJmxw6ThLcnUGwXhCxD"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white rounded-md font-semibold text-[15px] sm:text-[17px] transition-colors shadow-lg w-[85vw] max-w-[280px] sm:w-auto sm:min-w-[200px]"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413z"/>
              </svg>
              Join Community
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
