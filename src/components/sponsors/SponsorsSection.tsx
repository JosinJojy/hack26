"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const sponsors = [
  { name: "Verbwire", logo: "/sponsors/verbwire.svg", alt: "Verbwire Logo" },
  { name: "DigitalOcean", logo: "/sponsors/digitalocean.svg", alt: "DigitalOcean Logo" },
  { name: "eventopia", logo: "/sponsors/eventopia.svg", alt: "eventopia Logo" },
  { name: "Filecoin", logo: "/sponsors/filecoin.svg", alt: "Filecoin Logo" },
  { name: "Accelerate-X", logo: "/sponsors/accelerate-x.jpg", alt: "Accelerate-X Logo" },
  { name: "Polygon", logo: "/sponsors/polygon.svg", alt: "Polygon Logo" },
  { name: "Devfolio", logo: "/sponsors/devfolio.svg", alt: "Devfolio Logo" },
  { name: "experion", logo: "/sponsors/experion.svg", alt: "experion Logo" },
  { name: "solana", logo: "/sponsors/solana.png", alt: "solana Logo" },
  { name: "replit", logo: "/sponsors/replit.svg", alt: "replit Logo" },
  { name: "Streamyard", logo: "/sponsors/streamyard.svg", alt: "Streamyard Logo" },
  { name: "keyvalue", logo: "/sponsors/keyvalue.jpeg", alt: "keyvalue Logo" },
  { name: "Tezos", logo: "/sponsors/tezos.svg", alt: "Tezos Logo" },
  { name: "QBurst", logo: "/sponsors/qburst.svg", alt: "QBurst Logo" },
  { name: "being abroad", logo: "/sponsors/being-abroad.svg", alt: "being abroad Logo" },
  { name: "innovation", logo: "/sponsors/innovation.svg", alt: "innovation Logo" },
  { name: "orkes", logo: "/sponsors/orkes.jpeg", alt: "orkes Logo" },
  { name: "innovater", logo: "/sponsors/innovature.svg", alt: "innovater Logo" },
  { name: "WMC", logo: "/sponsors/wmc.jpeg", alt: "WMC Logo" },
  { name: "ICT", logo: "/sponsors/ict.svg", alt: "ICT Logo" },
  { name: "MBMM", logo: "/sponsors/experion.svg", alt: "experion Logo" },
];


export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative w-full bg-[#010005] py-24 lg:py-40 overflow-hidden font-sans min-h-[600px]"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] bg-[#0ea5e9]/5 blur-[120px] rounded-[100%]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-16 lg:mb-24 text-center px-4"
        >
          <div className="flex items-center gap-4 text-[#0ea5e9] font-medium tracking-[0.2em] text-xs uppercase">
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
            <span>Trusted by Industry Leaders</span>
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-blanka uppercase">
            Previous Sponsors
          </h2>
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-2xl mt-2">
            We&apos;re proud to have partnered with organizations that support
            innovation, technology, and student talent.
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="group relative"
            >
              {/* Sponsor Card */}
              <div className="relative flex items-center justify-center h-32 md:h-40 p-6 transition-all duration-300 group-hover:-translate-y-1.5">
                {/* Background with sharp chamfered edges */}
                <div 
                  className="absolute inset-0 bg-[#01020a]/90 border border-slate-800 backdrop-blur-xl transition-all duration-500 ease-out z-0 group-hover:border-[#0ea5e9]/50"
                  style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
                />

                {/* Cyberpunk corner accents sitting outside the chamfer */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-transparent transition-all duration-500 z-10 group-hover:border-[#0ea5e9]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-transparent transition-all duration-500 z-10 group-hover:border-[#0ea5e9]" />

                <div className="relative z-20 w-[75%] h-[55%] flex items-center justify-center mx-auto">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.alt} - IEEE SB MACE .hack26 Sponsor`}
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
