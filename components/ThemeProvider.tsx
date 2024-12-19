"use client";
import React, { useEffect } from "react";
import useThemeStore from "@/store/themeStore"; // Adjust the import path as needed

interface StoredTheme {
  theme: "light" | "dark";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as StoredTheme | null;
    if (storedTheme) {
      setTheme(storedTheme.theme);
    }
  }, [setTheme]);

  // Update the body class whenever the theme changes
  useEffect(() => {
    if (theme) {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
};
