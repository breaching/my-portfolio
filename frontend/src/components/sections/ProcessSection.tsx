"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    title: "Échange",
    description:
      "Appel ou RDV de 30 min pour comprendre votre besoin, vos objectifs et votre cible.",
  },
  {
    number: "02",
    title: "Proposition",
    description:
      "Devis détaillé sous 48h avec maquette, planning et conditions claires.",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Vous suivez l'avancement en temps réel. Retours illimités pendant le développement.",
  },
  {
    number: "04",
    title: "Livraison",
    description:
      "Votre site est en ligne. Formation à l'utilisation et accompagnement post-livraison.",
  },
];

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function ProcessSection() {
  return (
    <section id="process" className="section border-t border-accent-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">
          Comment ça se passe ?
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-12">
          Un process simple en 4 étapes. Vous êtes informé à chaque moment.
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={fadeInUp}
            viewport={{ once: true }}
            className="group"
          >
            <div className="p-6 rounded-lg border border-accent-border bg-background-elevated/50 transition-colors duration-200 group-hover:border-text-tertiary/50 group-hover:bg-background-elevated h-full">
              <span className="text-text-tertiary opacity-60 font-mono text-sm mb-4 block">
                [{step.number}]
              </span>
              <h3 className="text-lg font-medium mb-3 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-[1.6]">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Payment info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="p-6 rounded-lg border border-accent-border bg-background-elevated/30"
      >
        <div className="flex items-start gap-3">
          <Lightbulb
            size={20}
            weight="fill"
            className="text-status-warning mt-0.5 shrink-0"
          />
          <p className="text-sm text-text-secondary leading-[1.6]">
            <span className="text-text-primary font-medium">
              Paiement en 2 fois
            </span>{" "}
            : 50% à la commande, 50% à la livraison. Satisfait ou on ajuste.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
