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
    // We cannot use useState here easily because it would trigger React renders at 60fps
    // which causes severe lag. Instead, we use mutable variables and direct DOM manipulation.
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
          isScanned = false;
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
      className="card-wrapper snap-center relative w-[85vw] md:w-[600px] lg:w-[700px] h-[550px] rounded-3xl overflow-hidden group flex-shrink-0"
    >
      {/* Normal Card (Layer 1) */}
      <div 
        className="absolute inset-0 glass border border-[var(--color-primary)]/10 flex flex-col transition-all duration-500 hover:border-[var(--color-primary)]/30"
        style={{ clipPath: 'inset(0 0 0 var(--clip-right, 0%))', pointerEvents: 'auto' }}
      >
          {/* Image placeholder */}
          <div className="h-56 md:h-64 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-success)]/20 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-[var(--color-foreground)]/5 font-[family-name:var(--font-heading)]">
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
                  className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors backdrop-blur-sm"
                  aria-label="Live demo"
                >
                  <ExternalLink size={20} className="text-white" />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener"
                className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors backdrop-blur-sm"
                aria-label="Source code"
              >
                <Github size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex-1 flex flex-col bg-[var(--color-background)]">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)]">
                {project.title}
              </h3>
              {project.featured && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium">
                  Featured
                </span>
              )}
            </div>

            <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6 text-sm md:text-base line-clamp-3">
              {project.longDescription}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--color-primary)]/5 text-[var(--color-primary)]/80 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
      </div>

      {/* X-Ray / Code Card (Layer 2) */}
      <div 
        className="absolute inset-0 bg-[#0F172A] border border-[#38BDF8]/30 flex flex-col p-8 overflow-hidden pointer-events-none"
        style={{ clipPath: 'inset(0 calc(100% - var(--clip-left, 0%)) 0 0)' }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Content */}
        <div className="relative z-10 text-[#38BDF8] font-mono text-xs md:text-sm leading-relaxed opacity-90 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
          <p>{`{`}</p>
          <p className="pl-4">{`"id": "${project.id}",`}</p>
          <p className="pl-4">{`"title": "${project.title}",`}</p>
          <p className="pl-4">{`"featured": ${project.featured},`}</p>
          <p className="pl-4">{`"tech": [`}</p>
          {project.techStack.map(t => <p key={t} className="pl-8">"{t}",</p>)}
          <p className="pl-4">{`],`}</p>
          <p className="pl-4">
            {`"status": `}<span className="text-[#34D399]">"DEPLOYED_AND_ACTIVE"</span>
          </p>
          <p>{`}`}</p>
        </div>
        
        <div className="relative z-10 mt-auto flex items-center gap-4">
            <div className="flex-1 h-1 bg-[#1E293B] rounded overflow-hidden">
                <div className="h-full bg-[#38BDF8] w-3/4 animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
            <span className="text-[#34D399] font-mono text-xs font-bold truncate">SYS_OPTIMIZED</span>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-[#38BDF8]/40 font-mono text-xs">
            [X-RAY_MODE]
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-[#38BDF8]/20 rounded-full flex items-center justify-center">
             <div className="w-8 h-8 border border-[#38BDF8]/40 rounded-full animate-[spin_4s_linear_infinite]"></div>
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

  // Reduce total translation to prevent aggressive left-to-right shift upon vertical scrolling. 
  // It gives a subtle parallax without breaking native horizontal scroll logic.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]); 

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-[var(--color-background)]"
      id="projects"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[200px] opacity-10" />

      {/* The Central Scanner Beam */}
      <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-[#38BDF8] to-transparent opacity-80 shadow-[0_0_30px_#38BDF8,0_0_60px_#38BDF8] z-50 animate-[pulse_1.5s_ease-in-out_infinite_alternate]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#38BDF8] font-mono text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap rotate-90 opacity-60 z-50 mix-blend-screen drop-shadow-[0_0_5px_#38BDF8]">
          Deep Scan Active
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[var(--color-primary)] text-sm tracking-widest uppercase mb-2 font-[family-name:var(--font-heading)] font-semibold">
            Chapter Two
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)]">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-[var(--color-muted-foreground)] mt-4 max-w-lg">
            A selection of projects I have built, each telling a story of
            problem-solving and technical growth. Scroll horizontally to analyze.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll gallery */}
      <motion.div style={{ x }} className="relative z-10">
        <div className="horizontal-scroll flex items-center gap-8 md:gap-16 pl-6 md:pl-[calc((100vw-1280px)/2+1.5rem)] pb-12 pt-4">
          <div className="w-[5vw] flex-shrink-0" /> {/* Spacer at start */}
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
          <div className="w-[50vw] flex-shrink-0" /> {/* Spacer at end to allow the last card to pass the center scanner */}
        </div>
      </motion.div>
    </section>
  );
}
