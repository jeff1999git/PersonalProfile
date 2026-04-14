"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl"
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-4rem)] py-20 lg:py-0">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <FadeIn delay={0.2}>
              <p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">
                Full-Stack Developer
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                Jeffin
                <br />
                Jose V
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-zinc-500 text-lg mb-8 max-w-md">
                Design. Code. Ship.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 text-white group"
                whileHover={{ x: 4 }}
              >
                <span className="text-sm tracking-wide">CONNECT</span>
                <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.a>
            </FadeIn>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <FadeIn delay={0.2}>
              <div className="relative">
                {/* Slanted background shape */}
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(0% 0%, 70% 0%, 100% 100%, 30% 100%)",
                  }}
                />

                {/* Profile image */}
                <motion.div
                  className="relative w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] lg:w-[360px] lg:h-[460px] z-20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="https://res.cloudinary.com/doelglurk/image/upload/v1776159320/jeff_cv_color_ksrzrb.png"
                    alt="Jeffin Jose V"
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
                    className="object-contain object-bottom"
                    priority
                  />
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
