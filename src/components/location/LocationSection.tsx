"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Plane, Train, Bus, Navigation } from "lucide-react";
import Image from "next/image";

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const waysToReach = [
    {
      title: "By Road / Bus",
      icon: <Bus className="w-6 h-6 text-[#0ea5e9]" />,
      description: "Easiest route: Take a KSRTC or private bus from Aluva or Ernakulam directly to Kothamangalam. The Kothamangalam KSRTC Bus Stand is just 3 km from the campus.",
    },
    {
      title: "By Train",
      icon: <Train className="w-6 h-6 text-[#0ea5e9]" />,
      description: "Aluva (AWY) is the nearest major railway station, roughly 35 km away. Frequent bus services connect Aluva directly to Kothamangalam.",
    },
    {
      title: "By Air",
      icon: <Plane className="w-6 h-6 text-[#0ea5e9]" />,
      description: "Nearest airport is Cochin International Airport (COK), about 32 km away. Taxis and direct buses are available to Kothamangalam.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#010005] py-20 lg:py-32 overflow-hidden font-sans"
    >
      {/* Background Decorations (Matching the Site Theme) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[50%] md:h-[40%] bg-[#0ea5e9]/5 blur-[100px] md:blur-[120px] rounded-[100%]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 md:gap-4 mb-12 md:mb-20 text-center"
        >
          <div className="flex items-center gap-3 md:gap-4 text-[#0ea5e9] font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase">
            <span className="w-8 md:w-12 h-[1px] bg-[#0ea5e9]/40" />
            <span>Find Us</span>
            <span className="w-8 md:w-12 h-[1px] bg-[#0ea5e9]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-blanka uppercase">
            How to Reach Us
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mt-2 px-2">
            Navigate your way to the ultimate hackathon experience at MACE.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Main Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 group relative flex flex-col w-full h-full"
          >
            <div className="absolute inset-0 bg-[#0ea5e9]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Cyberpunk Card Container */}
            <div 
              className="relative flex flex-col flex-grow bg-[#01020a]/80 backdrop-blur-xl border border-slate-800 group-hover:border-[#0ea5e9]/40 transition-colors duration-500 p-5 sm:p-6 md:p-8"
              style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-[2px] border-l-[2px] border-transparent group-hover:border-[#0ea5e9] transition-all duration-500 z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[2px] border-r-[2px] border-transparent group-hover:border-[#0ea5e9] transition-all duration-500 z-10" />
              
              <div className="flex flex-col h-full">
                {/* Header elements */}
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                  
                  {/* Mobile Header: Icon + Title */}
                  <div className="flex flex-row items-center gap-3 w-full sm:w-auto relative z-20">
                    <div 
                      className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 flex items-center justify-center"
                      style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
                    >
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#0ea5e9]" />
                    </div>
                    {/* Mobile Title */}
                    <h3 className="sm:hidden text-lg font-bold text-white font-blanka uppercase tracking-wide leading-tight flex-grow">
                      Baselious Paulose Indoor Stadium
                    </h3>
                  </div>

                  {/* Content Area */}
                  <div className="w-full relative z-20">
                    {/* Desktop Title */}
                    <h3 className="hidden sm:block text-lg md:text-2xl font-bold text-white font-blanka uppercase tracking-wide mb-1 leading-tight mt-1 sm:mt-0">
                      Baselious Paulose Indoor Stadium
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                      Mar Athanasius College of Engineering,<br />
                      Kothamangalam, Kerala 686666
                    </p>
                  </div>
                </div>

                {/* Image Section */}
                <div 
                  className="relative w-full h-36 sm:h-48 mb-5 sm:mb-6 overflow-hidden border border-slate-700 group-hover:border-[#0ea5e9]/30 transition-colors duration-500 z-20 mt-auto" 
                  style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                >
                  <div className="absolute inset-0 transition-colors duration-500 z-10 pointer-events-none" />
                  <Image 
                    src="/Indoor-Stadium-1.jpg" 
                    alt="MACE Indoor Stadium" 
                    fill
                    className="object-cover object-center transition-transform duration-700"
                  />
                </div>

                <a
                  href="https://maps.app.goo.gl/QdKBERCrVa8GixT37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-3 md:px-6 md:py-4 text-sm md:text-base font-bold hover:bg-[#0ea5e9] hover:text-white transition-colors duration-300 w-full cursor-pointer relative z-20 uppercase tracking-widest"
                  style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
                >
                  <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Transport Modes List */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
            {waysToReach.map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative w-full"
              >
                {/* Cyberpunk Item Card */}
                <div 
                  className="relative w-full bg-[#01020a]/60 backdrop-blur-xl border border-slate-800 group-hover:border-[#0ea5e9]/40 transition-all duration-500 flex flex-col sm:flex-row items-start gap-3 sm:gap-6 p-5 sm:p-6 md:p-8 overflow-hidden z-10"
                  style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
                >
                  {/* Subtle Background glow on hover */}
                  <div className="absolute inset-0 bg-[#0ea5e9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                  
                  {/* Small corner accents matching the theme */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-[#0ea5e9] transition-all duration-300 z-10" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-[#0ea5e9] transition-all duration-300 z-10" />

                  {/* Mobile Header: Icon + Title */}
                  <div className="flex flex-row items-center gap-3 w-full sm:w-auto relative z-10">
                    {/* Icon Container with chamfered edge */}
                    <div 
                      className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 bg-[#0ea5e9]/3 border border-[#0ea5e9]/20 group-hover:border-[#0ea5e9]/50 transition-colors duration-500 flex items-center justify-center mt-1 sm:mt-0"
                      style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
                    >
                      {way.icon}
                    </div>
                    {/* Mobile Title */}
                    <h3 className="sm:hidden text-base font-bold text-white group-hover:text-[#0ea5e9] transition-colors duration-300 uppercase tracking-wide font-blanka leading-tight mt-1 flex-grow">
                      {way.title}
                    </h3>
                  </div>
                  
                  {/* Content Area */}
                  <div className="relative z-10 flex-grow w-full">
                    {/* Desktop Title */}
                    <h3 className="hidden sm:block text-xl font-bold text-white group-hover:text-[#0ea5e9] transition-colors duration-300 mb-1 sm:mb-2 uppercase tracking-wide font-blanka leading-tight mt-0.5 sm:mt-0">
                      {way.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                      {way.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

