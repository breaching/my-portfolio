"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, ArrowDown } from "@phosphor-icons/react";
import { expertise } from "@/data/posts";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}

export function HeroSection() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <section id="accueil" className="section pt-24 md:pt-32 relative" ref={heroRef}>
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, var(--accent-action-glow) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial="initial"
        animate={isHeroInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="prose-width relative"
      >
        {/* Availability badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-border bg-background-elevated text-sm text-text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
            </span>
            Disponible pour de nouveaux projets
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-6 leading-[1.1]"
        >
          Je crée des sites web qui{" "}
          <span className="text-gradient-action">convertissent</span>.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-text-secondary text-base md:text-lg lg:text-xl leading-[1.6] mb-10 max-w-[600px]"
        >
          Développeur web freelance à Caen. Sites vitrines modernes, rapides, et
          optimisés pour Google. De l&apos;idée au site en ligne en 2 semaines.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-action text-background font-medium rounded-md hover:bg-accent-action-hover transition-all"
          >
            <EnvelopeSimple size={18} weight="bold" />
            <span>Demander un devis gratuit</span>
          </a>
          <a
            href="#realisations"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("realisations");
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent-border text-text-primary font-medium rounded-md hover:bg-background-elevated hover:border-text-tertiary transition-all"
          >
            <ArrowDown size={18} weight="bold" />
            <span>Voir mes réalisations</span>
          </a>
        </motion.div>

        {/* Credibility stats */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-10 text-sm text-text-tertiary font-mono"
        >
          <div>
            <span className="text-text-primary font-medium">186</span> tests passés sur Clarmind
          </div>
          <div>
            <span className="text-text-primary font-medium">Next.js 16</span> dernière version
          </div>
          <div>
            <span className="text-text-primary font-medium">&lt; 2s</span> temps de chargement
          </div>
        </motion.div>
      </motion.div>

      {/* Expertise Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-20 relative"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="p-6 border border-accent-border rounded-lg bg-background-elevated/50 transition-colors duration-200 group-hover:border-accent-action/50 group-hover:bg-background-elevated">
                <h3 className="text-lg font-medium mb-3 tracking-[-0.01em] group-hover:text-text-primary transition-colors font-mono">
                  <span className="text-text-tertiary opacity-60 mr-2">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-[1.6]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
