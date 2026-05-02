import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  gradient?: boolean;
}

const sizeMap = {
  xl: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  lg: "text-3xl sm:text-4xl md:text-5xl",
  md: "text-2xl sm:text-3xl",
  sm: "text-xl sm:text-2xl",
};

export function Heading({
  children,
  className,
  as: Component = "h2",
  size = "lg",
  gradient = false,
}: HeadingProps) {
  const { theme } = useTheme();
  
  return (
    <Component
      className={cn(
        "font-bold tracking-tight",
        theme === 'dark' ? 'text-white' : 'text-black',
        sizeMap[size],
        gradient && theme === 'dark' && "bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent",
        gradient && theme === 'light' && "bg-gradient-to-r from-black via-black to-zinc-600 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "accent";
  size?: "sm" | "md" | "lg";
}

export function Text({
  children,
  className,
  variant = "default",
  size = "md",
}: TextProps) {
  const { theme } = useTheme();
  
  const variants = {
    default: theme === 'dark' ? "text-zinc-300" : "text-zinc-700",
    muted: theme === 'dark' ? "text-zinc-400" : "text-zinc-600",
    accent: theme === 'dark' ? "text-white" : "text-black",
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <p className={cn(variants[variant], sizes[size], "leading-relaxed", className)}>
      {children}
    </p>
  );
}
