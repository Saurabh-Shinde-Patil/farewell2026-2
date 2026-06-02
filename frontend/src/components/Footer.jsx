import { motion } from "framer-motion";
import { GraduationCap, ArrowUp } from "lucide-react";
import configData from "@/data/config.json";

/**
 * Footer Section.
 */
export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-neutral-950 text-white/80 border-t border-white/5 py-16 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-0 left-10 w-[20vw] h-[20vw] bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center relative z-10 text-center">
        
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="w-8 h-8 text-neon-cyan" />
          <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Batch 2022–2026
          </span>
        </div>

        <div className="max-w-2xl mb-12">
          <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-wide leading-relaxed italic text-shadow-glow">
            "{configData.goodbyeQuote}"
          </h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink mx-auto mt-6" />
        </div>

        <div className="flex items-center gap-6 text-sm mb-12 font-medium text-white/60">
          <a href="#home" className="hover:text-neon-cyan transition-colors">Home</a>
          <span className="text-white/10">|</span>
          <a href="#slideshow" className="hover:text-neon-cyan transition-colors">Slideshow</a>
          <span className="text-white/10">|</span>
          <a href="#video" className="hover:text-neon-cyan transition-colors">Video</a>
        </div>

        <div className="w-full border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-white/40">
              Designed &amp; Developed by
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href="https://www.linkedin.com/in/saurabh-shinde-110437280"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neon-cyan hover:text-white transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="underline underline-offset-2 group-hover:no-underline">Saurabh Shinde</span>
              </a>
              <span className="text-white/20">&amp;</span>
              <a
                href="https://www.linkedin.com/in/manthankharote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neon-cyan hover:text-white transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="underline underline-offset-2 group-hover:no-underline">Manthan Kharote</span>
              </a>
            </div>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
