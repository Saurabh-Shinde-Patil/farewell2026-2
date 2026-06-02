import { useState, useEffect } from "react";
import configData from "../data/config.json";

/**
 * Mosaic Banner Section.
 * Renders the mosaic image cropped and styled to look like normal text/graphic,
 * without the interactive viewer frame, margins, or background controls.
 */
export default function Mosaic() {
  const [imageSrc, setImageSrc] = useState(configData.mosaicImagePath);
  const fallbackCollage = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920";

  useEffect(() => {
    const img = new Image();
    img.src = configData.mosaicImagePath;
    img.onerror = () => {
      setImageSrc(fallbackCollage);
    };
  }, []);

  return (
    <section id="home" className="w-full bg-background pt-24 pb-4 overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-6 flex justify-center items-center">
        <img
          src={imageSrc}
          alt="Batch Mosaic Logo"
          className="max-h-[140px] sm:max-h-[200px] md:max-h-[260px] w-auto object-contain select-none pointer-events-none filter drop-shadow-[0_0_8px_rgba(0,240,255,0.25)] transition-all duration-300"
          draggable={false}
        />
      </div>
    </section>
  );
}
