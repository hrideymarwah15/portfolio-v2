"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG, SKILLS } from "@/lib/constants";

export function AboutSection() {
  return (
    <section className="section-full noise relative" id="about">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600 rounded-full blur-[150px] opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[var(--color-primary)] text-sm tracking-widest uppercase mb-2 font-[family-name:var(--font-heading)]">
            Chapter One
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-8">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed">
              I am a Computer Science student at Rishihood University with a deep 
              passion for building digital products that solve real problems. My journey 
              started with curiosity about how the web works and evolved into a 
              commitment to crafting performant, beautiful applications.
            </p>
            <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed">
              As an open-source contributor to{" "}
              <span className="text-white font-medium">JAX at Google DeepMind</span>,
              I have learned the value of rigorous code review, clean architecture, and 
              collaborative problem solving. I bring that same discipline to every 
              project I build.
            </p>
            <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed">
              When I am not coding, you will find me organizing university events,
              exploring new tech, or on a competitive programming streak on LeetCode.
            </p>
          </motion.div>

          {/* Skills bento grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {Object.entries(SKILLS).map(([category, skills], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="glass rounded-2xl p-5 hover:border-[var(--color-primary)]/30 transition-all duration-300 group"
              >
                <h3 className="text-xs uppercase tracking-wider text-[var(--color-primary)] mb-3 font-[family-name:var(--font-heading)]">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[var(--color-muted-foreground)] group-hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
