"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";

export function ExperienceSection() {
  return (
    <section className="section-full noise relative" id="experience">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-[var(--color-accent)] rounded-full blur-[150px] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[var(--color-primary)] text-sm tracking-widest uppercase mb-2 font-[family-name:var(--font-heading)]">
            Chapter Three
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)]">
            The <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-border)]" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1 w-5 h-5 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 hover:border-[var(--color-primary)]/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">
                        {exp.role}
                      </h3>
                      <p className="text-[var(--color-primary)] text-sm font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--color-muted-foreground)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
