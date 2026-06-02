import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Images } from "lucide-react";
import imagesList from "../data/images.json";

/**
 * Automatic Image Slider Component.
 * - Displays a slideshow looping through all local images.
 * - Automatic transitions (3s interval) with manual play/pause toggle.
 * - Blurred duplicate background replication of the active image.
 * - Statically loads images list dynamically from images.json.
 */
export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Pre-prepend public folder path
  const images = imagesList.map((img) => `/images/${img}`);

  useEffect(() => {
    if (!isPlaying || images.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[currentIndex];

  return (
    <section id="slideshow" className="relative pt-8 pb-20 bg-background overflow-hidden border-b border-card-border/50">
      {/* Visual Ambient Glows */}
      <div className="absolute top-10 left-0 w-[30vw] h-[30vw] bg-neon-pink/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30vw] h-[30vw] bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-bg border border-card-border shadow-sm text-xs font-semibold text-neon-pink uppercase tracking-wider mb-3">
            <Images className="w-3.5 h-3.5" />
            <span>Memories Slideshow</span>
          </div>
          <h2 className="neon-heading neon-heading--pink font-sans font-extrabold text-3xl tracking-tight">
            Our Automated Memory Reel
          </h2>
          <p className="text-xs text-foreground/50 mt-1.5 uppercase tracking-wider font-bold">
            Looping {images.length} Captured Moments
          </p>
        </div>

        {/* Slider Container Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-card-border bg-neutral-950 flex items-center justify-center group">
          
          {/* Blurred duplication background */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-105 transition-all duration-700"
            style={{ backgroundImage: `url(${activeImage})` }}
          />

          {/* Solid black screen shadow */}
          <div className="absolute inset-0 bg-black/35 z-0" />

          {/* Active Image with slide transitions */}
          <div className="relative w-full h-full flex items-center justify-center z-10 p-4 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={activeImage}
                alt={`Batch Memory ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg select-none"
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Nav Controls Overlay */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-20 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 active:scale-95 transition-all cursor-pointer pointer-events-auto"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 active:scale-95 transition-all cursor-pointer pointer-events-auto"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Top Info Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white pointer-events-none">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              Photo {currentIndex + 1} of {images.length}
            </span>
            
            {/* Play/Pause toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 text-white backdrop-blur-sm cursor-pointer pointer-events-auto active:scale-90 transition-all"
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
