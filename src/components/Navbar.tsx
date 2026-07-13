"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Tracks", href: "#tracks" },
  { name: "About", href: "#about" },
  { name: "Timeline", href: "#timeline" },
  { name: "Rules", href: "#rules" },
  { name: "Past Highlights", href: "#past-highlights" },
  { name: "Sponsors", href: "#sponsors" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
    >
      {/* Desktop Navigation */}
      <nav
        className="pointer-events-auto hidden md:flex items-center justify-center gap-8 lg:gap-12 px-10 py-4 rounded-full transition-all duration-300"
        style={{
          background: "rgba(10, 15, 30, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0, 0, 0, 0.35), 0 0 30px rgba(37, 99, 235, 0.18)"
            : "0 8px 40px rgba(0, 0, 0, 0.2)",
          maxWidth: "850px",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative text-white font-medium font-blanka tracking-wide text-sm transition-all duration-300 hover:text-[#38BDF8]"
          >
            {link.name}
            <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-[#38BDF8] rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0 shadow-[0_0_8px_rgba(56,189,248,0.8)] opacity-0 group-hover:opacity-100" />
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <div className="pointer-events-auto md:hidden absolute top-0 right-4 flex justify-end w-full max-w-[100vw]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full flex flex-col justify-center items-center gap-[5px] w-12 h-12 relative z-50"
          style={{
            background: "rgba(10, 15, 30, 0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.35), 0 0 30px rgba(37, 99, 235, 0.18)",
          }}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            className="w-5 h-[2px] bg-white block rounded-full transition-all duration-300"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="w-5 h-[2px] bg-white block rounded-full transition-all duration-300"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
            className="w-5 h-[2px] bg-white block rounded-full transition-all duration-300"
          />
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-4 left-4 md:hidden rounded-2xl overflow-hidden pointer-events-auto z-40"
            style={{
              background: "rgba(10, 15, 30, 0.6)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(37, 99, 235, 0.15)",
            }}
          >
            <div className="flex flex-col py-6 px-6 gap-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-white font-medium font-blanka text-lg tracking-wider hover:text-[#38BDF8] transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
