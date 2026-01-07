import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStrore";

const ThemeToggle = () => {
  const { toggleTheme, theme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border
     bg-secondary cursor-pointer
      hover:scale-105 transition"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
