"use client";

import { useState } from "react";
import {
  useTheme,
  type AccentColor,
  type BackgroundStyle,
  type FontStyle,
  type Mode,
} from "./ThemeProvider";

const accents: { value: AccentColor; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: "#2563eb" },
  { value: "violet", label: "Violet", color: "#7c3aed" },
  { value: "emerald", label: "Emerald", color: "#059669" },
  { value: "rose", label: "Rose", color: "#e11d48" },
  { value: "amber", label: "Amber", color: "#d97706" },
  { value: "cyan", label: "Cyan", color: "#0891b2" },
];

const backgrounds: { value: BackgroundStyle; label: string }[] = [
  { value: "neural", label: "Neural" },
  { value: "digital", label: "Digital" },
  { value: "minimal", label: "Clean" },
  { value: "gradient", label: "Gradient" },
  { value: "dots", label: "Dots" },
  { value: "grid", label: "Grid" },
];

const fonts: { value: FontStyle; label: string; preview: string }[] = [
  { value: "sans", label: "Sans", preview: "Aa" },
  { value: "mono", label: "Mono", preview: "Aa" },
  { value: "serif", label: "Serif", preview: "Aa" },
];

const modes: { value: Mode; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dim", label: "Dim", icon: "🌆" },
  { value: "dark", label: "Dark", icon: "🌙" },
];

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const { theme, setAccent, setBackground, setFont, setMode } = useTheme();

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface shadow-lg transition-all hover:scale-110"
        aria-label="Customize theme"
        style={{ boxShadow: `0 0 20px var(--accent-glow)` }}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-20 right-6 z-50 w-72 rounded-2xl border border-border bg-surface p-5 shadow-2xl transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Customize
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="text-muted hover:text-foreground"
            aria-label="Close customizer"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mode */}
        <div className="mb-5">
          <label className="mb-2 block text-xs font-medium text-muted">Mode</label>
          <div className="flex gap-2">
            {modes.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                  theme.mode === m.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                <span>{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="mb-5">
          <label className="mb-2 block text-xs font-medium text-muted">
            Accent Color
          </label>
          <div className="flex gap-2">
            {accents.map((a) => (
              <button
                key={a.value}
                onClick={() => setAccent(a.value)}
                className="h-8 w-8 rounded-full transition-all hover:scale-110"
                style={{
                  backgroundColor: a.color,
                  outlineColor: theme.accent === a.value ? a.color : undefined,
                  outline: theme.accent === a.value ? `2px solid ${a.color}` : undefined,
                  outlineOffset: "3px",
                }}
                aria-label={a.label}
                title={a.label}
              />
            ))}
          </div>
        </div>

        {/* Background */}
        <div className="mb-5">
          <label className="mb-2 block text-xs font-medium text-muted">
            Background
          </label>
          <div className="grid grid-cols-2 gap-2">
            {backgrounds.map((bg) => (
              <button
                key={bg.value}
                onClick={() => setBackground(bg.value)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                  theme.background === bg.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font */}
        <div>
          <label className="mb-2 block text-xs font-medium text-muted">
            Font Style
          </label>
          <div className="flex gap-2">
            {fonts.map((f) => (
              <button
                key={f.value}
                onClick={() => setFont(f.value)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-3 py-2 transition-all ${
                  theme.font === f.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                <span
                  className="text-lg font-bold"
                  style={{
                    fontFamily:
                      f.value === "mono"
                        ? "monospace"
                        : f.value === "serif"
                        ? "Georgia, serif"
                        : "system-ui, sans-serif",
                  }}
                >
                  {f.preview}
                </span>
                <span className="text-[10px] font-medium">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
