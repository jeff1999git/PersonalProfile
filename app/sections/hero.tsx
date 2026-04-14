"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/text";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />

      {/* Minimal animated background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-900/20 rounded-full blur-3xl"
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
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-900/15 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <FadeIn delay={0.2}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-900/50 bg-zinc-900/30 backdrop-blur-sm mb-12"
              whileHover={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <Sparkles className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-500 tracking-wide">Available for work</span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Heading
              as="h1"
              size="xl"
              gradient
              className="mb-8 leading-tight"
            >
              Building digital experiences that matter
            </Heading>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Text
              size="lg"
              variant="muted"
              className="max-w-3xl mb-12 leading-relaxed"
            >
              Full-stack developer specializing in creating elegant,
              high-performance web applications with modern technologies.
            </Text>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#projects" size="lg">
                View Projects
              </Button>
              <Button href="#contact" variant="outline" size="lg">
                Get in Touch
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={1.2}>
            <motion.a
              href="#about"
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-white transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="h-6 w-6" />
            </motion.a>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
