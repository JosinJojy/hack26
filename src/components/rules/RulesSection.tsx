"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const rules = [
  {
    title: "1. Eligibility",
    content: "• The hackathon is open to students currently enrolled in recognized educational institutions.\n• Participants must complete the registration process through Devfolio before the specified deadline.\n• Every participant must carry a valid student ID for verification during the event.\n• Each participant may be a member of only one team."
  },
  {
    title: "2. Team Formation",
    content: "• Teams must consist of 1–4 members.\n• Cross-disciplinary teams are encouraged to promote diverse perspectives and innovative solutions.\n• Once registrations are closed, changes to team composition will only be permitted under exceptional circumstances and with approval from the organizing committee."
  },
  {
    title: "3. Project Eligibility",
    content: "Projects presented during >.hack();_ '26 must be conceived and developed only after the official commencement of the hackathon. Participants are strictly prohibited from bringing pre-built projects, previously developed solutions, or projects that have been showcased in other competitions.\n\nParticipants are encouraged to research their chosen track, learn relevant technologies, install development tools, and prepare their development environment before the event. However, no implementation, coding, hardware assembly, model training, or project development intended for the hackathon may be carried out in advance.\n\nAny team found presenting substantially pre-developed work or misrepresenting prior work as hackathon work may be disqualified at the discretion of the organizing committee."
  },
  {
    title: "4. Code of Conduct",
    content: "Participants are expected to maintain a respectful, inclusive, and professional environment throughout the event.\n• Treat fellow participants, mentors, judges, volunteers, sponsors, and organizers with respect.\n• Refrain from harassment, discrimination, intimidation, or disruptive behaviour.\n• Follow all venue policies and safety guidelines.\n• Foster collaboration and healthy competition.\n\nViolation of the Code of Conduct may result in immediate disqualification and removal from the event."
  },
  {
    title: "5. Use of AI Tools",
    content: "The use of AI-assisted tools such as ChatGPT, GitHub Copilot, Gemini, Claude, Cursor, and similar technologies is permitted for ideation, coding assistance, debugging, documentation, and design support.\n\nHowever:\n• Teams must fully understand every aspect of their solution.\n• Judges may question participants regarding any part of the implementation.\n• Teams remain solely responsible for the originality, correctness, and ethical use of AI-generated content."
  },
  {
    title: "6. Intellectual Property",
    content: "Participants retain ownership of the intellectual property developed during the hackathon.\nBy participating, teams grant the organizers permission to use project titles, abstracts, screenshots, photographs, videos, and demonstrations for promotional, educational, and documentation purposes."
  },
  {
    title: "7. Abstract Submission Requirements",
    content: "Every team is required to submit a Project Abstract through Devfolio as part of the registration process.\n\nThe abstract is intended solely for the screening and shortlisting of teams. It should demonstrate the team's understanding of their selected track, their approach to solving meaningful real-world challenges, and their ability to think innovatively.\n\nThe submitted abstract is not the project that will be developed during the hackathon. Participants should not begin building or developing a project based on the submitted abstract. All hackathon projects must be developed only after the official commencement of the event."
  },
  {
    title: "8. Abstract Evaluation & Team Selection",
    content: "The submitted abstract will serve as the primary basis for the screening and shortlisting of teams for >.hack();_ '26.\n\nAbstracts will be evaluated on:\n• Relevance to the selected track\n• Understanding of the problem domain\n• Innovation and originality\n• Feasibility of the proposed approach\n• Potential impact\n\nThe organizing committee reserves the right to shortlist teams based on the overall quality of their submissions. The decision regarding shortlisting shall be final and binding."
  },
  {
    title: "9. Fair Play & Academic Integrity",
    content: "Participants are expected to uphold the highest standards of academic and professional integrity.\n\nThe following actions are strictly prohibited:\n• Plagiarism.\n• Copying existing projects without substantial original contribution.\n• Misrepresentation of work.\n• Sharing confidential project code with competing teams.\n• Tampering with another team's work.\n• Any attempt to manipulate the judging process.\n\nViolations may result in immediate disqualification."
  },
  {
    title: "10. Hardware Projects",
    content: "Teams working on hardware-based solutions are responsible for bringing and maintaining their own equipment unless otherwise specified by the organizers.\n\nProjects involving hazardous materials or unsafe practices may require prior approval from the organizing committee."
  },
  {
    title: "11. Organizer Rights",
    content: "The organizing committee reserves the right to:\n• Modify the schedule due to unforeseen circumstances.\n• Clarify or amend these rules whenever necessary.\n• Merge, restructure, or revise event activities if required.\n• Disqualify teams violating hackathon policies.\n• Resolve disputes, with all decisions being final."
  },
  {
    title: "12. Acceptance of Rules",
    content: "By registering for >.hack();_ '26, participants acknowledge that they have read, understood, and agreed to abide by these Rules & Regulations and all decisions made by the organizing committee."
  },
  {
    title: "13. Final Decisions & Appeals",
    content: "All decisions regarding eligibility, shortlisting, rule interpretation, judging, disqualification, awards, and any other matters related to >.hack();_ '26 shall be made by the Organizing Committee and shall be final and binding.\n\nAny appeal, concern, or request for clarification must be submitted through the Organizing Committee within the timeframe communicated by the organizers. The Organizing Committee will review the matter at its discretion, and its decision after review shall be final and binding."
  }
];

