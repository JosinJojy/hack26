"use client";

import { useRef, useState, MouseEvent, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

import page2Img from "../../../assets/landing/page2.png";

const tracks = [
  { title: "Brick By Byte: Buidling Cities that think", description: "Intelligent smart city ecosystems that sense, connect, respond to a rapidly changing world", icon: "✧" },
  { title: "The World Redesigned for her", description: "A world designed around women's needs, experience, and anticipations", icon: "⎈" },
  { title: "Reclaiming Popcorn Brains", description: "Technologies that empower individuals to break unhealthy digital cycles and reclaim their time and attention", icon: "⨁" },
  { title: "Safe Sources & Zero Hunger", description: "Solutions that strengthen security by rethinking how we grow, manage, and sustain resources", icon: "⟠" },
  { title: "Care Beyound Labels", description: "Innovations that address often-overlooked dimentions of health and well-being", icon: "⟠" },
  { title: "Industry 4.0: Automation for good", description: "Smarter ecosystems where productivity, sustainability, and safety go hand in hand", icon: "⟠" },
  { title: "Inclusive Innovation : Access without limits", description: "An inclusive future enabled by equal access, participation, and opportunity", icon: "⟠" },
  { title: "Living with Uncertainties, Building with Resilience", description: "Solutions that help communities anticipate, withstand, & recover from natural and human-made calamities", icon: "⟠" }
];

const globalStyles = `
  body {
    overflow-x: hidden !important;
  }
  .perspective-1000 {
    perspective: 1000px;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
`;

function TrackCard({ track, index }: { track: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  // Default to true (mobile-first) to prevent huge desktop offsets from rendering on mobile devices before React hydrates
  const [isMobile, setIsMobile] = useState(true); 
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Set initial value immediately on mount
    setIsMobile(window.innerWidth < 768);
    
    // Update on resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Alternating entry animation: evens from left, odds from right
  const isLeft = index % 2 === 0;
  const rowIndex = Math.floor(index / 2);
  
  // Minimal slide distance for mobile to prevent horizontal scrolling/disconnect
  const offset = isMobile ? 15 : 150;
  const initialX = isLeft ? -offset : offset;

  // Stagger effect for desktop rows: Left card enters immediately, Right card enters slightly later.
  // We also add a cascading row delay for the first 3 rows to prevent the "group flash" if a user's large screen fits multiple rows at once.
  const colDelay = isLeft ? 0 : 0.25;
  const rowDelay = isMobile ? 0 : (rowIndex < 3 ? rowIndex * 0.3 : 0);
  const animDelay = isMobile ? 0 : colDelay + rowDelay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, x: initialX, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 1.2, delay: animDelay, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 w-full h-full will-change-transform"
      style={{ willChange: "transform, opacity" }}
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
          className="preserve-3d relative flex flex-col h-full w-full bg-[#01020a]/90 backdrop-blur-md border border-slate-700/40 group-hover:border-[#0284c7]/50 transition-colors duration-500 overflow-hidden p-8 z-10"
          style={{
            clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
          }}
        >
          <div className="absolute inset-0 opacity-10 group-hover:opacity-[0.15] transition-opacity duration-500 bg-[linear-gradient(rgba(2,132,199,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.2)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div 
            className="absolute w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.05)_0%,transparent_70%)] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" 
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />

          <h3 
            className="relative z-10 text-xl font-bold tracking-[0.15em] text-slate-200 mb-3 group-hover:text-[#0284c7] transition-colors duration-300 font-mono uppercase"
            style={{ transform: "translateZ(20px)" }}
          >
            {track.title}
          </h3>
          
          <motion.p 
            className="relative z-10 text-slate-400/90 text-sm md:text-xs lg:text-sm leading-[1.8] group-hover:text-slate-200 transition-colors duration-300 font-sans whitespace-pre-wrap"
            style={{ transform: "translateZ(10px)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            variants={{
              visible: { 
                transition: { 
                  staggerChildren: 0.015, 
                  delayChildren: animDelay + 0.5 
                } 
              } 
            }}
          >
            {track.description.split("").map((char: string, idx: number) => (
              <motion.span 
                key={idx} 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
          
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#0284c7]/30 group-hover:border-[#0284c7] group-hover:w-6 group-hover:h-6 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#0284c7]/30 group-hover:border-[#0284c7] group-hover:w-6 group-hover:h-6 transition-all duration-300" />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#0284c7] to-transparent group-hover:w-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutAndTracksSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div id="about" className="relative bg-[#010005]">
        
        {/* Sticky Centered Robot Background */}
        {/* Removed width constraints so object-contain can scale to true 100vh height */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <div className="relative w-full h-full opacity-30 md:opacity-80">
            <Image
              src={page2Img}
              alt="Futuristic cyber robot for IEEE SB MACE .hack26 hackathon"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>

        {/* Foreground Vertically Scrolling Content */}
        <div className="relative z-10 -mt-[100vh] flex flex-col w-full">
          
          {/* TRACKS SECTION */}
          <div id="tracks" className="min-h-screen w-full flex flex-col items-center px-4 md:px-12 xl:px-16 py-24">
            
            {/* Sticky Title Wrapper */}
            <div className="sm:sticky sm:top-10 md:top-24 z-20 w-full flex justify-center mb-10 md:mb-6 lg:mb-0 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4 shadow-2xl pointer-events-auto"
              >
                <div className="flex items-center gap-4 text-[#0284c7] font-medium tracking-[0.15em] text-sm uppercase">
                  <span className="w-8 h-[1px] bg-[#0284c7]" />
                  <span>Domains</span>
                  <span className="w-8 h-[1px] bg-[#0284c7]" />
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-blanka">
                  TRACKS
                </h2>
              </motion.div>
            </div>
            
            {/* Split Grid Layout: 
                Drastically increased gap-y (vertical spacing) to ensure users have to scroll to read each row.
                This prevents 6 cards from crowding the screen at once on large monitors.
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-24 lg:gap-y-32 xl:gap-y-40 md:gap-x-[25vw] lg:gap-x-[30vw] xl:gap-x-[35vw] w-full max-w-[1800px] mt-0 lg:-mt-12 xl:-mt-16">
              {tracks.map((track, i) => (
                <TrackCard key={i} track={track} index={i} />
              ))}
            </div>

          </div>

          {/* ABOUT US SECTION */}
          <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 xl:px-24 py-24 md:py-32">
            <div className="w-full max-w-4xl flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-4 text-[#0284c7] font-medium tracking-[0.15em] text-sm uppercase">
                  <span className="w-8 h-[1px] bg-[#0284c7]" />
                  <span>The Origin</span>
                  <span className="w-8 h-[1px] bg-[#0284c7]" />
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-blanka">
                  ABOUT US
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="relative p-8 md:p-12 bg-[#01020a]/10 backdrop-blur-sm border border-slate-700/40 shadow-[0_0_30px_rgba(2,132,199,0.05)] overflow-hidden"
                style={{
                  clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
                }}
              >
                <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(2,132,199,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#0284c7]/50" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#0284c7]/50" />
                
                <p className="relative z-10 text-lg md:text-xl text-slate-300/90 font-light leading-relaxed md:leading-loose text-center font-sans">
                  <span className="text-white font-medium">&gt;.hack();_ &lsquo;26{" "}</span> marks the 7th edition of IEEE MACE Student Branch&apos;s flagship event, a dynamic 36-hour premier hackathon dedicated to converging creative minds, technology and social impact. The event brings together students from diverse academic disciplines with a shared commitment to developing both hardware and software solutions that tackle real-world challenges. 
                  <br /><br />
                  <span className="text-white font-medium" >Recognized globally</span>  with the <span className="text-white font-medium">IEEE Darrel Chong Student Activity Award</span> and officially honored with the <span className="text-white font-medium">IEEE Kochi Subsection Best Event Award</span>, <span className="text-[#0284c7] font-medium">&gt;.hack();_</span> continues to set the benchmark for student-led innovation. Beyond intense building sessions, the event features inspiring keynote talks and curated networking opportunities, positioning <span className="text-white font-medium">&gt;.hack();_ &lsquo;26</span> as not merely a hackathon, but a platform for professional growth and industry opportunities.
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
