"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  EnvelopeSimple,
  ArrowDown,
  Checks,
  Clock,
  CurrencyEur,
  Star,
  MapPin,
  Phone,
  Image,
} from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";
import { FlipWords } from "@/components/ui/FlipWords";
import { NumberTicker } from "@/components/ui/NumberTicker";

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

const flipWords = ["professionnel", "moderne", "rapide", "efficace"];

const stats = [
  {
    icon: CurrencyEur,
    value: 800,
    suffix: " €",
    label: "à partir de",
  },
  {
    icon: Clock,
    value: 10,
    suffix: " jours",
    label: "délai de livraison",
  },
  {
    icon: Checks,
    value: 100,
    suffix: "%",
    label: "responsive & optimisé",
  },
];

const lighthouseScores = [
  { label: "Perf.", value: 98, color: "text-status-success" },
  { label: "A11y", value: 100, color: "text-status-success" },
  { label: "SEO", value: 100, color: "text-status-success" },
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
      <div
        className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"
        aria-hidden="true"
      />
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-light tracking-[-0.03em] mb-6 leading-[1.1]"
            >
              <span className="font-medium">Un site web</span>
              <br />
              <span className="font-medium inline-block min-w-[280px] sm:min-w-[340px]">
                <FlipWords words={flipWords} duration={2800} className="text-accent-action" />
              </span>
              <br />
              pour votre entreprise
              <span className="text-accent-action">.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-text-secondary text-lg md:text-xl leading-[1.65] mb-10 max-w-[540px]"
            >
              Développeur web freelance en Normandie. Je crée des sites vitrines
              sur mesure qui inspirent confiance — et vous amènent des clients.
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
                <span>Demander un devis gratuit</span>
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

          {/* Right — Realistic site mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              delay: 0.4,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow */}
              <div
                className="absolute -inset-4 bg-accent-action/8 rounded-2xl blur-2xl"
                aria-hidden="true"
              />

              {/* Browser frame */}
              <div className="relative rounded-xl border border-accent-border bg-background-elevated/95 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-accent-border bg-background-overlay/60">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-status-error/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-status-warning/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-status-success/50" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-background/60 border border-accent-border text-[10px] text-text-tertiary font-mono">
                      <span className="w-2 h-2 rounded-full bg-status-success/60" />
                      votre-boulangerie.fr
                    </div>
                  </div>
                </div>

                {/* Mini site content */}
                <div className="bg-background/80">
                  {/* Mini navbar */}
                  <div className="flex items-center justify-between px-5 py-2.5 border-b border-accent-border/40">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-accent-action/25" />
                      <span className="text-[10px] font-medium text-text-primary/80">
                        Boulangerie Martin
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] text-text-tertiary">Nos pains</span>
                      <span className="text-[9px] text-text-tertiary">À propos</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-accent-action/20 text-accent-action font-medium">Contact</span>
                    </div>
                  </div>

                  {/* Mini hero */}
                  <div className="px-5 py-4">
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-2">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={isHeroInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="text-[11px] font-semibold text-text-primary leading-tight"
                        >
                          Pain artisanal,
                          <br />
                          <span className="text-accent-action">fait avec passion.</span>
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={isHeroInView ? { opacity: 1 } : {}}
                          transition={{ delay: 1.0, duration: 0.5 }}
                          className="text-[8px] text-text-tertiary leading-relaxed"
                        >
                          Depuis 1987 au coeur de Caen
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 1.2, duration: 0.4 }}
                          className="flex items-center gap-1.5"
                        >
                          <div className="px-2 py-0.5 rounded bg-accent-action/20 text-[8px] text-accent-action font-medium">
                            Commander
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={7} weight="fill" className="text-status-warning" />
                            ))}
                            <span className="text-[7px] text-text-tertiary ml-0.5">4.9</span>
                          </div>
                        </motion.div>
                      </div>
                      {/* Photo placeholder */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isHeroInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="w-24 h-16 rounded-lg bg-gradient-to-br from-amber-800/20 via-amber-700/15 to-amber-600/10 border border-accent-border/40 flex items-center justify-center shrink-0"
                      >
                        <Image size={14} weight="duotone" className="text-text-tertiary/50" alt="" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Mini services row */}
                  <div className="px-5 pb-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: "Pains", icon: "🥖" },
                        { name: "Viennoiseries", icon: "🥐" },
                        { name: "Pâtisseries", icon: "🎂" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 8 }}
                          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            delay: 1.3 + i * 0.1,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="text-center p-2 rounded-md border border-accent-border/30 bg-background-elevated/40"
                        >
                          <span className="text-sm leading-none">{item.icon}</span>
                          <p className="text-[8px] text-text-tertiary mt-1">{item.name}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Mini footer with location */}
                  <div className="px-5 py-2 border-t border-accent-border/30 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPin size={8} className="text-accent-action" />
                      <span className="text-[8px] text-text-tertiary">12 rue Saint-Pierre, Caen</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={8} className="text-text-tertiary" />
                      <span className="text-[8px] text-text-tertiary">02 31 ...</span>
                    </div>
                  </div>
                </div>

                {/* Lighthouse scores bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isHeroInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="px-4 py-2.5 border-t border-accent-border bg-background-overlay/80 flex items-center justify-between"
                >
                  <span className="text-[9px] text-text-tertiary font-mono">
                    Lighthouse
                  </span>
                  <div className="flex items-center gap-3">
                    {lighthouseScores.map((score) => (
                      <div key={score.label} className="flex items-center gap-1.5">
                        <span className="text-[9px] text-text-tertiary">{score.label}</span>
                        <span className={`text-[10px] font-mono font-semibold ${score.color}`}>
                          {score.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row — animated number tickers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
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
                      <NumberTicker
                        value={stat.value}
                        suffix={stat.suffix}
                        delay={0.6}
                      />
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
