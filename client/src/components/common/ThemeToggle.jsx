import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStrore";

const ThemeToggle = () => {
  const { toggleTheme, theme } = useThemeStore();
  return (
    <button
      onClick={toggleTheme}
      className="md:p-2 p-1 rounded-full border cursor-pointer
      hover:scale-105 transition"
    >
      {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

export default ThemeToggle;
