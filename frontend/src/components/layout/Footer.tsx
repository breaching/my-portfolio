import { GithubLogo, LinkedinLogo, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/breaching", icon: GithubLogo, label: "GitHub" },
  { href: "https://www.linkedin.com/in/alexis-dubus-music/", icon: LinkedinLogo, label: "LinkedIn" },
  { href: "https://tryhackme.com/p/bremusic", icon: ShieldCheck, label: "TryHackMe" },
];

const internalLinks = [
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/parcours", label: "Parcours" },
];

export function Footer() {
  return (
    <footer className="border-t border-accent-border">
      <div className="container-main py-10">
        <div className="flex flex-col gap-6">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left - Name and email */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 tracking-[-0.01em]"
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

          {/* Internal links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            {internalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* SEO tagline */}
          <p className="text-xs text-text-tertiary text-center sm:text-left">
            Développeur web freelance à Caen
          </p>
        </div>
      </div>
    </footer>
  );
}
