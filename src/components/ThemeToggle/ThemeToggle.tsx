import { useEffect, useState } from "react";
import "./ThemeToggle.css";

type Theme = "light" | "dark";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // apply theme to <html> + localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme === "light" ? "light" : "";
    localStorage.setItem("theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={`toggle-container ${theme}`}>
      <button
        onClick={toggle}
        aria-pressed={theme === "light"}
        aria-label="Toggle color theme"
        className="theme-toggle"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default ThemeToggle;
