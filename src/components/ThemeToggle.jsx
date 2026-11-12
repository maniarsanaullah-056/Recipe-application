import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme, ACCENTS } from "../context/ThemeContext";
import "../styles/ThemeToggle.css";

function ThemeToggle() {
  const { mode, toggleMode, accent, setAccent } = useTheme();

  return (
    <div className="theme-toggle">
      {/* Accent color dots */}
      <div className="theme-toggle__dots">
        {ACCENTS.map((a) => (
          <button
            key={a.id}
            title={a.label}
            aria-label={`${a.label} theme`}
            className={`theme-toggle__dot ${accent === a.id ? "is-active" : ""}`}
            style={{ background: a.color }}
            onClick={() => setAccent(a.id)}
          />
        ))}
      </div>

      {/* Light / Dark button */}
      <button
        className="theme-toggle__mode"
        onClick={toggleMode}
        aria-label="Toggle light or dark mode"
      >
        {mode === "light" ? <FiMoon /> : <FiSun />}
      </button>
    </div>
  );
}

export default ThemeToggle;