"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const Instagram = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Twitter = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>;
const Linkedin = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const Globe = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const MessageCircle = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>;

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#010005] font-sans pt-32 pb-8 min-h-[600px] flex flex-col justify-between">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Animated Background Glow */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#0ea5e9]/5 blur-[120px] rounded-[100%]" 
        />
      </div>

      {/* Advanced Cyberpunk Separator */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center z-30">
        {/* Main lines */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="absolute top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent opacity-70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center flex-1">
        
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 mb-20 text-center w-full">
          <div className="flex items-center gap-4 text-[#0ea5e9] font-medium tracking-[0.2em] text-xs uppercase w-full justify-center">
            <span className="w-12 md:w-32 h-[1px] bg-[#0ea5e9]/40" />
            <span>Any Doubts</span>
            <span className="w-12 md:w-32 h-[1px] bg-[#0ea5e9]/40" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-blanka">
            CONTACT US
          </h2>
        </div>

        {/* Dynamic Coordinators Grid */}
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center mb-20">
          {[
            { name: "Sooraj N S", role: "Team Lead", phone: "+91 83048 11633", id: "01" },
            { name: "Kalyani B", role: "Team Lead", phone: "+91 70255 92234", id: "02"}
          ].map((person, i) => (
            <motion.div 
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex-1 max-w-lg relative p-8 transition-all duration-700 ease-out group overflow-hidden"
            >
              {/* Scanline Background */}
              <div 
                className="absolute inset-0 bg-[#01020a]/90 border border-slate-800 backdrop-blur-2xl transition-all duration-700 ease-out z-0 group-hover:border-[#0ea5e9]/60 group-hover:bg-[#0ea5e9]/[0.02]"
                style={{ clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50" />
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] border-[#0ea5e9]/30 group-hover:border-[#0ea5e9] group-hover:shadow-[-5px_-5px_15px_rgba(14,165,233,0.3)] transition-all duration-500 z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] border-[#0ea5e9]/30 group-hover:border-[#0ea5e9] group-hover:shadow-[5px_5px_15px_rgba(14,165,233,0.3)] transition-all duration-500 z-10" />

              <div className="relative z-20 flex flex-col h-full justify-between gap-6">
                {/* Top Row: ID & Status */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col">
                    <span className="text-[#0ea5e9] font-mono text-xs tracking-widest uppercase">{person.role}</span>
                    <h3 className="text-white font-bold font-mono text-2xl lg:text-3xl tracking-wide uppercase mt-1">{person.name}</h3>
                  </div>
                </div>

                {/* Bottom Row: Contact & Hex Decals */}
                <div className="flex flex-col gap-2">
                  <div className="h-[2px] bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-[#0ea5e9] group-hover:to-transparent w-full transition-all duration-700 ease-out" />
                  <div className="flex justify-between items-end">
                    <p className="text-slate-300 font-mono text-lg lg:text-xl group-hover:text-white transition-colors">{person.phone}</p>
                    <span className="text-slate-700 font-mono text-[10px]">AUTH_LVL_{person.id}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Network / Socials */}
        <div className="flex flex-col items-center gap-8 mb-12 z-20 w-full max-w-5xl">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-slate-800" />
            <span className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">Global Network</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-slate-800" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: Instagram, label: "INSTA", href: "#" },
              { icon: Twitter, label: "X_COM", href: "#" },
              { icon: Linkedin, label: "LINKEDIN", href: "#" },
              { icon: Globe, label: "WEB_NET", href: "#" },
              { icon: MessageCircle, label: "WHATSAPP", href: "#" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a 
                  key={social.label}
                  href={social.href}
                  className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#01020a]/80 border border-slate-800 backdrop-blur-sm hover:border-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-all duration-500 shadow-none hover:shadow-[0_0_15px_0_rgba(14,165,233,0.3)] hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {/* Subtle inner corner brackets on hover */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-transparent group-hover:border-[#0ea5e9] transition-all duration-300" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-transparent group-hover:border-[#0ea5e9] transition-all duration-300" />
                  
                  <Icon className="relative z-10 w-6 h-6 text-slate-400 group-hover:text-white transition-all duration-300" />
                </a>
              );
            })}
          </motion.div>

          {/* Location Data Readout (Cyber-Editorial Style) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 flex w-full max-w-2xl justify-between items-end border-b border-slate-800/80 pb-4 px-4 md:px-0"
          >
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-[#0ea5e9]" />
                <span className="text-[#0ea5e9] font-mono text-[10px] tracking-[0.2em] uppercase">Target Coordinates</span>
              </div>
              <h4 className="text-white font-sans text-lg md:text-xl font-medium tracking-tight">MA College Indoor Stadium</h4>
              <p className="text-slate-500 font-mono text-xs md:text-sm uppercase tracking-widest mt-1">Kothamangalam</p>
            </div>
            
            <div className="hidden md:flex flex-col items-end opacity-40">
               <span className="font-mono text-[10px] text-slate-400">10.0552° N</span>
               <span className="font-mono text-[10px] text-slate-400">76.6223° E</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Giant Footer Text Watermark */}
      <div className="relative w-full flex justify-center items-end mt-auto pointer-events-none z-10 pt-16">
        <h1 className="text-[15vw] leading-[0.75] font-bold text-[#0ea5e9]/[0.08] select-none font-blanka whitespace-nowrap tracking-tighter">
          {">.hack();_"}
        </h1>
      </div>
    </footer>
  );
}
