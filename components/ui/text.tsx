import { cn } from "@/lib/utils";

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
  return (
    <Component
      className={cn(
        "font-bold tracking-tight text-white",
        sizeMap[size],
        gradient && "bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent",
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
  const variants = {
    default: "text-zinc-300",
    muted: "text-zinc-400",
    accent: "text-white",
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
