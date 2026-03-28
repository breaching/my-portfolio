"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";

export function PreFooterCta() {
  return (
    <section className="py-24 md:py-32 lg:py-40 border-t border-accent-border relative overflow-hidden">
      {/* Multi-layer background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-accent-action/[0.07] via-accent-action/[0.12] to-accent-action/[0.04] pointer-events-none"
        aria-hidden="true"
      />
      {/* Radial glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent-action/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Side glows */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-violet-600/8 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-500/8 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Decorative lines */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-accent-action/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-accent-action/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-accent-action text-sm font-medium font-mono mb-5 tracking-wide uppercase"
          >
            Prêt à démarrer ?
          </motion.p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-light tracking-[-0.02em] mb-6 leading-[1.15]">
            Chaque jour sans site,{" "}
            <span className="font-medium text-gradient-action">
              des clients trouvent vos concurrents
            </span>
            .
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 max-w-lg mx-auto">
            Discutons de votre projet en 30 minutes, gratuitement et sans engagement.
            Je vous envoie un devis détaillé sous 48h.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="btn-glow inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 bg-accent-action text-background font-medium rounded-xl hover:bg-accent-action-hover transition-all text-base sm:text-lg shadow-[0_0_40px_var(--accent-action-glow),0_0_80px_var(--accent-action-glow)]"
          >
            <span>Recevoir mon devis gratuit</span>
            <ArrowRight size={20} weight="bold" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
