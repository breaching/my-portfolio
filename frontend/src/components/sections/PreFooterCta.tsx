"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";

export function PreFooterCta() {
  return (
    <section className="py-20 md:py-28 border-t border-accent-border relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent-action/15 via-accent-action/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent-action text-sm font-medium font-mono mb-4 tracking-wide uppercase">
            Prêt à démarrer ?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.02em] mb-6">
            Chaque jour sans site,{" "}
            <span className="font-medium text-gradient-action">
              des clients trouvent vos concurrents
            </span>
            .
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Discutons de votre projet en 30 minutes, gratuitement et sans engagement.
            Je vous envoie un devis détaillé sous 48h.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="btn-glow inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-all text-lg shadow-[0_0_30px_var(--accent-action-glow)]"
          >
            <span>Recevoir mon devis gratuit</span>
            <ArrowRight size={20} weight="bold" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
