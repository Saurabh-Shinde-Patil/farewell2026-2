import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

/**
 * ThemeProvider for React SPA to handle class toggling on the HTML root element.
 * Preserves preference in local storage.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark"); // Default to dark for premium neon feel

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // First-time visitors always get dark mode; saved preference is respected on return
    const initialTheme = savedTheme ?? "dark";
    
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
