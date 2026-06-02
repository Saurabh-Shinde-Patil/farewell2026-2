import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryService } from "@/services/galleryService";
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

/**
 * Pinterest-style Photo Gallery.
 * Supports filters, slide lightbox, drag panning, zoom modes.
 */
export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryService.getGalleryImages();
        setImages(data);
        setFilteredImages(data);

        const uniqueCats = ["All", ...new Set(data.map((img) => img.category))];
        setCategories(uniqueCats);
      } catch (e) {
        console.error("Failed to load gallery images", e);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.category === category));
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsZoomed(false);
    setDragOffset({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
    setDragOffset({ x: 0, y: 0 });
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction) => {
    setIsZoomed(false);
    setDragOffset({ x: 0, y: 0 });
    if (direction === "prev") {
      setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    } else {
      setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages]);

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section id="gallery" className="relative py-28 bg-neutral-50/30 dark:bg-neutral-950/20 border-t border-b border-card-border/50">
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-50">
              <div className="text-sm font-semibold tracking-wider bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
                {lightboxIndex + 1} / {filteredImages.length}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsZoomed(!isZoomed);
                    setDragOffset({ x: 0, y: 0 });
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/5"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/5"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 border border-white/5"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center overflow-hidden">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{
                  scale: isZoomed ? 1.5 : 1,
                  x: dragOffset.x,
                  y: dragOffset.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                drag={isZoomed}
                dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
                onDrag={(e, info) => setDragOffset({ x: info.offset.x, y: info.offset.y })}
                className={`relative max-w-full max-h-[75vh] cursor-pointer ${
                  isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                }`}
                onClick={() => {
                  if (!isZoomed) {
                    setIsZoomed(true);
                  } else {
                    closeLightbox();
                  }
                }}
              >
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg select-none"
                  draggable={false}
                />
              </motion.div>
            </div>

            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 border border-white/5"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-center max-w-2xl mx-auto z-40 text-white bg-black/60 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neon-pink px-2 py-0.5 bg-neon-pink/10 rounded-md border border-neon-pink/20">
                {activeImage.category}
              </span>
              <h4 className="font-sans font-bold text-lg mt-2 text-glow-cyan">{activeImage.title}</h4>
              <p className="text-xs text-white/70 mt-1.5 font-light leading-relaxed">
                {activeImage.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-16">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-bg border border-card-border shadow-sm text-xs font-semibold text-neon-pink uppercase tracking-wider mb-3"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Snapshot Gallery</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="neon-heading neon-heading--multi font-sans font-extrabold text-3xl sm:text-4xl tracking-tight"
            >
              Moments We Captured
            </motion.h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-foreground text-background border-foreground shadow-md scale-105"
                    : "bg-card-bg border-card-border text-foreground/75 hover:text-foreground hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-card-border" />
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-neon-pink animate-spin" />
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
          >
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-card-border hover:border-neon-pink/30 hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-white transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  
                  <span className="text-[9px] uppercase font-bold tracking-widest text-neon-pink px-2 py-0.5 bg-neon-pink/20 rounded border border-neon-pink/20 self-start mb-2">
                    {img.category}
                  </span>
                  
                  <h3 className="font-sans font-bold text-white text-base">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
