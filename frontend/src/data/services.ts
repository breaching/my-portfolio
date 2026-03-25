export interface Service {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export const services: Service[] = [
  {
    name: "Site Essentiel",
    price: "À partir de 800 €",
    description: "L'essentiel pour être visible en ligne.",
    features: [
      "Site one-page responsive",
      "Design moderne sur mesure",
      "Formulaire de contact",
      "Hébergement inclus 1 an",
      "Certificat SSL",
      "Livré en 7-10 jours",
    ],
    popular: false,
  },
  {
    name: "Site Pro",
    price: "À partir de 1 500 €",
    description: "Pour les professionnels qui veulent performer.",
    features: [
      "3 à 5 pages optimisées",
      "Animations et transitions",
      "SEO technique complet",
      "Analytics intégré (RGPD)",
      "Formulaire avancé",
      "Livré en 2-3 semaines",
    ],
    popular: true,
  },
  {
    name: "Sur-Mesure",
    price: "Sur devis",
    description: "Votre projet, vos règles.",
    features: [
      "Pages illimitées",
      "Blog ou espace dynamique",
      "Espace client / dashboard",
      "Fonctionnalités sur mesure",
      "Accompagnement SEO",
      "Maintenance disponible",
    ],
    popular: false,
  },
];
