"use client";

import { motion } from "framer-motion";
import {
  ChatCircle,
  FileText,
  Code,
  Rocket,
  ArrowRight,
} from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";

const steps = [
  {
    icon: ChatCircle,
    number: "01",
    title: "Échange",
    description:
      "Appel ou RDV de 30 min pour comprendre votre besoin, vos objectifs et votre cible.",
    detail: "Gratuit · Sans engagement",
  },
  {
    icon: FileText,
    number: "02",
    title: "Proposition",
    description:
      "Devis détaillé sous 48h avec maquette, planning et conditions claires.",
    detail: "Devis sous 48h",
  },
  {
    icon: Code,
    number: "03",
    title: "Développement",
    description:
      "Vous suivez l'avancement en temps réel. Retours illimités pendant le développement.",
    detail: "Suivi en temps réel",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Livraison",
    description:
      "Votre site est en ligne. Formation à l'utilisation et accompagnement post-livraison.",
    detail: "Formation incluse",
  },
];

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-heading" className="section border-t border-accent-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent-action text-sm font-medium font-mono mb-3 tracking-wide uppercase">
          Processus
        </p>
        <h2 id="process-heading" className="text-3xl md:text-4xl font-light tracking-[-0.02em] mb-4">
          Comment ça se passe ?{" "}
          <span className="font-medium">4 étapes simples.</span>
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-14">
          Un process simple en 4 étapes. Vous êtes informé à chaque moment.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connector line — desktop only */}
        <div className="hidden lg:block absolute left-[23px] top-8 bottom-8 w-px bg-gradient-to-b from-accent-action/40 via-accent-action/20 to-transparent" />

        <div className="grid gap-4 lg:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative lg:pl-16 lg:pb-10 last:pb-0"
              >
                {/* Timeline dot — desktop */}
                <div className="hidden lg:flex absolute left-0 top-6 w-[47px] h-[47px] items-center justify-center">
                  <div className="w-[47px] h-[47px] rounded-full border-2 border-accent-action/40 bg-background flex items-center justify-center">
                    <Icon
                      size={20}
                      weight="duotone"
                      className="text-accent-action"
                    />
                  </div>
                </div>

                <div className="group p-6 md:p-7 rounded-xl border border-accent-border bg-background-elevated/50 hover:border-accent-action/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* Mobile icon */}
                    <div className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-accent-action-subtle border border-accent-action/20 shrink-0">
                      <Icon
                        size={20}
                        weight="duotone"
                        className="text-accent-action"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-accent-action/60">
                          {step.number}
                        </span>
                        <h3 className="text-lg font-medium tracking-[-0.01em]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm leading-[1.65] mb-2">
                        {step.description}
                      </p>
                      <p className="text-xs text-accent-action/70 font-medium">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA after process */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 text-center"
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="btn-glow inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-all text-sm"
        >
          <span>Prêt à démarrer ? Étape 1 : votre devis gratuit</span>
          <ArrowRight size={16} weight="bold" />
        </a>
      </motion.div>
    </section>
  );
}
