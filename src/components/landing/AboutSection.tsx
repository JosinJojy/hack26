"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import page2Img from "../../../assets/landing/page2.png";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] py-20 px-6 md:px-12 xl:px-24"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] z-0"
        style={{ y: yBg }}
      >
        <Image
          src={page2Img}
          alt="About Background"
          fill
          className="object-cover object-center "
        />
      </motion.div>

      {/* Gradient Overlays for smooth blending and text readability */}
      {/* <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" /> */}

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col gap-12 items-center md:items-start">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center  gap-3 w-full"
        >
          <div className="flex items-center gap-4 text-[#38BDF8] font-semibold tracking-[0.2em] text-sm md:text-base uppercase">
            <span className="w-12 h-[2px] bg-[#38BDF8] shadow-[0_0_10px_#38BDF8] text-center" />
            The Origin
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-xl font-[family-name:var(--font-blanka)] text-center">
            ABOUT US
          </h2>
        </motion.div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-full p-8 md:p-12 rounded-3xl bg-[#020617]/50"
        >
          {/* Subtle top left glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40  rounded-full pointer-events-none" />
          
          <p className="relative z-10 text-lg md:text-xl text-slate-300 font-light leading-relaxed md:leading-loose text-justify">
            <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-center" >›.hack();_ ‘25</span> is the 6th edition of IEEE MACE SB's flagship event, a dynamic 36-hour premier hackathon where creative minds converge to craft innovative solutions to critical social challenges. 
            The event welcomes students from all disciplines who share a passion for technology and social impact. Throughout the hackathon, participants will be guided and evaluated by esteemed industry professionals, fostering an environment that encourages collaboration and innovation. 
            <br /><br />
            Notably, <span className="text-[#38BDF8] font-medium drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">›.hack();_</span> has earned international acclaim by securing the <span className="text-white">IEEE Darrel Chong Student Activity Award</span>. 
            In addition to the intense coding sessions, the event will feature inspiring keynote talks and valuable networking opportunities, making <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">›.hack();_ ‘25</span> a holistic platform for learning, growth, and community.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
