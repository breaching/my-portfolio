"use client";

import { motion } from "framer-motion";
import { Lightning, CurrencyEur, Code, ShieldCheck } from "@phosphor-icons/react";

const differences = [
  {
    icon: Lightning,
    title: "Plus rapide que WordPress",
    description:
      "Votre site charge en moins de 2 secondes. Google favorise les sites rapides dans ses résultats.",
  },
  {
    icon: CurrencyEur,
    title: "Pas d'abonnement mensuel",
    description:
      "Hébergement gratuit inclus. Pas de licence, pas de plugin payant, pas de mauvaise surprise.",
  },
  {
    icon: Code,
    title: "Code sur mesure",
    description:
      "Chaque ligne est écrite pour votre projet. Pas de template générique, pas de constructeur de pages.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurisé par défaut",
    description:
      "Certificat SSL, headers de sécurité, conformité RGPD. Votre site et vos visiteurs sont protégés.",
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
  transition: { duration: 0.5 },
};

export function DifferencesSection() {
  return (
    <section className="section border-t border-accent-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">
          Pourquoi un site sur mesure ?
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-12">
          La différence avec un site WordPress ou un constructeur en ligne.
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 gap-6"
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
              <div className="p-6 rounded-lg border border-accent-border bg-background-elevated/50 transition-colors duration-200 group-hover:border-accent-action/50 h-full">
                <Icon
                  size={24}
                  className="text-accent-action mb-4"
                  weight="duotone"
                />
                <h3 className="text-base font-medium mb-2 tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-[1.6]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
