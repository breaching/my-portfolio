import { GithubLogo, LinkedinLogo, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/breaching", icon: GithubLogo, label: "GitHub" },
  { href: "https://www.linkedin.com/in/alexis-dubus-603590284/", icon: LinkedinLogo, label: "LinkedIn" },
  { href: "https://tryhackme.com/p/bremusic", icon: ShieldCheck, label: "TryHackMe" },
];

const siteLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/parcours", label: "Parcours" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export function Footer() {
  return (
    <footer className="border-t border-accent-border">
      <div className="container-main py-10">
        <div className="flex flex-col gap-8">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left - Name and email */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-text-primary hover:text-accent-action transition-colors duration-200 tracking-[-0.01em]"
              >
                Alexis Dubus
              </Link>
              <span className="hidden sm:block text-text-tertiary text-xs">·</span>
              <a
                href="mailto:contact@dubus.pro"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 font-mono"
              >
                contact@dubus.pro
              </a>
            </div>

            {/* Right - Social */}
            <div className="flex items-center gap-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-text-primary transition-all duration-200 hover:-translate-y-0.5"
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Site links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2">
            {siteLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom — legal + SEO */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-accent-border">
            <p className="text-xs text-text-tertiary">
              Développeur web freelance à Caen — Sites vitrines et applications web
            </p>
            <p className="text-xs text-text-tertiary font-mono">
              SIREN 101 749 216 · EI · TVA non applicable
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
