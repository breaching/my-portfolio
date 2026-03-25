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
  ChatCircle,
  Clock,
  ShieldCheck,
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

const reassurances = [
  { icon: ChatCircle, text: "Réponse sous 24h" },
  { icon: Clock, text: "Devis gratuit" },
  { icon: ShieldCheck, text: "Sans engagement" },
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

    if (honeypot) {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setProjectType("");
      setBudget("");
      return;
    }

    const autoSubject = [
      projectType ? `[${projectType}]` : null,
      budget ? `Budget: ${budget}` : null,
      "Demande de devis",
    ]
      .filter(Boolean)
      .join(" — ");

    const dataWithSubject = { ...formData, subject: autoSubject };

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
    <section id="contact" aria-labelledby="contact-heading" className="section section-accent border-t border-accent-border">
      <div className="relative z-10 container-main">
        <motion.div {...fadeIn}>
          <p className="text-accent-action text-sm font-medium font-mono mb-3 tracking-wide uppercase">
            Contact
          </p>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-light tracking-[-0.02em] mb-4">
            Un projet web à Caen ?{" "}
            <span className="font-medium">Parlons-en.</span>
          </h2>
          <p className="text-text-secondary prose-width leading-relaxed mb-14">
            Décrivez votre projet en quelques mots — création de site vitrine, refonte
            ou application web. Je vous réponds sous 24h avec une première estimation.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              {/* Reassurance badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {reassurances.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.text}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-border bg-background-elevated/60 text-sm text-text-secondary"
                    >
                      <Icon
                        size={14}
                        weight="duotone"
                        className="text-accent-action"
                      />
                      {item.text}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-5">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 group p-3 -mx-3 rounded-lg hover:bg-background-elevated/50 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-background-elevated border border-accent-border group-hover:border-accent-action/40 transition-colors shrink-0">
                        <Icon
                          size={18}
                          className="text-text-tertiary group-hover:text-accent-action transition-colors"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-text-tertiary font-mono uppercase tracking-wider">
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

              <div className="mt-8 pt-8 border-t border-accent-border">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-status-success" />
                  </span>
                  <span className="text-sm text-text-secondary">
                    Disponible — réponse sous 24h
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Honeypot */}
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
                  className="block text-sm text-text-secondary mb-2 font-medium"
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
                  className="block text-sm text-text-secondary mb-2 font-medium"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    htmlFor="project_type"
                    className="block text-sm text-text-secondary mb-2 font-medium"
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
                    className="block text-sm text-text-secondary mb-2 font-medium"
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
                  className="block text-sm text-text-secondary mb-2 font-medium"
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
                  placeholder="Ex : Je suis boulanger à Caen et j'aimerais un site pour présenter mes produits et horaires..."
                />
              </div>

              {/* ARIA live region */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                {formStatus === "loading" && "Envoi du message en cours..."}
                {formStatus === "success" && "Message envoyé avec succès !"}
                {formStatus === "error" && `Erreur : ${formError}`}
              </div>

              {formStatus === "error" && formError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-status-error/10 border border-status-error/30 text-status-error text-sm"
                  role="alert"
                >
                  {formError}
                </motion.div>
              )}

              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-status-success/10 border border-status-success/30 text-status-success text-sm"
                  role="status"
                >
                  Message envoyé avec succès ! Je vous répondrai sous 24h.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="btn-glow w-full py-4 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
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
                    Envoyer — réponse sous 24h
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
