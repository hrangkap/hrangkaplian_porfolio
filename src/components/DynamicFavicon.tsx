"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const accentColors: Record<string, string> = {
  blue: "#2563eb",
  violet: "#7c3aed",
  emerald: "#059669",
  rose: "#e11d48",
  amber: "#d97706",
  cyan: "#0891b2",
};

const bgColors: Record<string, string> = {
  dark: "#050505",
  dim: "#1a1a2e",
  light: "#fafafa",
};

const textOnBg: Record<string, string> = {
  dark: "#ffffff",
  dim: "#ffffff",
  light: "#000000",
};

export default function DynamicFavicon() {
  const { theme } = useTheme();

  useEffect(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const accent = accentColors[theme.accent] || "#2563eb";
    const bg = bgColors[theme.mode] || "#050505";

    // Background
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Accent ring
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();

    // Text "L"
    ctx.fillStyle = accent;
    ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("L", size / 2, size / 2 + 1);

    // Apply favicon — remove all existing, then add fresh
    const url = canvas.toDataURL("image/png");
    document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']").forEach((el) => el.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = url;
    document.head.appendChild(link);

    // Also set shortcut icon for older browsers
    const shortcut = document.createElement("link");
    shortcut.rel = "shortcut icon";
    shortcut.type = "image/png";
    shortcut.href = url;
    document.head.appendChild(shortcut);
  }, [theme]);

  return null;
}
