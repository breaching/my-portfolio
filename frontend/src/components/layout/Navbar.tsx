"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

// Types de navigation : "page" pour lien direct, "anchor" pour scroll sur homepage
const navLinks = [
  { href: "/", id: "accueil", label: "Accueil", type: "page" as const },
  { href: "/blog", id: "blog", label: "Blog", type: "page" as const },
  { href: "/#parcours", id: "parcours", label: "Parcours", type: "anchor" as const },
  { href: "/#contact", id: "contact", label: "Contact", type: "anchor" as const },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  const [activeSection, setActiveSection] = useState("accueil");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll spy uniquement sur la homepage
  useEffect(() => {
    if (!isHomePage) {
      // Sur /blog ou /blog/[slug], activer "blog"
      if (isBlogPage) {
        setActiveSection("blog");
      } else {
        setActiveSection("");
      }
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Chercher quelle section est visible
      const sections = ["contact", "parcours", "blog", "accueil"];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      setActiveSection("accueil");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, isBlogPage]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0]
  ) => {
    setMobileMenuOpen(false);

    if (link.type === "page") {
      // Navigation vers une page
      if (link.href === "/" && isHomePage) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Sinon laisser le Link gérer la navigation
    } else {
      // Navigation vers une ancre
      e.preventDefault();
      if (isHomePage) {
        // Sur homepage: scroll direct
        const section = document.getElementById(link.id);
        if (section) {
          const offsetTop = section.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      } else {
        // Sur autre page: naviguer vers homepage avec ancre
        router.push(link.href);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-accent-border shadow-sm">
      <nav className="container-main h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium text-text-primary hover:text-accent-primary transition-colors duration-200 tracking-[-0.01em] font-mono group"
        >
          <span className="text-accent-primary opacity-60 mr-1">$</span>
          <span>Alexis Dubus</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 text-sm transition-all duration-200 rounded-md font-mono ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {isActive && (
                  <>
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-background-elevated rounded-md border border-accent-border"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  </>
                )}
                <span className="relative z-10">
                  {isActive && <span className="text-accent-primary mr-1">{">"}</span>}
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-b border-accent-border bg-background overflow-hidden"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="container-main py-4 space-y-1"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.div
                    key={link.id}
                    variants={{
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { stiffness: 1000, velocity: -100 },
                        },
                      },
                      closed: {
                        y: 20,
                        opacity: 0,
                        transition: {
                          y: { stiffness: 1000 },
                        },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`block py-3 px-3 text-sm transition-colors duration-200 rounded-md font-mono ${
                        isActive
                          ? "text-text-primary font-medium bg-background-elevated border border-accent-border"
                          : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
                      }`}
                    >
                      {isActive && <span className="text-accent-primary mr-2">{">"}</span>}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
