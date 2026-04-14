"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900/50 py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-600">
            © {currentYear} Jeffin Jose V. All rights reserved.
          </p>
          <p className="text-sm text-zinc-700">
            Built with Next.js & Tailwind CSS
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}
