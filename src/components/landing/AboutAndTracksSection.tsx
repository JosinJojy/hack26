"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

import page2Img from "../../../assets/landing/page2.png";

const tracks = [
  { title: "Generative AI", description: "Architect intelligent systems leveraging large language models and advanced generative frameworks.", icon: "✧" },
  { title: "Web3 & Block", description: "Design decentralized applications, robust smart contracts, and scalable Web3 infrastructure.", icon: "⎈" },
  { title: "HealthTech", description: "Drive innovations in modern healthcare, diagnostics, and seamless patient management.", icon: "⨁" },
  { title: "FinTech", description: "Build solutions for financial inclusion, decentralized finance, and next-gen banking.", icon: "⟠" }
];

const globalStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
`;

function TrackCard({ track, index }: { track: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="perspective-1000 w-full h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="preserve-3d group relative flex flex-col w-full h-full cursor-pointer"
      >
        <div className="absolute inset-0 bg-[#0284c7]/0 group-hover:bg-[#0284c7]/10 blur-xl transition-colors duration-500 rounded-lg pointer-events-none" />

        <div 
          className="preserve-3d relative flex flex-col h-full w-full bg-[#01020a]/90 backdrop-blur-xl border border-slate-700/40 group-hover:border-[#0284c7]/50 transition-colors duration-500 overflow-hidden p-8 z-10"
          style={{
            clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
          }}
        >
          <div className="absolute inset-0 opacity-10 group-hover:opacity-[0.15] transition-opacity duration-500 bg-[linear-gradient(rgba(2,132,199,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.2)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div 
            className="absolute w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.05)_0%,transparent_70%)] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" 
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />

          {/* <div 
            className="relative mb-10 mt-2 self-start flex items-center justify-center w-14 h-14"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="absolute inset-[-4px] border border-[#0284c7]/20 rounded-full group-hover:border-[#0284c7]/80 group-hover:scale-110 transition-all duration-500 animate-[spin_6s_linear_infinite]" />
            <div className="absolute inset-[-8px] border border-dashed border-[#0284c7]/20 rounded-full group-hover:border-[#0284c7]/40 transition-all duration-500 animate-[spin_10s_linear_infinite_reverse]" />
            
            <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-[#01020a] border border-slate-700/80 group-hover:border-[#0284c7] group-hover:shadow-[0_0_20px_rgba(2,132,199,0.4)] transition-all duration-500">
              <span className="text-[#0284c7] text-2xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(2,132,199,0.8)]">
                {track.icon}
              </span>
            </div>
          </div> */}

          <h3 
            className="relative z-10 text-xl font-bold tracking-[0.15em] text-slate-200 mb-3 group-hover:text-[#0284c7] transition-colors duration-300 font-mono uppercase"
            style={{ transform: "translateZ(20px)" }}
          >
            {track.title}
          </h3>
          
          <p 
            className="relative z-10 text-slate-400/90 text-sm md:text-xs lg:text-sm leading-[1.8] group-hover:text-slate-200 transition-colors duration-300 font-sans"
            style={{ transform: "translateZ(10px)" }}
          >
            {track.description}
          </p>
          
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#0284c7]/30 group-hover:border-[#0284c7] group-hover:w-6 group-hover:h-6 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#0284c7]/30 group-hover:border-[#0284c7] group-hover:w-6 group-hover:h-6 transition-all duration-300" />
          
          <div className="absolute bottom-4 right-5 text-[9px] font-mono tracking-wider text-[#0284c7]/20 group-hover:text-[#0284c7]/60 transition-colors duration-300">
            SEC.{track.title.substring(0, 3).toUpperCase()} // {120 + index * 14}.{890 - index * 7}
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#0284c7] to-transparent group-hover:w-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutAndTracksSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const robotX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <section ref={targetRef} id="about" className="relative h-[200vh] bg-[#010005]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          <motion.div 
            className="absolute inset-0 flex justify-center items-end pointer-events-none z-0"
            style={{ x: robotX }}
          >
            <div className="relative w-[120%] md:w-[90%] lg:w-[75%] h-[95vh]">
              <Image
                src={page2Img}
                alt="Robot Background"
                fill
                className="object-contain object-bottom opacity-[0.85]"
                priority
              />
            </div>
          </motion.div>

          <motion.div 
            style={{ x }} 
            className="relative z-10 flex w-[200vw] h-full"
          >
            <div className="w-screen h-full flex items-center px-6 md:px-12 xl:px-24">
              <div className="w-full md:w-1/2 flex flex-col gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4 text-[#0284c7] font-medium tracking-[0.15em] text-sm uppercase">
                    <span className="w-8 h-[1px] bg-[#0284c7]" />
                    <span>The Origin</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-[family-name:var(--font-blanka)]">
                    ABOUT US
                  </h2>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative p-8 md:p-10 bg-[#01020a]/90 backdrop-blur-xl border border-slate-700/40 shadow-[0_0_30px_rgba(2,132,199,0.05)] overflow-hidden"
                  style={{
                    clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(2,132,199,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#0284c7]/50" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#0284c7]/50" />
                  
                  <p className="relative z-10 text-lg text-slate-300/90 font-light leading-relaxed md:leading-loose text-justify font-sans">
                    <span className="text-white font-medium">›.hack();_ ‘25</span> is the 6th edition of IEEE MACE SB's flagship event, a dynamic 36-hour premier hackathon where creative minds converge to craft innovative solutions to critical social challenges. 
                    <br /><br />
                    Notably, <span className="text-[#0284c7] font-medium">›.hack();_</span> has earned international acclaim by securing the <span className="text-white font-medium">IEEE Darrel Chong Student Activity Award</span>. 
                    In addition to the intense coding sessions, the event features inspiring keynote talks and valuable networking opportunities, uniting technology enthusiasts to shape the future.
                  </p>
                </motion.div>
              </div>
            </div>

            <div id="tracks" className="w-screen h-full flex items-center justify-end px-6 md:px-12 xl:px-24">
              <div className="w-full md:w-[55%] flex flex-col gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col md:items-end gap-4"
                >
                  <div className="flex items-center gap-4 text-[#0284c7] font-medium tracking-[0.15em] text-sm uppercase">
                    <span className="w-8 h-[1px] bg-[#0284c7]" />
                    <span>Domains</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-[family-name:var(--font-blanka)]">
                    TRACKS
                  </h2>
                </motion.div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {tracks.map((track, i) => (
                    <TrackCard key={i} track={track} index={i} />
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
