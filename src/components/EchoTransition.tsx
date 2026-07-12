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

          {/* Faded IEEE MACE logo background — only appears in the final transition stage */}
          <motion.div
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ delay: 6.5, duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-[clamp(16rem,42vw,28rem)] h-[clamp(16rem,42vw,28rem)] sm:w-[clamp(18rem,38vw,30rem)] sm:h-[clamp(18rem,38vw,30rem)] md:w-[clamp(20rem,34vw,32rem)] md:h-[clamp(20rem,34vw,32rem)]">
              <Image
                src="/logos/IEEE-mace.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

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
              className="absolute flex flex-col items-center"
            >
              <style>{`
                @keyframes scan-line {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
                @keyframes pulse-core {
                  0%, 100% { opacity: 0.2; transform: scale(0.8); }
                  50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes spin-slow {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              
              {/* Premium Minimal SVG Tech Spinner */}
              <div className="relative w-16 h-16 mb-10 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                </svg>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin-slow 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#3770FF" strokeWidth="2" strokeLinecap="round" strokeDasharray="60 200" className="opacity-80" />
                </svg>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin-slow 3s linear infinite reverse' }}>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="30 250" />
                </svg>
                <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_12px_#38BDF8]" style={{ animation: 'pulse-core 2s ease-in-out infinite' }} />
              </div>

              {/* Minimal High-Tech Typography & Scan Line */}
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-5 opacity-90">
                  <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#3770FF]/50" />
                  <p className="text-[#38BDF8] font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
                    Igniting Innovation
                  </p>
                  <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#3770FF]/50" />
                </div>
                
                <div className="w-56 md:w-64 h-[1px] bg-slate-800/40 relative overflow-hidden rounded-full">
                  <div 
                    className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-80"
                    style={{ animation: 'scan-line 2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                  />
                </div>
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
                IEEE MACE SB
              </div>
              <div className="text-white/60 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mt-2">
                presents
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
