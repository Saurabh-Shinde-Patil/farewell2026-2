import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Slideshow", href: "#slideshow" },
  { label: "Video", href: "#video" },
  { label: "Messages", href: "#messages" },
];

/**
 * Sticky header navigation bar with glassmorphism layout, scroll spy active tracking,
 * interactive mobile slide drawer, and Framer Motion animations.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.substring(1));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-card-border/80 shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-md"
        >
          <GraduationCap className="w-7 h-7 text-neon-cyan group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Farewell '26
          </span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-card-bg/40 border border-card-border/50 rounded-full px-5 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-1.5 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan ${
                  isActive
                    ? "text-neon-cyan font-semibold"
                    : "text-foreground/75 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800/80 rounded-full -z-10 border border-card-border/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#messages"
            onClick={(e) => handleLinkClick(e, "#messages")}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-neon-cyan hover:bg-neon-cyan/85 dark:text-black dark:bg-neon-cyan dark:hover:bg-neon-cyan/90 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan cursor-pointer"
          >
            Leave Message
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2 rounded-full border border-card-border bg-card-bg text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden w-full bg-background/95 backdrop-blur-lg border-b border-card-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`py-2 px-3 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? "text-neon-cyan bg-card-bg/60 border-l-2 border-neon-cyan"
                        : "text-foreground/80 hover:text-foreground hover:bg-card-bg/30"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 border-t border-card-border flex flex-col gap-3"
              >
                <a
                  href="#messages"
                  onClick={(e) => handleLinkClick(e, "#messages")}
                  className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider text-black bg-neon-cyan hover:bg-neon-cyan/90 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Leave Message
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
