"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, ArrowDown, Checks, Clock, CurrencyEur } from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const stats = [
  {
    icon: Clock,
    value: "7-10 jours",
    label: "pour un site vitrine",
  },
  {
    icon: Checks,
    value: "< 2s",
    label: "temps de chargement",
  },
  {
    icon: CurrencyEur,
    value: "800 €",
    label: "à partir de · tout inclus",
  },
];

export function HeroSection() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" });

  return (
    <section
      id="accueil"
      className="relative pt-24 md:pt-32 pb-20 md:pb-28 overflow-hidden"
      ref={heroRef}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 gradient-mesh pointer-events-none"
        aria-hidden="true"
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 grain-overlay pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <motion.div
          initial="initial"
          animate={isHeroInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="prose-width"
        >
          {/* Availability badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent-border bg-background-elevated/80 backdrop-blur-sm text-sm text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
              </span>
              Disponible pour de nouveaux projets
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] mb-6 leading-[1.05]"
          >
            Votre site pro{" "}
            <br className="hidden sm:block" />
            en ligne{" "}
            <span className="text-gradient-action font-normal">
              rapidement
            </span>
            <span className="text-accent-action">.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-text-secondary text-lg md:text-xl leading-[1.65] mb-10 max-w-[540px]"
          >
            Développeur web freelance à Caen. Je crée des sites vitrines
            modernes, rapides et visibles sur Google — pour que vos clients
            vous trouvent.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="btn-glow inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-all text-base"
            >
              <EnvelopeSimple size={20} weight="bold" />
              <span>Demander un devis gratuit</span>
            </a>
            <a
              href="#realisations"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("realisations");
              }}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-accent-border text-text-primary font-medium rounded-lg hover:bg-background-elevated hover:border-text-tertiary transition-all text-base"
            >
              <ArrowDown size={18} weight="bold" />
              <span>Voir mes réalisations</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Stats row — visual punch */}
        <motion.div
          variants={fadeInScale}
          initial="initial"
          animate={isHeroInView ? "animate" : "initial"}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-accent-border bg-background-elevated/60 backdrop-blur-sm hover:border-accent-action/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-action-subtle border border-accent-action/20 shrink-0">
                    <Icon
                      size={20}
                      weight="duotone"
                      className="text-accent-action"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-text-primary stat-number leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm text-text-tertiary leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
