import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site dubus.pro — Alexis Dubus, développeur web freelance à Caen.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="container-main">
      <section className="section">
        <h1 className="text-3xl font-light tracking-[-0.02em] mb-10">
          Mentions légales
        </h1>

        <div className="prose-width space-y-10 text-text-secondary text-sm leading-[1.8]">
          <div>
            <h2 className="text-lg font-medium text-text-primary mb-3">
              Éditeur du site
            </h2>
            <ul className="space-y-1">
              <li>
                <span className="text-text-tertiary">Nom :</span> Alexis Dubus
              </li>
              <li>
                <span className="text-text-tertiary">Statut :</span>{" "}
                Entrepreneur Individuel
              </li>
              <li>
                <span className="text-text-tertiary">SIREN :</span> 101 749 216
              </li>
              <li>
                <span className="text-text-tertiary">Code APE :</span> 6201Z —
                Programmation informatique
              </li>
              <li>
                <span className="text-text-tertiary">Siège :</span> Caen,
                France
              </li>
              <li>
                <span className="text-text-tertiary">Email :</span>{" "}
                <a
                  href="mailto:contact@dubus.pro"
                  className="text-accent-action hover:underline"
                >
                  contact@dubus.pro
                </a>
              </li>
              <li>
                <span className="text-text-tertiary">TVA :</span> Non
                applicable — art. 293 B du CGI
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium text-text-primary mb-3">
              Hébergement
            </h2>
            <ul className="space-y-1">
              <li>
                <span className="text-text-tertiary">Hébergeur :</span> Vercel
                Inc.
              </li>
              <li>
                <span className="text-text-tertiary">Adresse :</span> 340 S
                Lemon Ave #4133, Walnut, CA 91789, États-Unis
              </li>
              <li>
                <span className="text-text-tertiary">Site :</span>{" "}
                vercel.com
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium text-text-primary mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, code source) est
              la propriété exclusive d&apos;Alexis Dubus, sauf mention contraire.
              Toute reproduction, même partielle, est interdite sans
              autorisation préalable.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-text-primary mb-3">
              Données personnelles
            </h2>
            <p>
              Ce site ne dépose aucun cookie. Les données transmises via le
              formulaire de contact (nom, email, message) sont utilisées
              uniquement pour répondre à votre demande. Elles ne sont ni
              vendues, ni partagées avec des tiers. Conformément au RGPD, vous
              pouvez demander la suppression de vos données en écrivant à{" "}
              <a
                href="mailto:contact@dubus.pro"
                className="text-accent-action hover:underline"
              >
                contact@dubus.pro
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-text-primary mb-3">
              Médiation de la consommation
            </h2>
            <p className="mb-3">
              Conformément aux articles L.616-1 et R.616-1 du Code de la
              consommation, tout consommateur a le droit de recourir
              gratuitement à un médiateur de la consommation en vue de la
              résolution amiable d&apos;un litige l&apos;opposant à un
              professionnel.
            </p>
            <ul className="space-y-1">
              <li>
                <span className="text-text-tertiary">Médiateur :</span>{" "}
                Médiation de la consommation en ligne (MCEL)
              </li>
              <li>
                <span className="text-text-tertiary">Site :</span>{" "}
                <a
                  href="https://www.economie.gouv.fr/mediation-conso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-action hover:underline"
                >
                  economie.gouv.fr/mediation-conso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium text-text-primary mb-3">
              Responsabilité
            </h2>
            <p>
              Les informations fournies sur ce site le sont à titre indicatif.
              Alexis Dubus ne saurait être tenu responsable des erreurs,
              d&apos;une absence de disponibilité des informations ou de la
              présence de virus sur ce site.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
