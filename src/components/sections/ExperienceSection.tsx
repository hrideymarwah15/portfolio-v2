"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";

export function ExperienceSection() {
  return (
    <section className="section-full scanline-effect relative bg-[var(--color-background)] border-b-4 border-[var(--color-border)]" id="experience">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-[var(--color-accent)] rounded-full blur-[150px] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[var(--color-primary)] text-sm md:text-base tracking-widest uppercase mb-4 font-[family-name:var(--font-heading)]">
            // MODULE_03
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] uppercase">
            &gt; EXP <span className="text-[var(--color-primary)] glow">LOG</span>_
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-transparent border-l-4 border-dotted border-[var(--color-border)]/50" />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-2 w-7 h-7 bg-black border-4 border-[var(--color-primary)] shadow-[4px_4px_0_0_var(--color-primary)] flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-[var(--color-primary)] animate-[pulse_2s_infinite]" />
                </div>

                {/* Retro Window Card */}
                <div className="bg-black border-4 border-[var(--color-primary)] shadow-[8px_8px_0_0_var(--color-primary)] flex flex-col hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0_0_var(--color-primary)] transition-all duration-200">
                  
                  {/* Title Bar */}
                  <div className="bg-[var(--color-primary)] text-black px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-heading)] flex justify-between items-center border-b-4 border-[var(--color-primary)]">
                    <span className="uppercase truncate pr-4">ENTRY_{String(EXPERIENCE.length - idx).padStart(2, '0')}.LOG</span>
                    <span className="shrink-0 flex gap-2">
                       <span className="cursor-pointer hover:font-bold">_</span>
                       <span className="cursor-pointer hover:font-bold">■</span>
                       <span className="cursor-pointer hover:font-bold">X</span>
                    </span>
                  </div>

                  <div className="p-6 md:p-8 bg-black">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] uppercase mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-[var(--color-primary)] md:text-lg font-[family-name:var(--font-heading)] uppercase">
                          @{exp.company}
                        </p>
                      </div>
                      <span className="text-xs md:text-sm text-black font-bold font-[family-name:var(--font-heading)] bg-[var(--color-primary)] shadow-[4px_4px_0_0_var(--color-border)] px-3 py-2 w-fit uppercase whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-[var(--color-foreground)] text-sm md:text-base leading-relaxed mb-8 font-[family-name:var(--font-body)]">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs md:text-sm px-3 py-1 bg-[#1E293B] border border-[var(--color-border)] text-[var(--color-primary)] font-[family-name:var(--font-body)] uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
