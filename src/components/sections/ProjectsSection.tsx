"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="w-[85vw] md:w-[600px] lg:w-[700px] glass rounded-3xl overflow-hidden group hover:border-[var(--color-primary)]/30 transition-all duration-500 flex-shrink-0"
    >
      {/* Image placeholder */}
      <div className="h-48 md:h-64 bg-gradient-to-br from-[var(--color-primary)]/20 to-purple-900/20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-white/5 font-[family-name:var(--font-heading)]">
            0{index + 1}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/10 transition-all duration-500 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
          {project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={20} className="text-white" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Source code"
          >
            <Github size={20} className="text-white" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)]">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-medium">
              Featured
            </span>
          )}
        </div>

        <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6 text-sm md:text-base">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--color-muted-foreground)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      id="projects"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[200px] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[var(--color-primary)] text-sm tracking-widest uppercase mb-2 font-[family-name:var(--font-heading)]">
            Chapter Two
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)]">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-[var(--color-muted-foreground)] mt-4 max-w-lg">
            A selection of projects I have built, each telling a story of
            problem-solving and technical growth.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll gallery */}
      <motion.div style={{ x }} className="relative z-10">
        <div className="horizontal-scroll pl-6 md:pl-[calc((100vw-1280px)/2+1.5rem)]">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
          {/* Spacer */}
          <div className="w-6 flex-shrink-0" />
        </div>
      </motion.div>
    </section>
  );
}
