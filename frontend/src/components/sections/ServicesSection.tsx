"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Timer } from "@phosphor-icons/react";
import { services } from "@/data/services";
import { scrollToSection } from "@/lib/scroll";

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

function scrollToContact(serviceName?: string) {
  scrollToSection("contact");

  if (serviceName) {
    setTimeout(() => {
      const select = document.getElementById(
        "project_type"
      ) as HTMLSelectElement | null;
      if (select) {
        const valueMap: Record<string, string> = {
          "Site Essentiel": "site-essentiel",
          "Site Pro": "site-pro",
          "Sur-Mesure": "sur-mesure",
        };
        const value = valueMap[serviceName];
        if (value) {
          select.value = value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }, 500);
  }
}

function formatPrice(price: string) {
  // Handle range like "800 — 1 200 €"
  const rangeMatch = price.match(/(\d[\d\s]*)\s*—\s*(\d[\d\s]*)\s*€/);
  if (rangeMatch) {
    const from = rangeMatch[1].trim();
    const to = rangeMatch[2].trim();
    return (
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary font-mono">
          {from} — {to}
        </span>
        <span className="text-lg text-text-tertiary font-light">€</span>
      </div>
    );
  }
  // Handle single price like "À partir de 800 €"
  const match = price.match(/(\d[\d\s]*)\s*€/);
  if (match) {
    const number = match[1].trim();
    return (
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary font-mono">
          {number}
        </span>
        <span className="text-lg text-text-tertiary font-light">€</span>
      </div>
    );
  }
  return (
    <span className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary">
      {price}
    </span>
  );
}

function getDelivery(name: string) {
  const map: Record<string, string> = {
    "Site Essentiel": "7-10 jours",
    "Site Pro": "2-3 semaines",
    "Sur-Mesure": "Selon projet",
  };
  return map[name] || "";
}

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="section border-t border-accent-border">
      <div className="container-main">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent-action text-sm font-medium font-mono mb-3 tracking-wide uppercase">
          Offres & tarifs
        </p>
        <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] mb-3 sm:mb-4">
          Création de site vitrine à Caen —{" "}
          <span className="font-medium">prix transparents.</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary prose-width leading-relaxed mb-4">
          Vous savez exactement ce que vous obtenez et combien ça coûte.
          Paiement en 2 fois, devis gratuit.
        </p>
        <p className="text-xs text-text-tertiary prose-width leading-relaxed mb-8 sm:mb-14">
          Une agence web facture en moyenne 3 000 à 8 000 € pour un site vitrine.
          Je propose la même qualité technique, sans les frais d&apos;agence.
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-4 md:gap-6"
      >
        {services.map((service) => (
          <motion.div
            key={service.name}
            variants={fadeInUp}
            viewport={{ once: true }}
            className="group"
          >
            <div
              className={`relative flex flex-col h-full rounded-xl border transition-all duration-300 overflow-hidden ${
                service.popular
                  ? "border-accent-action/60 bg-gradient-to-b from-accent-action-subtle to-background-elevated ring-1 ring-accent-action/30 shadow-[0_0_60px_var(--accent-action-glow),0_20px_60px_-20px_rgba(99,102,241,0.15)] md:scale-[1.05]"
                  : "border-accent-border bg-background-elevated/50 hover:border-accent-action/30 hover:shadow-[0_8px_30px_-10px_rgba(129,140,248,0.08)]"
              }`}
            >
              {/* Popular banner */}
              {service.popular && (
                <div className="bg-accent-action px-4 py-2 flex items-center justify-center gap-1.5">
                  <Star size={14} weight="fill" className="text-background" />
                  <span className="text-background text-xs font-semibold tracking-wide uppercase">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="p-5 sm:p-7 md:p-8 flex flex-col h-full">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-medium tracking-[-0.01em] mb-4">
                    {service.name}
                  </h3>
                  <div className="mb-2">
                    {formatPrice(service.price)}
                    {service.price !== "Sur devis" && (
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-text-tertiary">
                          TVA non applicable — vous payez exactement ce montant
                        </p>
                        <p className="text-xs text-accent-action/70 font-medium">
                          Payable en 2 fois
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Delivery time */}
                <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-background-overlay/60 border border-accent-border">
                  <Timer
                    size={16}
                    weight="duotone"
                    className="text-accent-action shrink-0"
                  />
                  <span className="text-sm text-text-secondary">
                    Livraison :{" "}
                    <span className="text-text-primary font-medium">
                      {getDelivery(service.name)}
                    </span>
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <Check
                        size={16}
                        weight="bold"
                        className="text-status-success mt-0.5 shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContact(service.name);
                  }}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 font-medium rounded-lg transition-all text-sm group/btn ${
                    service.popular
                      ? "bg-accent-action text-background hover:bg-accent-action-hover btn-glow"
                      : "border border-accent-border text-text-primary hover:border-accent-action hover:text-accent-action"
                  }`}
                >
                  <span>Demander un devis</span>
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
