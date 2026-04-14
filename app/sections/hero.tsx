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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black" />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-zinc-800/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0.2}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8"
              whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <Sparkles className="h-4 w-4 text-zinc-400" />
              <span className="text-sm text-zinc-400">Available for work</span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Heading
              as="h1"
              size="xl"
              gradient
              className="mb-6 max-w-4xl"
            >
              Building digital experiences that matter
            </Heading>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Text
              size="lg"
              variant="muted"
              className="max-w-2xl mb-10"
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
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-white transition-colors"
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
