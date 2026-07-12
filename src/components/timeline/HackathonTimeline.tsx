"use client";

import { motion, useScroll, useMotionValue, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const milestones = [
  { id: "m1", date: "July 05", title: "Theme & Tracks Release", desc: "The grand reveal of the hackathon theme, setting the stage for innovation." },
  { id: "m2", date: "July 12", title: "Website & Registration Live", desc: "Registration portal opens. Form your teams and secure your spots early." },
  { id: "m3", date: "August 08", title: "Abstract Deadline", desc: "Final day to submit your project ideas and initial blueprints." },
  { id: "m4", date: "August 24", title: "Shortlist Released", desc: "Announcement of the elite teams advancing to the final showdown." },
  { id: "m5", date: "September 4-6", title: "Offline Hackathon", desc: "36 hours of intense building, networking, and competing." },
];

type Milestone = typeof milestones[0];

export default function HackathonTimeline() {
  const [phase, setPhase] = useState(0); // 0=idle, 1=horizontal draw, 2=collapse, 3=vertical expand
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (phase === 3) {
      const rawIndex = Math.floor(latest * milestones.length);
      const clampedIndex = Math.max(0, Math.min(milestones.length - 1, rawIndex));
      if (clampedIndex !== activeIndex) {
        setActiveIndex(clampedIndex);
      }
    }
  });

  useEffect(() => {
    // Trigger animation only when the TIMELINE heading is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPhase((prev) => (prev === 0 ? 1 : prev));
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Ensure the heading is clearly visible
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 1000); // Sped up Phase 1 hold time
      return () => clearTimeout(t);
    }
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 900); // 0.2s delay + 0.6s animation = 0.8s. 0.9s buffer.
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isExpanded = phase === 3;
  
  // Faster, snappier collapse transition
  const phase2Transition: import("framer-motion").Transition = { 
    duration: 0.6, 
    ease: "easeInOut", 
    delay: phase === 2 ? 0.2 : 0 
  };

  const progressHeight = isExpanded ? `${(activeIndex + 1) * 20}%` : "0%";

  return (
    <section id="timeline" ref={sectionRef} className="relative w-full bg-[#010005] py-24 lg:py-40 overflow-hidden font-sans min-h-screen">
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}} />

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] bg-[#0ea5e9]/5 blur-[120px] rounded-[100%]" />
      </div>

      <div ref={headingRef} className="relative z-10 flex flex-col items-center gap-4 mb-16 lg:mb-24 text-center px-4">
        <div className="flex items-center gap-4 text-[#0ea5e9] font-medium tracking-[0.2em] text-xs uppercase">
          <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
          <span>Mission Progress</span>
          <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-blanka">
          TIMELINE
        </h2>
      </div>

      <motion.div 
         layout
         transition={{ layout: phase === 2 ? phase2Transition : { duration: 0.6, ease: "easeInOut" } as import("framer-motion").Transition }}
         ref={containerRef} 
         className={`relative z-20 w-full max-w-6xl mx-auto flex 
           ${isExpanded ? 'flex-col gap-20 lg:gap-32 py-10 lg:py-20 px-4 md:px-12' : 'flex-row items-center h-[300px] px-4 md:px-16'}
           ${phase === 2 ? 'justify-center gap-0' : 'justify-between'}
         `}
      >
         
         {/* Horizontal Intro Line (Phase 1 & 2) */}
         {phase < 3 && (
            <motion.div 
               className="absolute left-4 right-4 md:left-16 md:right-16 h-[2px] top-1/2 -translate-y-1/2 bg-[#0ea5e9] shadow-[0_0_15px_#0ea5e9] origin-center z-0"
               initial={{ scaleX: 0, opacity: 0 }}
               animate={{ 
                 scaleX: phase === 1 ? 1 : 0, 
                 opacity: phase === 1 ? 1 : (phase === 2 ? 1 : 0) 
               }}
               transition={phase === 2 ? phase2Transition : { duration: 0.6, ease: "easeOut" }}
            />
         )}

         {/* Vertical Background Line (Phase 3) */}
         {isExpanded && (
            <motion.div 
               className="absolute left-[39px] lg:left-1/2 top-0 bottom-0 w-[2px] lg:-translate-x-[1px] bg-slate-800/80 origin-center z-0"
               initial={{ scaleY: 0, opacity: 0 }}
               animate={{ scaleY: 1, opacity: 1 }}
               transition={{ duration: 0.6, ease: "easeInOut" }}
            />
         )}

         {/* Vertical STEPPED Progress Line (Expanded) */}
         {isExpanded && (
            <motion.div 
               className="absolute left-[39px] lg:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#0ea5e9] to-[#38bdf8] lg:-translate-x-[1px] origin-top z-10 shadow-[0_0_15px_#0ea5e9]"
               initial={{ height: "0%", opacity: 0 }}
               animate={{ height: progressHeight, opacity: 1 }}
               transition={{ duration: 0.5, ease: "easeOut", opacity: { delay: 0.5 } }}
            />
         )}

         {milestones.map((m, i) => (
            <TimelineNode key={m.id} milestone={m} index={i} phase={phase} activeIndex={activeIndex} phase2Transition={phase2Transition} />
         ))}

      </motion.div>
    </section>
  );
}

