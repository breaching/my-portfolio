"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  GithubLogo,
  PaperPlaneTilt,
  Check,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
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
      return;
    }

    // Validate and sanitize input
    const validation = validateContactInput(formData);
    if (!validation.valid) {
      setFormStatus("error");
      setFormError(validation.errors.join(". "));
      return;
    }

    try {
      await submitContactForm(validation.sanitized!);
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
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
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">Contact</h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-12">
          Disponible pour des opportunités de stage, d&apos;alternance, ou pour
          la réalisation de sites web et projets techniques.
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
                      className="text-text-tertiary group-hover:text-accent-primary transition-colors"
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
                  Disponible pour de nouvelles opportunités
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Honeypot field - hidden from humans, visible to bots */}
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
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
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors"
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
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm text-text-secondary mb-2"
              >
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                required
                minLength={5}
                maxLength={200}
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors"
                placeholder="Objet de votre message"
              />
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
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors resize-none"
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
                className="p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
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
                className="p-4 rounded-md bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                role="status"
              >
                Message envoyé avec succès ! Je vous répondrai rapidement.
              </motion.div>
            )}

            <Button
              type="submit"
              size="lg"
              loading={formStatus === "loading"}
              loadingText="Envoi..."
            >
              {formStatus === "success" ? (
                <>
                  <Check size={18} weight="bold" />
                  Envoyé
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={18} />
                  Envoyer
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
