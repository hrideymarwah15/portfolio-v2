"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // 2.2 second boot sequence before revealing the actual hero content
    const timer = setTimeout(() => setBootComplete(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-full crt scanline-effect relative bg-[var(--color-background)] border-b-4 border-[var(--color-border)]" id="hero">
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center min-h-[70vh]">
        {!bootComplete ? (
          <div className="w-full max-w-2xl text-left bg-black p-6 md:p-8 border-4 border-[var(--color-primary)] shadow-[8px_8px_0_0_var(--color-primary)]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--color-primary)] font-[family-name:var(--font-body)] text-xl md:text-2xl leading-relaxed"
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>&gt; INITIALIZING HRIDEY_OS v2.0...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>&gt; LOADING KERNEL MODULES... [OK]</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>&gt; MOUNTING NEURAL NETWORKS... [OK]</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>&gt; DECRYPTING PORTFOLIO DATA... [OK]</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>&gt; ACCESS GRANTED<span className="blinking-cursor">█</span></motion.p>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full mt-24 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-[var(--color-card)] border-2 border-[var(--color-primary)]">
              <Terminal size={20} className="text-[var(--color-primary)]" />
              <span className="text-[var(--color-primary)] font-[family-name:var(--font-body)] text-xl tracking-widest uppercase">
                SYSTEM: {SITE_CONFIG.role}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-[family-name:var(--font-heading)] uppercase text-[var(--color-foreground)]">
              HELLO, USER.<br/>
              I AM <span className="gradient-text">{SITE_CONFIG.name.split(" ")[0]}</span>
              <span className="blinking-cursor text-[var(--color-primary)]">_</span>
            </h1>

            <p className="mt-4 text-xl md:text-2xl text-[var(--color-foreground)] max-w-3xl leading-relaxed font-[family-name:var(--font-body)]">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-6">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-[family-name:var(--font-heading)] text-sm md:text-base border-2 border-[var(--color-primary)] hover:bg-[#09090b] hover:text-[var(--color-primary)] transition-colors uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-border)] active:translate-y-1 active:translate-x-1 active:shadow-none"
              >
                EXECUTE /projects
              </a>
              <a
                href="#contact"
                className="group relative px-8 py-4 bg-[#09090b] text-[var(--color-accent)] font-[family-name:var(--font-heading)] text-sm md:text-base border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] transition-colors uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-accent)] active:translate-y-1 active:translate-x-1 active:shadow-none"
              >
                INIT /contact
              </a>
            </div>

            <div className="mt-16 flex items-center justify-center md:justify-start gap-6">
              <a
                href={`https://github.com/${SITE_CONFIG.github}`}
                target="_blank"
                rel="noopener"
                className="p-3 border-2 border-[var(--color-border)] text-[var(--color-primary)] bg-[var(--color-card)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] transition-all shadow-[2px_2px_0_0_var(--color-border)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener"
                className="p-3 border-2 border-[var(--color-border)] text-[var(--color-primary)] bg-[var(--color-card)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] transition-all shadow-[2px_2px_0_0_var(--color-border)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="p-3 border-2 border-[var(--color-border)] text-[var(--color-primary)] bg-[var(--color-card)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] transition-all shadow-[2px_2px_0_0_var(--color-border)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator - pixel style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[var(--color-primary)] font-[family-name:var(--font-body)] text-xs md:text-sm tracking-widest">SCROLL_DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="text-[var(--color-primary)]"
        >
          ▼
        </motion.div>
      </motion.div>
    </section>
  );
}
