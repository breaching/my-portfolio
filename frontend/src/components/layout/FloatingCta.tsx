"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeSimple } from "@phosphor-icons/react";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEnd = document.getElementById("services");
      const contactSection = document.getElementById("contact");

      if (!heroEnd || !contactSection) return;

      const scrollY = window.scrollY + window.innerHeight;
      const pastHero = window.scrollY > heroEnd.offsetTop - 200;
      const reachedContact = scrollY > contactSection.offsetTop + 100;

      setVisible(pastHero && !reachedContact);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const section = document.getElementById("contact");
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-6 left-4 right-4 z-40 md:hidden"
        >
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent-action text-background font-medium rounded-xl shadow-lg shadow-accent-action/25 hover:bg-accent-action-hover transition-colors text-sm btn-primary"
          >
            <EnvelopeSimple size={18} weight="bold" />
            Demander un devis gratuit
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
