"use client";

import { motion } from "framer-motion";
import { Receipt, CurrencyEur, ArrowsClockwise, FileCode } from "@phosphor-icons/react";

const garanties = [
  {
    icon: Receipt,
    title: "Devis gratuit sous 48h",
    description: "Détaillé, clair, sans engagement. Vous savez exactement ce que vous payez.",
  },
  {
    icon: CurrencyEur,
    title: "Paiement en 2 fois",
    description: "50 % à la commande, 50 % à la livraison. Pas de mauvaise surprise.",
  },
  {
    icon: ArrowsClockwise,
    title: "Modifications illimitées",
    description: "Pendant le développement, vos retours sont intégrés sans surcoût.",
  },
  {
    icon: FileCode,
    title: "Code source livré",
    description: "Vous êtes propriétaire de votre site. Pas de dépendance, pas de lock-in.",
  },
];

export function GarantiesSection() {
  return (
    <section className="py-12 md:py-16 border-t border-accent-border">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {garanties.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-start gap-3.5 p-5 rounded-xl border border-accent-border bg-background-elevated/50"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-action-subtle border border-accent-action/20 shrink-0">
                  <Icon size={20} weight="duotone" className="text-accent-action" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-text-tertiary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
