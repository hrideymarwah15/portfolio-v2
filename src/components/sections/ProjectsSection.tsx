"use client";

import { useEffect, useRef } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isScanned = false; 

    const updateClipping = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        
        // Define scanner dimensions (centered on screen)
        const scannerX = window.innerWidth / 2;
        const scannerWidth = 4; // Matching the 4px width of the beam
        const scannerLeft = scannerX - scannerWidth / 2;
        const scannerRight = scannerX + scannerWidth / 2;
        
        const cardLeft = rect.left;
        const cardRight = rect.right;
        const cardWidth = rect.width;
        
        let newClipRight = 0;
        let newClipLeft = 0;
        
        // Check intersection
        if (cardLeft < scannerRight && cardRight > scannerLeft) {
          // Card is crossing the scanner
          const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
          const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);
            
          newClipRight = (scannerIntersectLeft / cardWidth) * 100;
          newClipLeft = (scannerIntersectRight / cardWidth) * 100;
          
          // Flash effect when first entering the scanner from the right
          if (!isScanned && scannerIntersectLeft > 0 && scannerIntersectLeft < cardWidth * 0.1) {
            isScanned = true;
            cardRef.current.classList.add("scan-flash");
            setTimeout(() => {
              if (cardRef.current) cardRef.current.classList.remove("scan-flash");
            }, 600);
          }
        } else if (cardRight < scannerLeft) {
          // Card is fully to the left of the scanner (passed it)
          newClipRight = 100;
          newClipLeft = 100;
          isScanned = false; // Reset for when scrolling back
        } else if (cardLeft > scannerRight) {
          // Card is fully to the right of the scanner (hasn't reached it)
          newClipRight = 0;
          newClipLeft = 0;
          isScanned = false; // Reset for when scrolling forward
        }
        
        // Apply clip paths via CSS variables to avoid React re-renders
        cardRef.current.style.setProperty('--clip-right', `${newClipRight}%`);
        cardRef.current.style.setProperty('--clip-left', `${newClipLeft}%`);
      }
      animationFrameId = requestAnimationFrame(updateClipping);
    };

    updateClipping();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="card-wrapper snap-center relative w-[85vw] md:w-[600px] lg:w-[700px] h-[550px] overflow-hidden group flex-shrink-0"
    >
      {/* Normal Card (Layer 1) */}
      <div 
        className="absolute inset-0 bg-[#09090b] border-4 border-[var(--color-primary)] shadow-[8px_8px_0_0_var(--color-primary)] flex flex-col transition-all duration-500 hover:border-white hover:shadow-[12px_12px_0_0_var(--color-foreground)]"
        style={{ clipPath: 'inset(0 0 0 var(--clip-right, 0%))', pointerEvents: 'auto' }}
      >
          {/* Top Bar for Card */}
          <div className="bg-[var(--color-primary)] text-black px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-heading)] flex justify-between items-center border-b-4 border-[var(--color-primary)]">
            <span>DATA_BLOCK_{index + 1}.EXE</span>
            <span>_ ■ X</span>
          </div>

          {/* Image placeholder */}
          <div className="h-48 md:h-56 bg-black relative overflow-hidden shrink-0 border-b-2 border-dashed border-[var(--color-primary)]/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl font-bold text-[var(--color-primary)]/10 font-[family-name:var(--font-heading)]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/80 transition-all duration-500 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
              {project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="p-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-colors flex items-center gap-2 font-[family-name:var(--font-heading)] text-xs uppercase"
                  aria-label="Live demo"
                >
                  <ExternalLink size={16} /> [ EXECUTE ]
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener"
                className="p-4 border-2 border-[var(--color-success)] text-[var(--color-success)] hover:bg-[var(--color-success)] hover:text-black transition-colors flex items-center gap-2 font-[family-name:var(--font-heading)] text-xs uppercase"
                aria-label="Source code"
              >
                <Github size={16} /> [ SOURCE ]
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex-1 flex flex-col bg-black">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-primary)] uppercase">
                {project.title}
              </h3>
              {project.featured && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-[var(--color-accent)] text-black font-[family-name:var(--font-heading)] shadow-[2px_2px_0_0_var(--color-primary)]">
                  ★ FEATURED
                </span>
              )}
            </div>

            <p className="text-[var(--color-foreground)] leading-relaxed mb-6 text-sm md:text-base line-clamp-3 font-[family-name:var(--font-body)]">
              {project.longDescription}
            </p>

            <div className="mt-auto flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-[#1E293B] border border-[var(--color-border)] text-[var(--color-primary)] font-[family-name:var(--font-body)] uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
      </div>

      {/* X-Ray / Code Card (Layer 2) */}
      <div 
        className="absolute inset-0 bg-[#09090b] border-4 border-[var(--color-destructive)] shadow-[8px_8px_0_0_var(--color-destructive)] flex flex-col overflow-hidden pointer-events-none z-0"
        style={{ clipPath: 'inset(0 calc(100% - var(--clip-left, 0%)) 0 0)' }}
      >
        {/* Top Bar for X-Ray */}
        <div className="bg-[var(--color-destructive)] text-black px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-heading)] border-b-4 border-[var(--color-destructive)] flex justify-between">
          <span>DEBUG_MODE.SYS</span>
          <span>&lt;READ_ONLY&gt;</span>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,0,60,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,60,0.1)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] mt-10"></div>
        
        {/* Content */}
        <div className="relative z-10 p-8 text-[var(--color-destructive)] font-mono text-xs md:text-sm leading-relaxed opacity-90 drop-shadow-[0_0_8px_rgba(255,0,60,0.5)]">
          <p>{`{`}</p>
          <p className="pl-4">{`"id": "${project.id}",`}</p>
          <p className="pl-4">{`"title": "${project.title}",`}</p>
          <p className="pl-4">{`"featured": ${project.featured},`}</p>
          <p className="pl-4">{`"tech": [`}</p>
          {project.techStack.map(t => <p key={t} className="pl-8">"{t}",</p>)}
          <p className="pl-4">{`],`}</p>
          <p className="pl-4">
            {`"status": `}<span className="text-[var(--color-success)]">"DEPLOYED_AND_ACTIVE"</span>
          </p>
          <p>{`}`}</p>
        </div>
        
        <div className="relative z-10 mt-auto p-8 pt-0 flex items-center gap-4">
            <div className="flex-1 h-2 bg-[#1E293B] border border-[var(--color-destructive)] overflow-hidden">
                <div className="h-full bg-[var(--color-destructive)] w-3/4 animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
            <span className="text-[var(--color-destructive)] font-mono text-xs font-bold truncate">SYS_OPTIMIZED</span>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-16 right-4 text-[var(--color-destructive)]/40 font-[family-name:var(--font-heading)] text-[10px]">
            [X-RAY_SCAN]
        </div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-[var(--color-destructive)]/40 rounded-none flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-[var(--color-destructive)] animate-[spin_4s_linear_infinite]"></div>
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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]); 

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-transparent border-b-4 border-[var(--color-border)]"
      id="projects"
    >
      {/* The Central Scanner Beam (Red Laser) */}
      <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1.5 bg-[var(--color-destructive)] shadow-[0_0_20px_var(--color-destructive),0_0_40px_var(--color-destructive)] z-50 animate-[pulse_1.5s_ease-in-out_infinite_alternate]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-4 border-2 border-[var(--color-destructive)] bg-black/80 text-[var(--color-destructive)] font-[family-name:var(--font-heading)] text-[10px] md:text-xs font-bold whitespace-nowrap opacity-100 z-50 drop-shadow-[0_0_5px_var(--color-destructive)] flex flex-col items-center justify-center gap-2">
          <span>&gt;</span>
          <span>D</span>
          <span>E</span>
          <span>E</span>
          <span>P</span>
          <span>_</span>
          <span>S</span>
          <span>C</span>
          <span>A</span>
          <span>N</span>
          <span>&lt;</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[var(--color-primary)] text-sm md:text-base tracking-widest uppercase mb-4 font-[family-name:var(--font-heading)]">
            // MODULE_02
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] uppercase">
            &gt; DATA <span className="text-[var(--color-primary)] glow">DECK</span>_
          </h2>
          <p className="text-[var(--color-foreground)] mt-6 text-lg max-w-lg font-[family-name:var(--font-body)]">
            A selection of executables I have engineered. Scroll horizontally to intercept the data stream.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll gallery */}
      <motion.div style={{ x }} className="relative z-10">
        <div className="horizontal-scroll flex items-center gap-8 md:gap-16 pl-6 md:pl-[calc((100vw-1280px)/2+1.5rem)] pb-16 pt-8">
          <div className="w-[5vw] flex-shrink-0" /> {/* Spacer at start */}
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
          <div className="w-[50vw] flex-shrink-0" /> {/* Spacer at end */}
        </div>
      </motion.div>
    </section>
  );
}
