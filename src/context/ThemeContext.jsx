import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// Available accent themes (UI mein inhi se color picker banega)
export const ACCENTS = [
  { id: "sunset", label: "Sunset", color: "#f97362" },
  { id: "ocean", label: "Ocean", color: "#3b82f6" },
  { id: "forest", label: "Forest", color: "#10b981" },
  { id: "royal", label: "Royal", color: "#8b5cf6" },
];

export function ThemeProvider({ children }) {
  // localStorage se pichli choice uthao, warna default
  const [mode, setMode] = useState(
    () => localStorage.getItem("fk-mode") || "light"
  );
  const [accent, setAccent] = useState(
    () => localStorage.getItem("fk-accent") || "sunset"
  );

  // Mode change hone par <html> pe attribute lagao + save karo
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("fk-mode", mode);
  }, [mode]);

  // Accent change hone par bhi yehi
  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem("fk-accent", accent);
  }, [accent]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, accent, setAccent, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook: kisi bhi component mein useTheme() likho aur kaam ho gaya
export const useTheme = () => useContext(ThemeContext);