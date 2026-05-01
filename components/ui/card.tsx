"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      className={cn(
        "rounded-xl border backdrop-blur-sm p-6 transition-colors duration-200",
        theme === 'dark'
          ? 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
          : 'border-zinc-200 bg-zinc-50/80 hover:border-zinc-300 hover:bg-white',
        className
      )}
      whileHover={hover ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  const { theme } = useTheme();
  
  return (
    <h3 className={cn(
      "text-lg font-semibold",
      theme === 'dark' ? 'text-white' : 'text-black',
      className
    )}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  const { theme } = useTheme();
  
  return (
    <p className={cn(
      "text-sm mt-1",
      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600',
      className
    )}>{children}</p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700',
      className
    )}>{children}</div>
  );
}
