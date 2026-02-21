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
    <section className="section-full noise relative" id="contact">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[180px] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-primary)] text-sm tracking-widest uppercase mb-2 font-[family-name:var(--font-heading)]">
            Chapter Five
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)]">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[var(--color-muted-foreground)] mt-4 max-w-lg mx-auto">
            Have a project in mind, want to collaborate, or just say hello?
            I would love to hear from you.
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
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-[var(--color-muted-foreground)] mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--color-muted-foreground)] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--color-muted-foreground)] mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sent ? (
                "Message Sent"
              ) : sending ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send size={16} />
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
            className="space-y-6"
          >
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-[var(--color-primary)]/10">
                <Mail size={20} className="text-[var(--color-primary)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Email
                </p>
                <p className="font-medium">{SITE_CONFIG.email}</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] transition-colors"
              />
            </a>

            <a
              href={`https://github.com/${SITE_CONFIG.github}`}
              target="_blank"
              rel="noopener"
              className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-[var(--color-primary)]/10">
                <Github size={20} className="text-[var(--color-primary)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  GitHub
                </p>
                <p className="font-medium">@{SITE_CONFIG.github}</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] transition-colors"
              />
            </a>

            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener"
              className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-[var(--color-primary)]/10">
                <Linkedin size={20} className="text-[var(--color-primary)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  LinkedIn
                </p>
                <p className="font-medium">Hridey Marwah</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] transition-colors"
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
          className="mt-24 pt-8 border-t border-[var(--color-border)] text-center"
        >
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Designed and built by{" "}
            <span className="text-[var(--color-foreground)] font-medium">{SITE_CONFIG.name}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
