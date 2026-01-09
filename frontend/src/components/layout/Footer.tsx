import { GithubLogo, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/breaching", icon: GithubLogo, label: "GitHub" },
  { href: "https://tryhackme.com/p/bremusic", icon: ShieldCheck, label: "TryHackMe" },
];

export function Footer() {
  return (
    <footer className="border-t border-accent-border">
      <div className="container-main py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left - Name and links */}
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
      </div>
    </footer>
  );
}