export default function RulesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="rules"
      ref={sectionRef}
      className="relative w-full bg-[#010005] py-24 lg:py-32 overflow-hidden font-sans min-h-[800px]"
    >
      {/* Background Decor */}
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
          className="flex flex-col items-center gap-4 mb-16 text-center"
        >
          <div className="flex items-center gap-4 text-[#0ea5e9] font-medium tracking-[0.2em] text-xs uppercase">
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
            <span>Guidelines & Policies</span>
            <span className="w-12 h-[1px] bg-[#0ea5e9]/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-blanka uppercase">
            Rules & Regulations
          </h2>
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-2xl mt-2">
            The following rules are established to ensure a fair, transparent, inclusive, and engaging experience for all participants.
          </p>
        </motion.div>

        {/* Layout: Vertical Tabs (Desktop) / Accordion (Mobile) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Tab Triggers */}
          <div className="w-full lg:w-[55%] flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-3 relative">
            
            {rules.map((rule, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className="relative z-10 w-full">
                  {/* Mobile Accordion Content is handled below, this is just the trigger */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    className={`relative w-full lg:h-full text-left transition-all duration-300 group ${
                      isActive ? "lg:scale-[1.02] translate-x-2 lg:translate-x-0" : ""
                    }`}
                  >
                    {/* Background with sharp chamfered edges */}
                    <div
                      className={`absolute inset-0 border backdrop-blur-xl transition-all duration-500 ease-out z-0 ${
                        isActive 
                          ? "bg-[#0ea5e9]/10 border-[#0ea5e9]/50 lg:shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
                          : "bg-[#01020a]/40 border-slate-800/50 hover:bg-[#01020a] hover:border-slate-700/50 lg:hover:border-[#0ea5e9]/30"
                      }`}
                      style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                    />
                    
                    {/* Cyberpunk corner accents */}
                    <div className={`absolute top-0 left-0 w-2 h-2 border-t-[2px] border-l-[2px] transition-all duration-500 z-10 ${isActive ? "border-[#0ea5e9]" : "border-transparent group-hover:border-[#0ea5e9]"}`} />
                    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-[2px] border-r-[2px] transition-all duration-500 z-10 ${isActive ? "border-[#0ea5e9]" : "border-transparent group-hover:border-[#0ea5e9]"}`} />

                    {/* Button Content */}
                    <div className="relative z-20 w-full py-4 px-6 flex items-center justify-between">
                      <span className={`text-sm lg:text-base font-semibold transition-colors duration-300 lg:line-clamp-2 pr-2 ${
                        isActive ? "text-[#0ea5e9]" : "text-slate-300 group-hover:text-white"
                      }`}>
                        {rule.title}
                      </span>
                      
                      {/* Mobile Arrow */}
                      <span className="lg:hidden text-[#0ea5e9] flex-shrink-0">
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </motion.button>
                  
                  {/* Mobile Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="p-5 mt-2 bg-[#01020a]/60 border border-slate-800 rounded-lg">
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                            {rule.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Content Display */}
          <div className="hidden lg:block w-full lg:w-[45%] sticky top-32">
            <AnimatePresence mode="wait">
              {activeIndex !== -1 && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative p-8 md:p-12 bg-[#01020a]/60 backdrop-blur-xl border border-slate-800"
                  style={{ clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" }}
                >
                  {/* Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] border-[#0ea5e9]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] border-[#0ea5e9]" />
                  
                  <div className="absolute top-8 right-8 text-6xl font-black text-[#0ea5e9]/5 pointer-events-none font-blanka">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-6 pr-16">
                    {rules[activeIndex].title.split('. ')[1] || rules[activeIndex].title}
                  </h3>
                  
                  <div className="w-12 h-1 bg-[#0ea5e9] mb-8" />

                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 text-base lg:text-lg leading-relaxed whitespace-pre-line">
                      {rules[activeIndex].content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
