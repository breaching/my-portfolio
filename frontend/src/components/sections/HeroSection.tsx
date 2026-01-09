"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, Terminal } from "@phosphor-icons/react";
import { getYearsOfExperience } from "@/lib/utils";
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

function useTypingEffect(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayText, text, speed]);

  return { displayText, isComplete };
}

export function HeroSection() {
  const age = getYearsOfExperience();
  const [hasAnimated, setHasAnimated] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  const subtitle = "Systèmes, Web & Sécurité";
  const { displayText: typedSubtitle, isComplete } = useTypingEffect(subtitle, 80);

  useEffect(() => {
    if (isHeroInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isHeroInView, hasAnimated]);

  return (
    <section id="accueil" className="section pt-24 md:pt-32" ref={heroRef}>
      <motion.div
        initial="initial"
        animate={hasAnimated ? "animate" : "initial"}
        variants={staggerContainer}
        className="prose-width"
      >
        {/* Terminal-style prompt */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-2 mb-8 text-text-tertiary font-mono text-sm"
        >
          <Terminal size={16} weight="bold" />
          <span className="opacity-60">~/portfolio</span>
          <span className="text-status-success">$</span>
          <span className="opacity-60">cat about.txt</span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-light tracking-[-0.02em] mb-6 leading-[1.1]"
        >
          Alexis Dubus
        </motion.h1>

        <motion.div
          variants={fadeInUp}
          className="text-xl md:text-2xl text-text-secondary font-light mb-8 leading-[1.4] tracking-[-0.01em] font-mono"
        >
          <span className="text-accent-primary">{">"}</span> {typedSubtitle}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-accent-primary ml-1 align-middle"
            />
          )}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-text-secondary leading-[1.7] mb-10 max-w-[600px]"
        >
          {age} ans, autodidacte. Je construis des systèmes complets —
          infrastructure, sites web, pipelines de données — avec une approche
          problem-solving et une sensibilité forte à la performance et la
          sécurité. Disponible pour des projets de développement web.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-background font-medium rounded-md hover:bg-accent-hover transition-all"
          >
            <EnvelopeSimple size={18} weight="bold" />
            <span>Me contacter</span>
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
