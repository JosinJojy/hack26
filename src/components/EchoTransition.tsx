"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function EchoTransition() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let isHeroReady = (typeof window !== "undefined" && (window as any).__HERO_READY__) || false;
    let isMinTimePassed = false;

    const checkDone = () => {
      if (isHeroReady && isMinTimePassed) {
        setShow(false);
        if (typeof window !== "undefined") {
          (window as any).__ECHO_DONE__ = true;
          // Dispatch event partway through the 1.5s fade out so hero animations start smoothly
          setTimeout(() => {
            window.dispatchEvent(new Event("echo-transition-complete"));
          }, 800);
        }
      }
    };

    const handleReady = () => {
      isHeroReady = true;
      checkDone();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("hero-ready", handleReady);
    }

    // A smooth 7.5-second cinematic sequence
    const timer = setTimeout(() => {
      isMinTimePassed = true;
      checkDone();
    }, 7500);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("hero-ready", handleReady);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="echo-transition"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9000] bg-[#010005] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Subtle deep space glow matching the Hero section */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full bg-[#2563EB]/10 blur-[120px]" />
          </div>

          {/* ECHO Eye Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.0, duration: 4.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen"
          >
            {/* <div className="relative w-full max-w-[600px] h-full max-h-[600px]">
              <Image
                src="/assets/echo-eye.webp"
                alt=""
                fill
                className="object-contain"
                loading="lazy"
              />
            </div> */}
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
            
            {/* 0 - 1.5s: SYSTEM BOOT RINGS (Acting as initial loading visual) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 1, 0] }}
              transition={{ times: [0, 0.8, 1], duration: 1.5, ease: "easeInOut" }}
              className="absolute flex flex-col items-center gap-12"
            >
              {/* Animated futuristic dual-spinning rings */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div 
                  className="absolute w-full h-full border-[2px] border-transparent border-t-[#3770FF] border-r-[#3770FF]/30 rounded-full animate-spin" 
                  style={{ animationDuration: '1.5s' }}
                />
                <div 
                  className="absolute w-14 h-14 border-[2px] border-transparent border-b-[#2563EB] border-l-[#2563EB]/50 rounded-full animate-spin" 
                  style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                />
                <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
              </div>

              <div className="flex items-center gap-6 opacity-80">
                <div className="w-10 md:w-16 h-[1px] bg-[#3770FF]/40" />
                <p className="text-[#3770FF] font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase animate-pulse">
                  System Boot
                </p>
                <div className="w-10 md:w-16 h-[1px] bg-[#3770FF]/40" />
              </div>
            </motion.div>

            {/* 1.5 - 3.0s: TRANSMISSION RECEIVED */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.5, duration: 1.5, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
              className="absolute text-blue-300 font-mono text-xs md:text-sm tracking-[0.3em] uppercase"
            >
              Transmission Received
            </motion.div>

            {/* 3.0 - 5.0s: ARCHIVE UNIT: ECHO / YEAR: 2898 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
              transition={{ delay: 3.0, duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
              className="absolute flex flex-col items-center gap-2"
            >
              <div className="text-white font-mono text-sm md:text-base tracking-[0.2em]">
                ARCHIVE UNIT: ECHO
              </div>
              <div className="text-blue-500/80 font-mono text-xs tracking-[0.3em]">
                YEAR: 2898
              </div>
            </motion.div>

            {/* 5.0 - 6.5s: A blueprint from the future has arrived. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }}
              transition={{ delay: 5.0, duration: 1.5, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
              className="absolute text-blue-200 font-mono text-xs md:text-sm tracking-[0.1em]"
            >
              A blueprint from the future has arrived.
            </motion.div>

            {/* 6.5 - 7.5s: .hack(); / IEEE SB MACE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 6.5, duration: 1, ease: "easeOut" }}
              className="absolute flex flex-col items-center"
            >
              <div className="text-3xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#38BDF8] font-blanka">
                .hack();
              </div>
              <div className="text-white/60 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mt-2">
                IEEE SB MACE
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
