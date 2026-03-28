import { GithubLogo, LinkedinLogo, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/breaching", icon: GithubLogo, label: "GitHub" },
  { href: "https://www.linkedin.com/in/alexis-dubus-603590284/", icon: LinkedinLogo, label: "LinkedIn" },
  { href: "https://tryhackme.com/p/670", icon: ShieldCheck, label: "TryHackMe" },
];

const navLinks = [
  { href: "/#services", label: "Tarifs" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#process", label: "Processus" },
  { href: "/#faq", label: "FAQ" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/parcours", label: "Parcours" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export function Footer() {
  return (
    <footer className="border-t-0 mt-8">
      <div className="container-main pt-10 sm:pt-16 pb-8 sm:pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 mb-10 sm:mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-base font-medium text-text-primary hover:text-accent-action transition-colors duration-200 tracking-[-0.01em]"
            >
              Alexis Dubus
            </Link>
            <p className="text-sm text-text-tertiary mt-2 leading-relaxed max-w-[260px]">
              Développeur web freelance à Caen.
              Sites vitrines et applications web sur mesure.
            </p>
            <a
              href="mailto:contact@dubus.pro"
              className="inline-block text-sm text-text-secondary hover:text-accent-action transition-colors duration-200 font-mono mt-4"
            >
              contact@dubus.pro
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-4">
              Ressources
            </p>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Recruiter */}
          <div>
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-4">
              Retrouvez-moi
            </p>
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-accent-border bg-background-elevated/50 text-text-tertiary hover:text-accent-action hover:border-accent-action/40 transition-all duration-200"
                    aria-label={link.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <Link
              href="/parcours"
              className="text-sm text-text-tertiary hover:text-accent-action transition-colors duration-200"
            >
              Vous recrutez ? Voir mon parcours →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-10 mt-2">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Alexis Dubus — Développeur web freelance à Caen
          </p>
          <p className="text-xs text-text-tertiary font-mono">
            SIREN 101 749 216 · EI · TVA non applicable
          </p>
        </div>
      </div>
    </footer>
  );
}
