import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alexis Dubus — Développeur Web Freelance à Caen",
    template: "%s — Alexis Dubus, Dev Web Caen",
  },
  description:
    "Développeur web freelance à Caen. Création de sites vitrines modernes, applications React/Next.js, optimisés SEO et RGPD. Devis gratuit sous 24h.",
  keywords: [
    "développeur web freelance Caen",
    "création site vitrine Caen",
    "développeur Next.js freelance",
    "site internet professionnel Normandie",
    "développeur React freelance",
    "création site web Caen",
    "agence web Caen",
    "site vitrine pas cher",
  ],
  metadataBase: new URL("https://dubus.pro"),
  openGraph: {
    title: "Alexis Dubus — Développeur Web Freelance à Caen",
    description:
      "Création de sites vitrines et applications web. Design moderne, SEO, RGPD. Devis gratuit.",
    url: "https://dubus.pro",
    siteName: "Alexis Dubus — Dev Web Freelance",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Dubus — Développeur Web Freelance à Caen",
    description:
      "Sites vitrines modernes et applications web. Freelance à Caen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Alexis Dubus — Développeur Web Freelance",
  description: "Création de sites vitrines et applications web à Caen.",
  url: "https://dubus.pro",
  email: "contact@dubus.pro",
  areaServed: {
    "@type": "City",
    name: "Caen",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caen",
    addressCountry: "FR",
  },
  priceRange: "€€",
  knowsAbout: [
    "Création de sites web",
    "Développement React",
    "Next.js",
    "SEO",
    "Applications web",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col font-sans overflow-x-hidden`}
      >
        {/* Skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-20" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
