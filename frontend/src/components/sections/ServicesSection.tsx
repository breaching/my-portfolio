"use client";

import { motion } from "framer-motion";
import { Check, Star } from "@phosphor-icons/react";
import { services } from "@/data/services";

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function scrollToContact(serviceName?: string) {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const offsetTop = contactSection.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });

    // Pre-fill the project type select if possible
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
}

function formatPrice(price: string) {
  // Extract number from "À partir de X €" or return as-is for "Sur devis"
  const match = price.match(/(\d[\d\s]*)\s*€/);
  if (match) {
    const number = match[1].trim();
    return (
      <>
        <span className="text-3xl font-light tracking-tight text-text-primary">
          {number}
        </span>{" "}
        <span className="text-lg text-text-tertiary">€</span>
        <p className="text-xs text-text-tertiary mt-1">À partir de · HT</p>
      </>
    );
  }
  return (
    <span className="text-3xl font-light tracking-tight text-text-primary">
      {price}
    </span>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section border-t border-accent-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">
          Des offres claires, des prix transparents.
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-12">
          Pas de surprise. Vous savez exactement ce que vous obtenez et combien
          ça coûte.
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <motion.div
            key={service.name}
            variants={fadeInUp}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <div
              className={`relative flex flex-col h-full p-6 md:p-8 rounded-lg border transition-all duration-300 ${
                service.popular
                  ? "border-accent-action bg-background-elevated shadow-[0_0_30px_var(--accent-action-glow)] scale-[1.02]"
                  : "border-accent-border bg-background-elevated/50 group-hover:border-accent-action/50"
              }`}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-action text-background text-xs font-medium">
                    <Star size={12} weight="fill" />
                    Populaire
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-medium tracking-[-0.01em] mb-3">
                  {service.name}
                </h3>
                <div>{formatPrice(service.price)}</div>
                <p className="text-sm text-text-secondary mt-3">
                  {service.description}
                </p>
              </div>

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

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact(service.name);
                }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md transition-all text-sm ${
                  service.popular
                    ? "bg-accent-action text-background hover:bg-accent-action-hover btn-primary"
                    : "border border-accent-border text-text-primary hover:border-accent-action hover:text-accent-action"
                }`}
              >
                Demander un devis
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
