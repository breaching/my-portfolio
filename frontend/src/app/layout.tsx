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
    default: "Alexis Dubus — Systèmes, Web & Sécurité",
    template: "%s — Alexis Dubus",
  },
  description:
    "Développeur web et profil technique autodidacte. Sites vitrines, applications React/Next.js, systèmes et sécurité.",
  keywords: [
    "Développeur web",
    "React",
    "Next.js",
    "Systèmes",
    "Sécurité",
    "Linux",
    "Self-hosting",
    "Python",
  ],
  metadataBase: new URL("https://dubus.pro"),
  openGraph: {
    title: "Alexis Dubus — Systèmes, Web & Sécurité",
    description: "Développeur web et profil technique autodidacte. Sites vitrines, applications React/Next.js, systèmes et sécurité.",
    url: "https://dubus.pro",
    siteName: "Alexis Dubus",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Dubus — Systèmes, Web & Sécurité",
    description: "Développeur web et profil technique autodidacte. Sites vitrines, applications React/Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
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
