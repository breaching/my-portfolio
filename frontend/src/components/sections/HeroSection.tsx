"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  EnvelopeSimple,
  ArrowDown,
  Checks,
  Clock,
  CurrencyEur,
  DeviceMobile,
  MagnifyingGlass,
  Gauge,
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

const mockupFeatures = [
  {
    icon: DeviceMobile,
    title: "Responsive",
    desc: "Parfait sur mobile, tablette et desktop",
  },
  {
    icon: MagnifyingGlass,
    title: "SEO optimisé",
    desc: "Visible sur Google dès la mise en ligne",
  },
  {
    icon: Gauge,
    title: "Ultra rapide",
    desc: "Score 95+ sur Google PageSpeed",
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

          {/* Right — What you get (replaces terminal) */}
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
              {/* Glow effect */}
              <div
                className="absolute -inset-4 bg-accent-action/8 rounded-2xl blur-2xl"
                aria-hidden="true"
              />

              {/* Browser mockup */}
              <div className="relative rounded-xl border border-accent-border bg-background-elevated/90 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-accent-border bg-background-overlay/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-status-error/60" />
                    <div className="w-3 h-3 rounded-full bg-status-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-status-success/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-background/60 border border-accent-border text-xs text-text-tertiary font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-status-success/60" />
                      votre-entreprise.fr
                    </div>
                  </div>
                </div>

                {/* Mockup content — what the client gets */}
                <div className="p-6 space-y-5">
                  {/* Simulated hero area */}
                  <div className="space-y-3">
                    <div className="h-3 w-3/4 rounded-full bg-text-primary/15 animate-pulse" />
                    <div className="h-3 w-1/2 rounded-full bg-text-primary/10 animate-pulse" />
                    <div className="h-9 w-40 rounded-lg bg-accent-action/20 mt-4" />
                  </div>

                  {/* Simulated content blocks */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-accent-border/60 bg-background/40 p-3 space-y-2"
                      >
                        <div className="w-8 h-8 rounded-md bg-accent-action/15" />
                        <div className="h-2 w-full rounded-full bg-text-primary/10" />
                        <div className="h-2 w-2/3 rounded-full bg-text-primary/6" />
                      </div>
                    ))}
                  </div>

                  {/* Feature badges */}
                  <div className="space-y-2.5 pt-2">
                    {mockupFeatures.map((feature, i) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: -12 }}
                          animate={
                            isHeroInView ? { opacity: 1, x: 0 } : {}
                          }
                          transition={{
                            delay: 0.8 + i * 0.15,
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-background/50 border border-accent-border/40"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-action-subtle border border-accent-action/20 shrink-0">
                            <Icon
                              size={16}
                              weight="duotone"
                              className="text-accent-action"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary leading-tight">
                              {feature.title}
                            </p>
                            <p className="text-xs text-text-tertiary leading-tight">
                              {feature.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
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
