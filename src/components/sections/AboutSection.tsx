"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG, SKILLS } from "@/lib/constants";

export function AboutSection() {
  return (
    <section className="section-full relative border-b-4 border-[var(--color-border)] bg-[#09090b]" id="about">
      {/* Subtle retro grid pattern */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[var(--color-primary)] text-sm md:text-base tracking-widest mb-4 font-[family-name:var(--font-heading)]">
            // CHAPTER_01
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-12 uppercase text-[var(--color-foreground)]">
            &gt; ABOUT <span className="text-[var(--color-primary)] glow">ME</span>_
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Story Window */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col border-2 border-[var(--color-foreground)] shadow-[6px_6px_0_0_var(--color-foreground)] bg-black"
          >
            <div className="bg-[var(--color-foreground)] text-black px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-heading)] flex justify-between items-center border-b-2 border-[var(--color-foreground)]">
              <span>bio.txt</span>
              <span className="opacity-70">_ ■ X</span>
            </div>
            <div className="p-6 space-y-6 flex-grow font-[family-name:var(--font-body)] text-lg md:text-xl text-[var(--color-foreground)] leading-relaxed">
              <p>
                I am a Computer Science student at Rishihood University with a deep 
                passion for building digital products that solve real problems. My journey 
                started with curiosity about how the web works and evolved into a 
                commitment to crafting performant, beautiful applications.
              </p>
              <p>
                As an open-source contributor to{" "}
                <span className="text-[var(--color-primary)] font-bold">JAX at Google DeepMind</span>,
                I have learned the value of rigorous code review, clean architecture, and 
                collaborative problem solving. I bring that same discipline to every 
                project I build.
              </p>
              <p>
                When I am not coding, you will find me organizing university events,
                exploring new tech, or on a competitive programming streak on LeetCode.
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {Object.entries(SKILLS).map(([category, skills], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex flex-col border-2 border-[var(--color-primary)] shadow-[4px_4px_0_0_var(--color-border)] bg-black hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200"
              >
                <div className="bg-[var(--color-primary)] text-black px-3 py-2 text-[10px] sm:text-xs uppercase tracking-wider font-[family-name:var(--font-heading)] flex justify-between items-center border-b-2 border-[var(--color-primary)]">
                  <span className="truncate pr-2">{category}</span>
                  <span className="shrink-0">X</span>
                </div>
                <div className="p-4 flex flex-wrap gap-3 flex-grow font-[family-name:var(--font-body)]">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm md:text-base text-[var(--color-foreground)] before:content-['>'] before:text-[var(--color-primary)] before:mr-1 uppercase"
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