function TimelineNode({ milestone, index, phase, activeIndex, phase2Transition }: { milestone: Milestone, index: number, phase: number, activeIndex: number, phase2Transition: import("framer-motion").Transition }) {
  const isExpanded = phase === 3;
  const isLeft = index % 2 !== 0; 
  
  const isActive = !isExpanded || index === activeIndex;
  
  const nodeLayoutTransition = phase === 2 ? phase2Transition : { duration: 0.6, ease: "easeInOut" } as import("framer-motion").Transition;
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isExpanded) return;
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
  };

  return (
    <motion.div 
       layout
       transition={{ layout: nodeLayoutTransition }}
       className={`relative flex items-center z-20 
         ${isExpanded ? `w-full ${isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[120px]` : `flex-col justify-center ${phase === 2 ? 'flex-none w-4 -mx-2' : 'flex-1'}`}
       `}
    >
       {/* Spacer for desktop alternating layout */}
       {isExpanded && <div className="hidden lg:block lg:w-1/2" />}
       
       {/* Central Marker */}
       <motion.div 
          layout
          transition={{ layout: nodeLayoutTransition }}
          className={`flex items-center justify-center shrink-0 ${isExpanded ? 'absolute left-[39px] lg:left-1/2 -translate-x-[15px] lg:-translate-x-1/2 w-[30px] h-[30px]' : 'relative w-4 h-4'}`}
       >
          <motion.div 
             layout
             initial={{ scale: 0 }}
             animate={{
                scale: phase === 0 ? 0 : (isActive ? 1.5 : 1),
                rotate: 45,
                backgroundColor: isActive ? "#fff" : "#0f172a",
                borderColor: isActive ? "#0ea5e9" : "#334155",
             }}
             transition={{ duration: 0.3, delay: phase === 0 ? 0 : index * 0.08 }}
             className={`w-3 h-3 border-[2px] ${isActive ? 'shadow-[0_0_20px_#0ea5e9]' : ''}`}
          />

          <AnimatePresence>
          {!isExpanded && (
             <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : (phase === 2 ? -10 : 10) }}
                transition={{ duration: 0.2, delay: phase === 1 ? 0.3 + index * 0.08 : 0 }}
                // Responsive positioning to prevent overlap on small mobile screens
                className={`absolute flex flex-col items-center text-center w-[80px] md:w-[120px] -ml-[40px] md:-ml-[60px] left-1/2 ${index % 2 !== 0 ? '-top-14 md:top-6' : 'top-6'}`}
             >
                <p className="text-white font-mono font-bold text-[10px] md:text-sm whitespace-nowrap uppercase">{milestone.date}</p>
                <p className="text-[#0ea5e9] text-[8px] md:text-[10px] uppercase tracking-widest mt-1 whitespace-nowrap">{milestone.title}</p>
             </motion.div>
          )}
          </AnimatePresence>
       </motion.div>

       {/* Content */}
       <AnimatePresence>
       {isExpanded && (
          <motion.div 
             key="card"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
             className={`w-full pl-24 lg:pl-0 lg:w-1/2 flex ${isLeft ? 'lg:justify-end lg:pr-16' : 'lg:justify-start lg:pl-16'}`}
          >
             <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                className={`relative w-full max-w-[450px] p-6 lg:p-8 transition-all duration-1000 ease-out group perspective-1000 preserve-3d ${isActive ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'}`}
             >
                {/* Background with sharp chamfered edges */}
                <div 
                  className={`absolute inset-0 bg-[#01020a]/90 border backdrop-blur-xl transition-all duration-700 ease-out z-0 ${isActive ? 'border-[#0ea5e9]/50 shadow-[0_10px_40px_-10px_rgba(14,165,233,0.3)]' : 'border-slate-800'}`}
                  style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
                />

                {/* Cyberpunk corner accents sitting outside the chamfer */}
                <div className={`absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] transition-all duration-500 z-10 ${isActive ? 'border-[#0ea5e9]' : 'border-transparent'}`} />
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] transition-all duration-500 z-10 ${isActive ? 'border-[#0ea5e9]' : 'border-transparent'}`} />

                <div className="relative z-20 flex flex-col gap-2" style={{ transform: "translateZ(30px)" }}>
                  <div className="absolute -top-4 -right-2 text-6xl lg:text-7xl font-bold font-sans pointer-events-none transition-colors duration-500">
                    <span className={isActive ? "text-[#0ea5e9]/20" : "text-slate-800/30"}>
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-white font-bold font-mono text-2xl lg:text-3xl tracking-wide uppercase">{milestone.date}</h3>
                  <div className={`h-[2px] bg-[#0ea5e9] my-1 transition-all duration-700 ease-out ${isActive ? 'w-16' : 'w-0'}`} />
                  <h4 className={`text-lg lg:text-xl font-semibold transition-colors duration-500 ${isActive ? 'text-[#0ea5e9]' : 'text-slate-500'}`}>{milestone.title}</h4>
                  <p className="text-slate-400 text-sm lg:text-base leading-relaxed mt-2">{milestone.desc}</p>
                </div>
             </motion.div>
          </motion.div>
       )}
       </AnimatePresence>
    </motion.div>
  )
}
