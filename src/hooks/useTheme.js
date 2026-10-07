import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("taskflow-theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("taskflow-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;