"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, ArrowDown, Checks, Clock, CurrencyEur, CaretRight } from "@phosphor-icons/react";
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
    value: "10 jours",
    label: "votre site en ligne",
  },
  {
    icon: Checks,
    value: "2x",
    label: "plus rapide que WordPress",
  },
  {
    icon: CurrencyEur,
    value: "800 €",
    label: "à partir de · tout inclus",
  },
];

const terminalLines = [
  { prompt: true, text: "npx create-next-app votre-site", delay: 0.6 },
  { prompt: false, text: "✓ Projet initialisé", delay: 1.2 },
  { prompt: false, text: "✓ Design sur mesure", delay: 1.6 },
  { prompt: false, text: "✓ SEO optimisé", delay: 2.0 },
  { prompt: false, text: "✓ Déployé sur le web", delay: 2.4 },
  { prompt: true, text: "open votre-site.fr", delay: 3.0 },
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
      {/* Gradient mesh background — plus audacieux */}
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

      <div className="relative z-10 container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <motion.div
            initial="initial"
            animate={isHeroInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            {/* Availability badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent-border bg-background-elevated/80 backdrop-blur-sm text-sm text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
                </span>
                Disponible — Caen & remote
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-light tracking-[-0.03em] mb-6 leading-[1.05]"
            >
              <span className="font-medium">Création de site internet</span>{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient-action font-normal">
                sur mesure
              </span>
              , à Caen
              <span className="text-accent-action">.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-text-secondary text-lg md:text-xl leading-[1.65] mb-10 max-w-[540px]"
            >
              Développeur web freelance en Normandie. Je crée des sites vitrines
              modernes et rapides — pour que vos clients vous trouvent
              sur Google.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="btn-glow inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-all text-base shadow-[0_0_20px_var(--accent-action-glow)]"
              >
                <EnvelopeSimple size={20} weight="bold" />
                <span>Parlons de votre projet</span>
              </a>
              <a
                href="#realisations"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("realisations");
                }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-accent-border text-text-primary font-medium rounded-lg hover:bg-background-elevated hover:border-accent-action/50 hover:text-accent-action transition-all text-base"
              >
                <ArrowDown size={18} weight="bold" />
                <span>Voir mes réalisations</span>
              </a>
            </motion.div>

            {/* Micro-copy sous CTA */}
            <motion.p
              variants={fadeInUp}
              className="text-xs text-text-tertiary"
            >
              Devis gratuit · Réponse sous 24h · Sans engagement
            </motion.p>
          </motion.div>

          {/* Right — Terminal animation */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow effect behind terminal */}
              <div className="absolute -inset-4 bg-accent-action/10 rounded-2xl blur-2xl" aria-hidden="true" />

              {/* Terminal window */}
              <div className="relative rounded-xl border border-accent-border bg-background-elevated/90 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-accent-border bg-background-overlay/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-status-error/60" />
                    <div className="w-3 h-3 rounded-full bg-status-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-status-success/60" />
                  </div>
                  <span className="flex-1 text-center text-xs text-text-tertiary font-mono">
                    terminal — votre-site
                  </span>
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-sm space-y-1.5 min-h-[220px]">
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: line.delay,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center gap-2"
                    >
                      {line.prompt ? (
                        <>
                          <CaretRight size={12} weight="bold" className="text-accent-action shrink-0" />
                          <span className="text-text-primary">{line.text}</span>
                          <motion.span
                            className="w-2 h-4 bg-accent-action/80 inline-block"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                          />
                        </>
                      ) : (
                        <span className="text-status-success/80 pl-4">{line.text}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={fadeInScale}
          initial="initial"
          animate={isHeroInView ? "animate" : "initial"}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-accent-border bg-background-elevated/60 backdrop-blur-sm hover:border-accent-action/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-accent-action-subtle border border-accent-action/20 shrink-0">
                    <Icon
                      size={22}
                      weight="duotone"
                      className="text-accent-action"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-medium text-text-primary font-mono leading-tight">
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
