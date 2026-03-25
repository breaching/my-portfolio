"use client";

import { motion } from "framer-motion";
import {
  Lightning,
  CurrencyEur,
  Code,
  ShieldCheck,
  ArrowRight,
} from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";

const differences = [
  {
    icon: Lightning,
    title: "2x plus rapide",
    subtitle: "que WordPress",
    description:
      "Votre site charge en moins de 2 secondes. Google favorise les sites rapides — meilleur référencement, plus de clients.",
    metric: "< 2s",
    metricLabel: "chargement",
  },
  {
    icon: CurrencyEur,
    title: "0 € / mois",
    subtitle: "d'abonnement",
    description:
      "Hébergement gratuit inclus. Pas de licence WordPress, pas de plugins payants, pas de frais mensuels cachés.",
    metric: "0 €",
    metricLabel: "frais récurrents",
  },
  {
    icon: Code,
    title: "100 % sur mesure",
    subtitle: "pas de template",
    description:
      "Chaque ligne est écrite pour votre projet. Pas de constructeur de pages, pas de thème générique partagé par 10 000 sites.",
    metric: "100%",
    metricLabel: "code dédié",
  },
  {
    icon: ShieldCheck,
    title: "Sécurisé",
    subtitle: "par défaut",
    description:
      "Certificat SSL, en-têtes de sécurité, conformité RGPD. Votre site et vos visiteurs sont protégés dès le premier jour.",
    metric: "A+",
    metricLabel: "score sécurité",
  },
];

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

function scrollToContact() {
  scrollToSection("contact");
}

export function DifferencesSection() {
  return (
    <section aria-labelledby="differences-heading" className="section section-accent border-t border-accent-border">
      <div className="relative z-10 container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent-action text-sm font-medium font-mono mb-3 tracking-wide uppercase">
            Pourquoi du sur-mesure
          </p>
          <h2 id="differences-heading" className="text-3xl md:text-4xl font-light tracking-[-0.02em] mb-4">
            Un site internet professionnel,{" "}
            <span className="font-medium">pas un template.</span>
          </h2>
          <p className="text-text-secondary prose-width leading-relaxed mb-14">
            La différence entre un site sur mesure et WordPress ou Wix — voici ce
            que ça change concrètement pour votre activité à Caen et en Normandie.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-5"
        >
          {differences.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-6 md:p-7 rounded-xl border border-accent-border bg-background-elevated/50 backdrop-blur-sm transition-all duration-300 group-hover:border-accent-action/40 group-hover:bg-background-elevated h-full">
                  {/* Metric badge */}
                  <div className="absolute top-6 right-6">
                    <div className="text-right">
                      <p className="text-2xl font-light text-accent-action stat-number leading-none">
                        {item.metric}
                      </p>
                      <p className="text-xs text-text-tertiary mt-0.5">
                        {item.metricLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-action-subtle border border-accent-action/20 mb-5">
                    <Icon
                      size={24}
                      className="text-accent-action"
                      weight="duotone"
                    />
                  </div>

                  <h3 className="text-lg font-medium mb-0.5 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-tertiary mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-text-secondary text-sm leading-[1.65] max-w-[320px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="group/link inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-action transition-colors"
          >
            Envie d&apos;en savoir plus ? Discutons de votre projet
            <ArrowRight
              size={16}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
