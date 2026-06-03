import { motion } from "framer-motion";
import { Film } from "lucide-react";
import configData from "@/data/config.json";

/**
 * Responsive Video Section.
 * Pulls the iframe URL, Title, and Description from config.json.
 */
export default function VideoSection() {
  const videos = configData.videos || [
    {
      url: configData.youtubeUrl,
      title: configData.youtubeTitle,
      description: configData.youtubeDescription,
    },
  ];

  return (
    <section
      id="video"
      className="relative py-28 bg-neutral-50/30 dark:bg-neutral-950/20 border-t border-b border-card-border/50 overflow-hidden"
    >
      <div className="absolute top-1/2 left-10 w-[20vw] h-[20vw] bg-neon-purple/5 dark:bg-neon-purple/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[20vw] h-[20vw] bg-neon-cyan/5 dark:bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-bg border border-card-border shadow-sm text-xs font-semibold text-neon-purple uppercase tracking-wider mb-3"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Memory Reel</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neon-heading neon-heading--multi font-sans font-extrabold text-3xl sm:text-4xl tracking-tight"
          >
            Farewell Documentary
          </motion.h2>
        </div>

        {/* Video Cards Grid/List */}
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="glass neon-border-purple rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden group w-full"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Player container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-card-border/40 shadow-inner">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Meta Info */}
              <div className="mt-6 md:mt-8 px-2">
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-foreground mb-3 text-glow-purple">
                  {video.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-light">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
