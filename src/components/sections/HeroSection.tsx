"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="section-full noise relative" id="hero">
      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-[100px] opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[var(--color-muted-foreground)] text-sm md:text-base tracking-widest uppercase mb-4 font-[family-name:var(--font-heading)]">
            {SITE_CONFIG.role}
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight font-[family-name:var(--font-heading)]">
            Hi, I&apos;m{" "}
            <span className="gradient-text">{SITE_CONFIG.name.split(" ")[0]}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl mx-auto leading-relaxed"
          >
            {SITE_CONFIG.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-white transition-all duration-200"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <a
            href={`https://github.com/${SITE_CONFIG.github}`}
            target="_blank"
            rel="noopener"
            className="text-[var(--color-muted-foreground)] hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener"
            className="text-[var(--color-muted-foreground)] hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-[var(--color-muted-foreground)] hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown
            size={20}
            className="text-[var(--color-muted-foreground)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
