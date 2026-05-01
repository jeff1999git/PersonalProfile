"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
        theme === 'dark' 
          ? 'border-zinc-900/50 bg-black/40' 
          : 'border-zinc-200/50 bg-white/40'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <motion.a
            href="#"
            className={`text-lg font-semibold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Jeff.
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors tracking-wide ${
                  theme === 'dark' 
                    ? 'text-zinc-400 hover:text-white' 
                    : 'text-zinc-600 hover:text-black'
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'text-zinc-500 hover:text-white hover:bg-zinc-800/50' 
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-200/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </nav>
      </Container>
    </motion.header>
  );
}
