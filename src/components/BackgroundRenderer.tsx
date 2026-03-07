"use client";

import { useTheme } from "./ThemeProvider";
import NeuralBackground from "./NeuralBackground";
import DigitalBackground from "./DigitalBackground";

export default function BackgroundRenderer() {
  const { theme } = useTheme();

  if (theme.background === "neural") return <NeuralBackground />;
  if (theme.background === "digital") return <DigitalBackground />;

  return null;
}
