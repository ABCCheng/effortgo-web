"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const storageKey = "EFFORTGO_THEME_MODE";

const ThemeContext = createContext<ThemeContextValue>({
  themeMode: "light",
  setThemeMode: () => {},
  isDark: false,
});

function getSystemIsDark() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return getSystemIsDark() ? "dark" : "light";
  }

  const value = window.localStorage.getItem(storageKey);
  return value === "light" || value === "dark"
    ? value
    : getSystemIsDark() ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getStoredThemeMode);
  const isDark = themeMode === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    window.localStorage.setItem(storageKey, mode);
  }, []);

  const value = useMemo(
    () => ({ themeMode, setThemeMode, isDark }),
    [isDark, setThemeMode, themeMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
