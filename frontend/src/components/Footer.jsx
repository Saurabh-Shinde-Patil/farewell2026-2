import { motion } from "framer-motion";
import { GraduationCap, Heart, ArrowUp } from "lucide-react";
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
          <div>
            Made with <Heart className="inline w-3.5 h-3.5 mx-1 text-neon-pink fill-neon-pink animate-pulse" /> by Batch 2022–2026
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
