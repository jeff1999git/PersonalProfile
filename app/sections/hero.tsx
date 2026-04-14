"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export function Hero() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        theme === 'dark' 
          ? 'from-zinc-950 via-black to-zinc-950' 
          : 'from-zinc-100 via-white to-zinc-50'
      }`} />

      {/* Animated background orbs */}
      <motion.div
        className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-zinc-800/20' : 'bg-zinc-300/20'
        }`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-20 lg:py-0">
          {/* Left Content - Image + Name + Button */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:mt-0 lg:justify-self-start lg:pr-12">
            <FadeIn delay={0.2}>
              <div className="relative mb-8">
                {/* Profile image with slanted background */}
                <div className="relative">
                  <div
                    className={`absolute inset-0 z-10 ${
                      theme === 'dark' ? 'bg-white' : 'bg-zinc-900'
                    }`}
                    style={{
                      clipPath: "polygon(0% 0%, 70% 0%, 100% 100%, 30% 100%)",
                    }}
                  />
                  <motion.div
                    className="relative w-[160px] h-[210px] sm:w-[200px] sm:h-[260px] z-20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="https://res.cloudinary.com/doelglurk/image/upload/v1776159320/jeff_cv_color_ksrzrb.png"
                      alt="Jeffin Jose V"
                      fill
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 200px"
                      className="object-contain object-bottom"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className={`text-4xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                JEFFIN
                <br />
                <span className="font-light text-3xl sm:text-4xl lg:text-5xl">JOSE V</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className={`text-sm tracking-widest uppercase mb-2 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                FULL-STACK DEVELOPER
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-700'
              }`}>
                Design. Code. Ship.
              </p>
            </FadeIn>

            
            {/* Social Media Links */}
            <FadeIn delay={0.7}>
              <div className="flex flex-row gap-4 mt-0.5">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 group ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                  } transition-colors`}
                  whileHover={{ x: 4 }}
                >
                  <Github className="h-5 w-5" />
                  <span className="text-sm">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 group ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                  } transition-colors`}
                  whileHover={{ x: 4 }}
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="mailto:hello@example.com"
                  className={`flex items-center gap-3 group ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                  } transition-colors`}
                  whileHover={{ x: 4 }}
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">Gmail</span>
                </motion.a>
              </div>
            </FadeIn>
          </div>

          {/* Vertical Separator */}
          <div className={`hidden lg:block h-64 w-px ${
            theme === 'dark' ? 'bg-white/20' : 'bg-black/20'
          }`} />

          {/* Right Content - About Me + Stats */}
          <div className="flex flex-col justify-center lg:mt-0 lg:justify-self-end lg:pl-12">
            <FadeIn delay={0.3}>
              <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                About Me
              </h2>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className={`space-y-4 mb-8 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                <p className="leading-relaxed">
                  I'm a passionate full-stack developer with a love for creating elegant, 
                  user-friendly web applications. With expertise in modern technologies 
                  and frameworks, I transform ideas into powerful digital solutions.
                </p>
                <p className="leading-relaxed">
                  My approach combines technical excellence with creative problem-solving, 
                  ensuring every project I deliver is both functional and beautiful. 
                  I thrive on challenges and continuously expand my skill set to stay 
                  at the forefront of web development.
                </p>
              </div>
            </FadeIn>

            {/* Stats Cards */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  className={`border rounded-lg p-4 text-center ${
                    theme === 'dark' 
                      ? 'bg-zinc-900/50 border-zinc-800' 
                      : 'bg-zinc-100/50 border-zinc-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>5+</div>
                  <div className={`text-xs uppercase tracking-wide ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>Years Experience</div>
                </motion.div>
                <motion.div
                  className={`border rounded-lg p-4 text-center ${
                    theme === 'dark' 
                      ? 'bg-zinc-900/50 border-zinc-800' 
                      : 'bg-zinc-100/50 border-zinc-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>50+</div>
                  <div className={`text-xs uppercase tracking-wide ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>Projects Completed</div>
                </motion.div>
                <motion.div
                  className={`border rounded-lg p-4 text-center ${
                    theme === 'dark' 
                      ? 'bg-zinc-900/50 border-zinc-800' 
                      : 'bg-zinc-100/50 border-zinc-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>20+</div>
                  <div className={`text-xs uppercase tracking-wide ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>Happy Clients</div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <FadeIn delay={1} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <motion.a
            href="#about"
            className="text-zinc-600 hover:text-white transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="sr-only">Scroll down</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </FadeIn>
      </Container>
    </section>
  );
}
