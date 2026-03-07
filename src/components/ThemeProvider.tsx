"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type AccentColor = "blue" | "violet" | "emerald" | "rose" | "amber" | "cyan";
export type BackgroundStyle = "minimal" | "gradient" | "dots" | "grid" | "neural" | "digital";
export type FontStyle = "sans" | "mono" | "serif";
export type Mode = "light" | "dim" | "dark";

interface ThemeConfig {
  accent: AccentColor;
  background: BackgroundStyle;
  font: FontStyle;
  mode: Mode;
}

interface ThemeContextType {
  theme: ThemeConfig;
  setAccent: (accent: AccentColor) => void;
  setBackground: (bg: BackgroundStyle) => void;
  setFont: (font: FontStyle) => void;
  setMode: (mode: Mode) => void;
}

const defaultTheme: ThemeConfig = {
  accent: "blue",
  background: "neural",
  font: "sans",
  mode: "dark",
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

const accentColors: Record<AccentColor, { primary: string; light: string; glow: string }> = {
  blue:    { primary: "#2563eb", light: "#3b82f6", glow: "rgba(37,99,235,0.15)" },
  violet:  { primary: "#7c3aed", light: "#8b5cf6", glow: "rgba(124,58,237,0.15)" },
  emerald: { primary: "#059669", light: "#10b981", glow: "rgba(5,150,105,0.15)" },
  rose:    { primary: "#e11d48", light: "#f43f5e", glow: "rgba(225,29,72,0.15)" },
  amber:   { primary: "#d97706", light: "#f59e0b", glow: "rgba(217,119,6,0.15)" },
  cyan:    { primary: "#0891b2", light: "#06b6d4", glow: "rgba(8,145,178,0.15)" },
};

const STORAGE_KEY = "portfolio-theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTheme({ ...defaultTheme, ...JSON.parse(saved) });
      } catch {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));

    const root = document.documentElement;
    const colors = accentColors[theme.accent];

    root.style.setProperty("--accent", colors.primary);
    root.style.setProperty("--accent-light", colors.light);
    root.style.setProperty("--accent-glow", colors.glow);

    // Mode
    if (theme.mode === "dark") {
      root.classList.add("dark");
      root.style.setProperty("--background", "#050505");
      root.style.setProperty("--foreground", "#ededed");
      root.style.setProperty("--muted", "#9ca3af");
      root.style.setProperty("--border", "#1e1e1e");
      root.style.setProperty("--surface", "#111111");
    } else if (theme.mode === "dim") {
      root.classList.add("dark");
      root.style.setProperty("--background", "#1a1a2e");
      root.style.setProperty("--foreground", "#e0e0e8");
      root.style.setProperty("--muted", "#8888a0");
      root.style.setProperty("--border", "#2a2a42");
      root.style.setProperty("--surface", "#22223a");
    } else {
      root.classList.remove("dark");
      root.style.setProperty("--background", "#fafafa");
      root.style.setProperty("--foreground", "#171717");
      root.style.setProperty("--muted", "#6b7280");
      root.style.setProperty("--border", "#e5e7eb");
      root.style.setProperty("--surface", "#ffffff");
    }

    // Font
    root.style.setProperty(
      "--active-font",
      theme.font === "mono"
        ? "var(--font-geist-mono), monospace"
        : theme.font === "serif"
        ? "Georgia, 'Times New Roman', serif"
        : "var(--font-geist-sans), system-ui, sans-serif"
    );

    // Background style class
    root.dataset.bg = theme.background;
  }, [theme, mounted]);

  const setAccent = (accent: AccentColor) => setTheme((t) => ({ ...t, accent }));
  const setBackground = (background: BackgroundStyle) => setTheme((t) => ({ ...t, background }));
  const setFont = (font: FontStyle) => setTheme((t) => ({ ...t, font }));
  const setMode = (mode: Mode) => setTheme((t) => ({ ...t, mode }));

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setAccent, setBackground, setFont, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
