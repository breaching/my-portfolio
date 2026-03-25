import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
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
    "création site internet Caen",
    "développeur web Normandie",
    "site internet professionnel Normandie",
    "refonte site web Caen",
    "développeur Next.js freelance",
    "développeur React freelance",
    "site vitrine pas cher Caen",
    "agence web Caen",
  ],
  metadataBase: new URL("https://dubus.pro"),
  alternates: {
    canonical: "https://dubus.pro",
  },
  openGraph: {
    title: "Alexis Dubus — Développeur Web Freelance à Caen",
    description:
      "Création de sites vitrines et applications web à Caen. Design moderne, SEO, RGPD. Devis gratuit.",
    url: "https://dubus.pro",
    siteName: "Alexis Dubus — Dev Web Freelance",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Dubus — Développeur Web Freelance à Caen",
    description:
      "Création de sites vitrines et applications web. Freelance à Caen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://dubus.pro/#website",
  url: "https://dubus.pro",
  name: "Alexis Dubus — Développeur Web Freelance",
  description: "Création de sites vitrines et applications web à Caen",
  publisher: { "@id": "https://dubus.pro/#business" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://dubus.pro/#business",
  name: "Alexis Dubus — Développeur Web Freelance",
  description:
    "Développeur web freelance à Caen. Création de sites vitrines modernes, applications React/Next.js, optimisés SEO et RGPD.",
  url: "https://dubus.pro",
  image: "https://dubus.pro/opengraph-image",
  email: "contact@dubus.pro",
  areaServed: [
    { "@type": "City", name: "Caen" },
    { "@type": "AdministrativeArea", name: "Normandie" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caen",
    addressRegion: "Normandie",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.1829,
    longitude: -0.3707,
  },
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Virement bancaire",
  sameAs: [
    "https://github.com/breaching",
    "https://www.linkedin.com/in/alexis-dubus-603590284/",
  ],
  knowsAbout: [
    "Création de sites web",
    "Développement React",
    "Next.js",
    "TypeScript",
    "SEO",
    "Applications web",
    "Tailwind CSS",
    "RGPD",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de création web",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Site Essentiel",
        description: "Site one-page responsive avec design sur mesure",
        price: "800",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "800",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      },
      {
        "@type": "Offer",
        name: "Site Pro",
        description: "Site multi-pages avec animations, SEO et formulaire avancé",
        price: "1500",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "1500",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      },
      {
        "@type": "Offer",
        name: "Sur-Mesure",
        description: "Application web ou site complexe sur devis",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
        <FloatingCta />
        <Analytics />
      </body>
    </html>
  );
}
