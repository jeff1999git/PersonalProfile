"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  target,
  rel,
}: ButtonProps) {
  const { theme } = useTheme();
  
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg";

  const variants = {
    primary:
      theme === 'dark' 
        ? "bg-white text-black hover:bg-white/90 active:scale-95 shadow-sm"
        : "bg-black text-white hover:bg-black/90 active:scale-95 shadow-sm",
    secondary:
      theme === 'dark'
        ? "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95 border border-zinc-800"
        : "bg-zinc-100 text-black hover:bg-zinc-200 active:scale-95 border border-zinc-300",
    outline:
      theme === 'dark'
        ? "border border-zinc-800 text-white hover:bg-zinc-900 active:scale-95"
        : "border border-zinc-300 text-black hover:bg-zinc-100 active:scale-95",
    ghost:
      theme === 'dark'
        ? "text-white hover:bg-zinc-800/50 active:scale-95"
        : "text-black hover:bg-zinc-200/50 active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Component>
  );
}
