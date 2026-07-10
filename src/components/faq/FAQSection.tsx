"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How many participants can be in a team ?",
    answer: "Teams can consist of 1 to 4 participants."
  },
  {
    question: "Who can participate in >.hack();_ ?",
    answer: "Students from all disciplines with a passion for technology and innovation are welcome to participate."
  },
  {
    question: "Is there a registration fee ?",
    answer: "No, registration for >.hack();_ is completely free."
  },
  {
    question: "How are participants selected ?",
    answer: "Participants are selected based on their application and alignment with the event’s values and goals."
  },
  {
    question: "Whats the format of the event ?",
    answer: "It’s a 36-hour in-person hackathon with workshops, mentoring sessions, and final presentations."
  },
  {
    question: "Are there prizes ?",
    answer: "Yes, winners receive exciting prizes and recognition from IEEE MACE SB and our sponsors."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#010005] py-24 lg:py-40 overflow-hidden font-sans min-h-[600px]"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] bg-[#0ea5e9]/5 blur-[120px] rounded-[100%]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-16 lg:mb-24 text-center px-4"
        >
          <div className="flex items-center gap-4 text-[#0ea5e9] font-medium tracking-[0.2em] text-xs uppercase">
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
            <span>Got Questions?</span>
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-blanka uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-2xl mt-2">
            Everything you need to know about the event.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group relative"
              >
                {/* FAQ Item Card */}
                <div
                  onClick={() => toggleFAQ(index)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isActive ? "bg-[#01020a]" : "bg-[#01020a]/60 hover:bg-[#01020a]"
                  }`}
                >
                  {/* Background with sharp chamfered edges */}
                  <div
                    className={`absolute inset-0 border backdrop-blur-xl transition-all duration-500 ease-out z-0 ${
                      isActive ? "border-[#0ea5e9]/50" : "border-slate-800 group-hover:border-[#0ea5e9]/30"
                    }`}
                    style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
                  />

                  {/* Cyberpunk corner accents sitting outside the chamfer */}
                  <div className={`absolute top-0 left-0 w-3 h-3 border-t-[2px] border-l-[2px] transition-all duration-500 z-10 ${isActive ? "border-[#0ea5e9]" : "border-transparent group-hover:border-[#0ea5e9]"}`} />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-[2px] border-r-[2px] transition-all duration-500 z-10 ${isActive ? "border-[#0ea5e9]" : "border-transparent group-hover:border-[#0ea5e9]"}`} />

                  <div className="relative z-20 w-full p-6 lg:px-8">
                    <div className="flex justify-between items-center gap-4">
                      <h3 className={`text-lg md:text-xl font-medium transition-colors duration-300 ${isActive ? "text-[#0ea5e9]" : "text-white"}`}>
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
                        <span className={`absolute w-full h-[2px] bg-slate-400 transition-all duration-300 ${isActive ? "bg-[#0ea5e9]" : "group-hover:bg-[#0ea5e9]"}`} />
                        <span className={`absolute h-full w-[2px] bg-slate-400 transition-all duration-300 ${isActive ? "rotate-90 scale-0 bg-[#0ea5e9]" : "group-hover:bg-[#0ea5e9]"}`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-slate-400 text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
