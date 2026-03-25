"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  Check,
  CaretDown,
} from "@phosphor-icons/react";
import { submitContactForm } from "@/lib/api";
import { validateContactInput } from "@/lib/security";
import type { ContactFormData, FormStatus } from "@/types";

const contactLinks = [
  {
    label: "Email",
    value: "contact@dubus.pro",
    href: "mailto:contact@dubus.pro",
    icon: EnvelopeSimple,
  },
  {
    label: "GitHub",
    value: "@breaching",
    href: "https://github.com/breaching",
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    value: "Alexis Dubus",
    href: "https://www.linkedin.com/in/alexis-dubus-603590284/",
    icon: LinkedinLogo,
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormError(null);

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      // Silently "succeed" to not reveal the trap
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setProjectType("");
      setBudget("");
      return;
    }

    // Build subject from project type + budget
    const autoSubject = [
      projectType ? `[${projectType}]` : null,
      budget ? `Budget: ${budget}` : null,
      "Demande de devis",
    ]
      .filter(Boolean)
      .join(" — ");

    const dataWithSubject = { ...formData, subject: autoSubject };

    // Validate and sanitize input
    const validation = validateContactInput(dataWithSubject);
    if (!validation.valid) {
      setFormStatus("error");
      setFormError(validation.errors.join(". "));
      return;
    }

    try {
      await submitContactForm(validation.sanitized!);
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setProjectType("");
      setBudget("");
    } catch (error) {
      setFormStatus("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  return (
    <section id="contact" className="section border-t border-accent-border">
      <motion.div {...fadeIn}>
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">
          Un projet en tête ?
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-12">
          Décrivez-le en quelques mots, je vous réponds sous
          24h avec une première estimation.
        </p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="space-y-6">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 group"
                  >
                    <Icon
                      size={20}
                      className="text-text-tertiary group-hover:text-accent-action transition-colors"
                    />
                    <div>
                      <p className="text-sm text-text-tertiary font-mono">
                        {link.label}
                      </p>
                      <p className="text-text-secondary group-hover:text-text-primary transition-colors font-medium">
                        {link.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-10 pt-10 border-t border-accent-border">
              <p className="text-sm text-text-tertiary mb-2">Disponibilité</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
                </span>
                <span className="text-sm text-text-secondary">
                  Disponible — réponse sous 24h
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Honeypot field - hidden from humans, visible to bots */}
            <div
              className="absolute -left-[9999px] opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="website_url">Website</label>
              <input
                type="text"
                id="website_url"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm text-text-secondary mb-2"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-action transition-colors"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-text-secondary mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-action transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="project_type"
                  className="block text-sm text-text-secondary mb-2"
                >
                  Type de projet
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-lg text-text-primary text-sm appearance-none cursor-pointer focus:outline-none focus:border-accent-action transition-colors pr-10"
                >
                  <option value="">Choisir (optionnel)</option>
                  <option value="site-essentiel">Site Essentiel</option>
                  <option value="site-pro">Site Pro</option>
                  <option value="sur-mesure">Sur mesure</option>
                  <option value="autre">Autre</option>
                </select>
                <CaretDown
                  size={16}
                  className="absolute right-4 top-[42px] text-text-tertiary pointer-events-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="budget"
                  className="block text-sm text-text-secondary mb-2"
                >
                  Budget estimé
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-lg text-text-primary text-sm appearance-none cursor-pointer focus:outline-none focus:border-accent-action transition-colors pr-10"
                >
                  <option value="">Choisir (optionnel)</option>
                  <option value="< 800 €">Moins de 800 €</option>
                  <option value="800 - 1500 €">800 — 1 500 €</option>
                  <option value="1500 - 3000 €">1 500 — 3 000 €</option>
                  <option value="> 3000 €">Plus de 3 000 €</option>
                </select>
                <CaretDown
                  size={16}
                  className="absolute right-4 top-[42px] text-text-tertiary pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-text-secondary mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-action transition-colors resize-none"
                placeholder="Décrivez votre projet ou votre demande..."
              />
            </div>

            {/* Form status - ARIA live region for screen readers */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {formStatus === "loading" && "Envoi du message en cours..."}
              {formStatus === "success" && "Message envoyé avec succès !"}
              {formStatus === "error" && `Erreur : ${formError}`}
            </div>

            {/* Error message */}
            {formStatus === "error" && formError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                role="alert"
              >
                {formError}
              </motion.div>
            )}

            {/* Success message */}
            {formStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                role="status"
              >
                Message envoyé avec succès ! Je vous répondrai sous 24h.
              </motion.div>
            )}

            {/* Submit button - full width, accent-action */}
            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="w-full py-4 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {formStatus === "loading" ? (
                "Envoi..."
              ) : formStatus === "success" ? (
                <>
                  <Check size={18} weight="bold" />
                  Envoyé
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={18} />
                  Envoyer ma demande
                </>
              )}
            </button>

            {/* Reassurance */}
            <p className="text-xs text-text-tertiary text-center">
              Réponse sous 24h · Devis gratuit · Sans engagement
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
