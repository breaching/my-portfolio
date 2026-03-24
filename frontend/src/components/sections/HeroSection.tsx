"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, ArrowDown } from "@phosphor-icons/react";
import { expertise } from "@/data/posts";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}

export function HeroSection() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <section id="accueil" className="section pt-24 md:pt-32" ref={heroRef}>
      <motion.div
        initial="initial"
        animate={isHeroInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="prose-width"
      >
        {/* Availability badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-border bg-background-elevated text-sm text-text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
            </span>
            Disponible pour de nouveaux projets
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-light tracking-[-0.02em] mb-6 leading-[1.1]"
        >
          Je crée des sites web qui convertissent.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-text-secondary text-lg md:text-xl leading-[1.6] mb-10 max-w-[600px]"
        >
          Développeur web freelance à Caen. Sites vitrines modernes, rapides, et
          optimisés pour Google. De l&apos;idée au site en ligne en 2 semaines.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-background font-medium rounded-md hover:bg-accent-hover transition-all"
          >
            <EnvelopeSimple size={18} weight="bold" />
            <span>Demander un devis gratuit</span>
          </a>
          <a
            href="#realisations"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("realisations");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent-primary text-accent-primary font-medium rounded-md hover:bg-accent-primary hover:text-background transition-all"
          >
            <ArrowDown size={18} weight="bold" />
            <span>Voir mes réalisations</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Expertise Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-20"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="p-6 border border-accent-border rounded-lg bg-background-elevated/50 transition-colors duration-200 group-hover:border-text-tertiary/50 group-hover:bg-background-elevated">
                <h3 className="text-lg font-medium mb-3 tracking-[-0.01em] group-hover:text-text-primary transition-colors font-mono">
                  <span className="text-text-tertiary opacity-60 mr-2">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-[1.6]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
