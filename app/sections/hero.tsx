"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Mail } from "lucide-react";
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

      {/* Animated background orb */}
      <div
        className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-orb-pulse ${
          theme === 'dark' ? 'bg-zinc-800/20' : 'bg-zinc-300/20'
        }`}
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
                  href="https://github.com/jeff1999git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 group ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                  } transition-colors`}
                  whileHover={{ x: 4 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c.957.004 1.983.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  <span className="text-sm">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/jeffin-jose-v-67610a19b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 group ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                  } transition-colors`}
                  whileHover={{ x: 4 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/></svg>
                  <span className="text-sm">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="mailto:jeffinmjtcr@gmail.com"
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

          {/* Right Content - Headline + Bio */}
          <div className="flex flex-col justify-center lg:mt-0 lg:justify-self-end lg:pl-12">
            <FadeIn delay={0.3}>
              <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.15] mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                I build systems,{" "}
                <span className="relative inline-block px-3 py-0.5">
                  <span className={`absolute inset-0 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} style={{ transform: 'skewX(-10deg)' }} />
                  <span className={`relative ${theme === 'dark' ? 'text-black' : 'text-white'}`}>products</span>
                </span>
                , and ideas that turn{" "}
                <span className="relative inline-block px-3 py-0.5">
                  <span className={`absolute inset-0 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} style={{ transform: 'skewX(-10deg)' }} />
                  <span className={`relative ${theme === 'dark' ? 'text-black' : 'text-white'}`}>complexity</span>
                </span>
                {" "}into clarity.
              </h2>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className={`space-y-4 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                <p className="leading-relaxed text-sm lg:text-base">
                  I&apos;m Jeff Joe — a full-stack developer and builder focused on creating
                  scalable, real-world applications. I work on transforming ideas into
                  structured, usable systems that are both efficient and reliable.
                </p>
                <p className="leading-relaxed text-sm lg:text-base">
                  My work is driven by a focus on simplicity, performance, and impact —
                  building products that are not just functional, but purposeful and
                  built to last.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <FadeIn delay={1} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <a
            href="#experience"
            className="text-zinc-600 hover:text-white transition-colors animate-scroll-bounce inline-block"
          >
            <span className="sr-only">Scroll down</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </FadeIn>
      </Container>
    </section>
  );
}
