"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const images2025 = [
  "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg",
  "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg",
  "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg",
  "13.jpeg", "14.jpeg", "15.jpeg",
];

const images2024 = [
  "1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG",
  "6.JPG", "7.JPG", "8.JPG", "9.JPG", "10.JPG", "11.JPG"
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.05 } 
  })
};

function MobileCarousel({ images, folder, delayOffset = 0 }: { images: string[], folder: string, delayOffset?: number }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', dragFree: false }, 
    [Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: false })]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const timeout = setTimeout(() => {
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) {
        autoplay.play();
      }
    }, delayOffset);

    return () => clearTimeout(timeout);
  }, [emblaApi, delayOffset]);

  return (
    <div className="overflow-hidden w-full py-4 cursor-grab active:cursor-grabbing" ref={emblaRef}>
      <div className="flex backface-hidden touch-pan-y">
        {images.map((img, index) => (
          <div key={img} className="flex-[0_0_75vw] sm:flex-[0_0_55vw] min-w-0 mr-4 md:mr-6">
            <div className="relative group overflow-hidden rounded-lg bg-white/5 border border-white/10 aspect-[3/2] shadow-xl">
              <Image
                src={`/PreviousYear/${folder}/${img}`}
                alt={`Hackathon ${folder} highlight ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PreviousYearsPhotos() {
  const [cols, setCols] = useState(4);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCols = () => {
      if (window.innerWidth >= 1280) setCols(4); // xl
      else if (window.innerWidth >= 1024) setCols(3); // lg
      else if (window.innerWidth >= 640) setCols(2); // sm
      else setCols(1);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const renderMasonry = (images: string[], folder: string, delayOffset: number) => {
    if (!mounted) return <div className="min-h-[400px]"></div>;

    if (cols < 3) {
      return <MobileCarousel images={images} folder={folder} delayOffset={delayOffset} />;
    }

    const columnArrays: { img: string, originalIndex: number }[][] = Array.from({ length: cols }, () => []);
    images.forEach((img, index) => {
      columnArrays[index % cols].push({ img, originalIndex: index });
    });

    return (
      <div className="flex flex-row gap-4 items-start">
        {columnArrays.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4 flex-1">
            {col.map((item) => (
              <motion.div 
                key={item.img} 
                custom={item.originalIndex}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants} 
                className="relative group overflow-hidden rounded-lg bg-white/5 border border-white/10"
              >
                <Image
                  src={`/PreviousYear/${folder}/${item.img}`}
                  alt={`Hackathon ${folder} highlight ${item.originalIndex + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  return (
    <section className="relative w-full bg-[#010005] py-20 lg:py-32 overflow-hidden font-sans border-t border-white/5">
      {/* Background accents matching the timeline section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] bg-[#0ea5e9]/5 blur-[120px] rounded-[100%]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-16 lg:mb-24 text-center">
          <div className="flex items-center gap-4 text-[#0ea5e9] font-medium tracking-[0.2em] text-xs uppercase">
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
            <span>Legacy of Excellence</span>
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-blanka">
            PAST HIGHLIGHTS
          </h2>
          <p className="max-w-2xl text-slate-400 mt-4 text-sm md:text-base">
            Take a look back at the incredible moments, brilliant innovations, and unforgettable memories from our previous hackathons.
          </p>
        </div>

        {/* 2025 Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
             <h3 className="text-xl md:text-2xl font-bold text-white font-blanka tracking-wider">2025</h3>
             <div className="h-[2px] flex-1 bg-gradient-to-r from-[#0ea5e9]/50 to-transparent"></div>
          </div>
          {renderMasonry(images2025, "2025", 0)}
        </div>

        {/* 2024 Section */}
        <div>
          <div className="flex items-center gap-4 mb-10">
             <h3 className="text-xl md:text-2xl font-bold text-white font-blanka tracking-wider">2024</h3>
             <div className="h-[2px] flex-1 bg-gradient-to-r from-[#0ea5e9]/50 to-transparent"></div>
          </div>
          {renderMasonry(images2024, "2024", 1500)}
        </div>

      </div>
    </section>
  );
}
