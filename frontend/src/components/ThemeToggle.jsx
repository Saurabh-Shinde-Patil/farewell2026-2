import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Responsive theme switcher button rendering a Sun or Moon icon.
 * Includes micro-animations for rotation and hover scale.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative p-2 rounded-full border border-card-border bg-card-bg text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none transition-all duration-300 shadow-md cursor-pointer select-none"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0, scale: [0.8, 1.1, 1] }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="w-5 h-5 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 fill-indigo-100" />
        )}
      </motion.div>
    </button>
  );
}
