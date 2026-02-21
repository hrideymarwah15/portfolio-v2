"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // For now, open mailto as fallback
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="section-full relative bg-[var(--color-background)] scanline-effect" id="contact">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[180px] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-primary)] text-sm md:text-base tracking-widest uppercase mb-4 font-[family-name:var(--font-heading)]">
            // MODULE_05
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] uppercase">
            &gt; PING <span className="text-[var(--color-primary)] glow">SYS_ADMIN</span>_
          </h2>
          <p className="text-[var(--color-foreground)] mt-6 max-w-lg mx-auto font-[family-name:var(--font-body)] text-lg">
            Establish a direct connection protocol. Awaiting input.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-black border-4 border-[var(--color-primary)] shadow-[8px_8px_0_0_var(--color-primary)] p-6 md:p-8"
          >
            <div className="bg-[var(--color-primary)] text-black px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-heading)] flex justify-between items-center border-b-4 border-[var(--color-primary)] -mt-6 -mx-6 md:-mx-8 mb-6">
               <span>COMM_LINK.EXE</span>
               <span>_ ■ X</span>
            </div>

            <div>
              <label className="block text-xs md:text-sm text-[var(--color-primary)] mb-2 font-[family-name:var(--font-heading)] uppercase">
                &gt; Name:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-black border-2 border-[var(--color-primary)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:border-[var(--color-accent)] focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-accent)] transition-all font-[family-name:var(--font-body)] text-lg"
                placeholder="[ENTRY_REQUIRED]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-[var(--color-primary)] mb-2 font-[family-name:var(--font-heading)] uppercase">
                &gt; Email:
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-black border-2 border-[var(--color-primary)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:border-[var(--color-accent)] focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-accent)] transition-all font-[family-name:var(--font-body)] text-lg"
                placeholder="[ENTRY_REQUIRED]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-[var(--color-primary)] mb-2 font-[family-name:var(--font-heading)] uppercase">
                &gt; Message:
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-black border-2 border-[var(--color-primary)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:border-[var(--color-accent)] focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-accent)] transition-all resize-none font-[family-name:var(--font-body)] text-lg"
                placeholder="[TRANSMISSION_DATA]"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 bg-[var(--color-primary)] text-black border-2 border-[var(--color-primary)] font-bold uppercase hover:bg-black hover:text-[var(--color-primary)] hover:shadow-[4px_4px_0_0_var(--color-primary)] transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 font-[family-name:var(--font-heading)] text-sm md:text-base mt-4 outline-none"
            >
              {sent ? (
                "[ PKT_DELIVERED ]"
              ) : sending ? (
                "[ TRANSMITTING... ]"
              ) : (
                <>
                  [ SEND_PACKET ] <Send size={18} />
                </>
              )}
            </button>
          </motion.form>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="bg-black border-4 border-[var(--color-primary)] shadow-[6px_6px_0_0_var(--color-primary)] p-6 flex items-center gap-6 group hover:translate-y-1 hover:translate-x-1 hover:shadow-none hover:bg-[var(--color-primary)]/10 transition-all duration-200"
            >
              <div className="p-3 border-2 border-[var(--color-primary)] bg-black text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors">
                <Mail size={24} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-[var(--color-primary)] font-[family-name:var(--font-heading)] uppercase mb-1">
                  EMAIL_PROTOCOL
                </p>
                <p className="font-[family-name:var(--font-body)] text-xl text-[var(--color-foreground)] truncate">{SITE_CONFIG.email}</p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--color-primary)] group-hover:scale-125 transition-transform"
              />
            </a>

            <a
              href={`https://github.com/${SITE_CONFIG.github}`}
              target="_blank"
              rel="noopener"
              className="bg-black border-4 border-[var(--color-success)] shadow-[6px_6px_0_0_var(--color-success)] p-6 flex items-center gap-6 group hover:translate-y-1 hover:translate-x-1 hover:shadow-none hover:bg-[var(--color-success)]/10 transition-all duration-200"
            >
              <div className="p-3 border-2 border-[var(--color-success)] bg-black text-[var(--color-success)] group-hover:bg-[var(--color-success)] group-hover:text-black transition-colors">
                <Github size={24} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-[var(--color-success)] font-[family-name:var(--font-heading)] uppercase mb-1">
                  GITHUB_REPO
                </p>
                <p className="font-[family-name:var(--font-body)] text-xl text-[var(--color-foreground)] truncate">@{SITE_CONFIG.github}</p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--color-success)] group-hover:scale-125 transition-transform"
              />
            </a>

            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener"
              className="bg-black border-4 border-[#0077b5] shadow-[6px_6px_0_0_#0077b5] p-6 flex items-center gap-6 group hover:translate-y-1 hover:translate-x-1 hover:shadow-none hover:bg-[#0077b5]/10 transition-all duration-200"
            >
              <div className="p-3 border-2 border-[#0077b5] bg-black text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-black transition-colors">
                <Linkedin size={24} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-[#0077b5] font-[family-name:var(--font-heading)] uppercase mb-1">
                  LINKEDIN_NET
                </p>
                <p className="font-[family-name:var(--font-body)] text-xl text-[var(--color-foreground)] truncate">Hridey Marwah</p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[#0077b5] group-hover:scale-125 transition-transform"
              />
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 pt-8 border-t-4 border-dashed border-[var(--color-primary)]/30 text-center"
        >
          <p className="text-sm md:text-base text-[var(--color-foreground)] font-[family-name:var(--font-body)]">
             <span className="text-[var(--color-primary)]">SYS.MSG:</span> Built by{" "}
            <span className="font-bold underline decoration-[var(--color-primary)] decoration-2 underline-offset-4 glow">{SITE_CONFIG.name}</span>
            {" "}© {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
