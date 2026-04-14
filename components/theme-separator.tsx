"use client";

import { useTheme } from "@/contexts/theme-context";

export function ThemeSeparator() {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full border-t ${
      theme === 'dark' ? 'border-white/20' : 'border-black/20'
    }`} />
  );
}
