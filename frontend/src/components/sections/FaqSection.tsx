"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, ArrowRight } from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";

const faqs = [
  {
    question: "Je n'y connais rien en technique, c'est un problème ?",
    answer:
      "Pas du tout. Je m'occupe de tout — du design au déploiement. Vous n'avez besoin d'aucune compétence technique. Je vous explique chaque étape simplement et vous validez à chaque avancement.",
  },
  {
    question: "Combien coûte la création d'un site vitrine à Caen ?",
    answer:
      "Un site vitrine one-page démarre à 800 €, un site multi-pages à 1 500 €. C'est 3 à 5 fois moins qu'une agence web (3 000 — 8 000 € en moyenne) pour la même qualité technique. TVA non applicable, vous payez exactement ce montant.",
  },
  {
    question: "Et si le résultat ne me plaît pas ?",
    answer:
      "Vous suivez l'avancement en temps réel et donnez vos retours à chaque étape. Les modifications sont illimitées pendant le développement. Vous ne payez le solde qu'à la livraison, une fois satisfait.",
  },
  {
    question: "Pourquoi pas WordPress ou Wix ?",
    answer:
      "Ces outils sont pratiques mais génèrent des sites plus lents, moins sécurisés et dépendants d'abonnements mensuels. Un site codé sur mesure est plus rapide (meilleur référencement Google), plus sécurisé, et vous en êtes propriétaire — pas de frais cachés.",
  },
  {
    question: "Comment garantissez-vous la qualité ?",
    answer:
      "Mon projet Clarmind (186 tests, paiement Stripe, conformité RGPD) prouve ma capacité à livrer des produits complets en production. Transparence totale : prix affichés, suivi en temps réel, code source livré, et vous ne payez le solde qu'à la livraison.",
  },
  {
    question: "Mon site sera-t-il visible sur Google ?",
    answer:
      "Oui. Chaque site est optimisé pour le référencement dès sa conception : structure technique propre, temps de chargement rapide, balises optimisées. C'est inclus dans toutes les offres.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section border-t border-accent-border">
      <div className="container-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent-action text-sm font-medium font-mono mb-3 tracking-wide uppercase">
          FAQ
        </p>
        <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] mb-3 sm:mb-4">
          Questions fréquentes
        </h2>
        <p className="text-sm sm:text-base text-text-secondary prose-width leading-relaxed mb-8 sm:mb-14">
          Les réponses aux questions que vous vous posez sûrement.
        </p>
      </motion.div>

      <div className="max-w-[800px] space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="border border-accent-border rounded-lg overflow-hidden hover:border-accent-action/20 transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-background-elevated/60 transition-all duration-200"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-text-primary leading-snug">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-text-tertiary"
                >
                  <CaretDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm text-text-secondary leading-[1.7]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* CTA after FAQ */}
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
            scrollToSection("contact");
          }}
          className="group/link inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-action transition-colors"
        >
          Une question ? Je réponds sous 24h
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
