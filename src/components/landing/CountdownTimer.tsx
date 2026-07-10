"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string | Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    d: "00",
    h: "00",
    m: "00",
    s: "00",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ d: "00", h: "00", m: "00", s: "00" });
      } else {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0"),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0"),
          s: Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="mt-8 flex flex-col items-center md:items-start gap-1">
        <div className="flex items-center font-[family-name:var(--font-blanka)] text-4xl sm:text-5xl lg:text-6xl text-white/30 tracking-widest">
          00<span className="mx-2 text-white/10">:</span>00<span className="mx-2 text-white/10">:</span>00<span className="mx-2 text-white/10">:</span>00
        </div>
        <div className="flex w-full justify-between px-2 text-[10px] sm:text-xs text-white/20 uppercase tracking-[0.2em] font-medium">
          <span className="flex-1 text-center">Days</span>
          <span className="flex-1 text-center">Hrs</span>
          <span className="flex-1 text-center">Min</span>
          <span className="flex-1 text-center">Sec</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-8 flex flex-col items-center md:items-start gap-2"
    >
      <div className="flex items-center font-[family-name:var(--font-blanka)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-widest">
        <div className="flex flex-col items-center">
          <span>{timeLeft.d}</span>
          <span className="text-[10px] sm:text-xs text-[#38BDF8]/70 uppercase tracking-[0.2em] font-sans font-medium mt-1">Days</span>
        </div>
        <span className="mx-2 sm:mx-4 text-[#38BDF8]/30 pb-4">:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.h}</span>
          <span className="text-[10px] sm:text-xs text-[#38BDF8]/70 uppercase tracking-[0.2em] font-sans font-medium mt-1">Hours</span>
        </div>
        <span className="mx-2 sm:mx-4 text-[#38BDF8]/30 pb-4">:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.m}</span>
          <span className="text-[10px] sm:text-xs text-[#38BDF8]/70 uppercase tracking-[0.2em] font-sans font-medium mt-1">Mins</span>
        </div>
        <span className="mx-2 sm:mx-4 text-[#38BDF8]/30 pb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[#38BDF8]">{timeLeft.s}</span>
          <span className="text-[10px] sm:text-xs text-[#38BDF8]/70 uppercase tracking-[0.2em] font-sans font-medium mt-1">Secs</span>
        </div>
      </div>
    </motion.div>
  );
}
