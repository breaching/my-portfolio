# PROJECT STATE — dubus.pro

> Dernière mise à jour : 2026-03-25

## Statut global

**Objectif** : Machine de conversion freelance + portfolio technique crédible pour employeurs/stages.

**Toutes les phases sont terminées.** Audit qualité effectué et correctifs appliqués. Prochaines étapes : deploy, test Lighthouse réel, création compte Calendly, vrais projets clients.

---

## Phases & tâches

### Phase 1 — Fondations conversion (TERMINÉE)

| # | Tâche | Statut |
|---|-------|--------|
| 1 | Vercel Analytics | DONE |
| 2 | Light theme auto (prefers-color-scheme) | DONE |
| 3 | Mentions légales (SIREN, EI, RGPD) | DONE |
| 4 | Footer enrichi (SIREN, liens, copyright) | DONE |
| 5 | Section FAQ / Réassurance (6 questions, accordion) | DONE |
| 13 | Lien LinkedIn harmonisé partout | DONE |

### Phase 2 — Optimisation conversion (TERMINÉE)

| # | Tâche | Statut |
|---|-------|--------|
| 6 | Placeholder témoignages (transparent) | DONE |
| 7 | Mockup Clarmind (CSS-only dashboard) | DONE |
| 9 | Formulaire simplifié (budget select, sans sujet) | DONE |
| 14 | CTA flottant mobile (sticky, apparaît/disparaît) | DONE |
| 15 | Hero percutant | DONE |
| 20 | Section "Pourquoi un site sur mesure" (4 avantages) | DONE |

### Phase 3 — SEO & technique (TERMINÉE)

| # | Tâche | Statut |
|---|-------|--------|
| 10 | JSON-LD enrichi (geo, offres, sameAs, areaServed) | DONE |
| 11 | OG image dynamique (Next.js edge) | DONE |
| 12 | Middleware — déjà nettoyé (plus de fichier) | DONE |
| 18 | Lighthouse — optimisations code en place | DONE |
| 19 | Sitemap — mentions-legales ajoutée | DONE |

### Phase 4 — Portfolio technique (TERMINÉE)

| # | Tâche | Statut |
|---|-------|--------|
| 8 | dubus.pro ajouté comme réalisation | DONE |
| 16 | Page /parcours — déjà propre (pas de stage/alternance) | DONE |
| 17 | Calendly — en attente création compte | WAITING |
| 21 | Refonte /parcours — page portfolio technique complète | DONE |
| 22 | Lien "Vous recrutez ?" discret dans le footer | DONE |

### Phase 7 — Audit qualité & correctifs (TERMINÉE)

| # | Tâche | Statut |
|---|-------|--------|
| 23 | Corriger mention "HT" → "TVA non applicable" (obligation légale) | DONE |
| 24 | Retirer placeholder témoignages ("arrivent bientôt") | DONE |
| 25 | Remplacer "Google Analytics" → "Analytics (RGPD)" dans services | DONE |
| 26 | Harmoniser délais hero (retrait "en 2 semaines" → "rapidement") | DONE |
| 27 | Ajouter metadata SEO sur /parcours (layout.tsx) | DONE |
| 28 | Ajouter FAQ JSON-LD schema (rich snippets) | DONE |
| 29 | Fix unused import getAllPosts dans blog/[slug] | DONE |
| 30 | Utiliser next/image dans le markdown renderer | DONE |
| 31 | Extraire scrollToSection en utilitaire partagé (lib/scroll.ts) | DONE |
| 32 | Sitemap : dates réelles au lieu de new Date() | DONE |
| 33 | Supprimer getHoneypotFieldName() inutilisée | DONE |

---

## Changelog

### 2026-03-25 — Audit qualité & correctifs

**Phase 7 — Audit qualité (13 correctifs) :**

P0 — Correctifs légaux et crédibilité :
- **"HT" → "TVA non applicable"** : correction obligation légale (art. 293 B CGI, pas de TVA = prix TTC par définition)
- **Suppression placeholder témoignages** : "Les premiers retours arrivent bientôt" retiré — signalait l'absence de clients plutôt que de rassurer

P1 — Incohérences contenu :
- **"Google Analytics" → "Analytics (RGPD)"** dans `data/services.ts` — le site utilise Vercel Analytics
- **Hero harmonisé** : "en 2 semaines" remplacé par "rapidement" pour éviter l'incohérence avec "7-10 jours" et "2-3 semaines" des offres
- **Metadata /parcours** : ajout `layout.tsx` avec title + description SEO

P2 — SEO & technique :
- **FAQ JSON-LD** : schema FAQPage ajouté pour rich snippets Google
- **Fix ESLint** : import `getAllPosts` inutilisé supprimé dans `blog/[slug]/page.tsx`
- **next/image** dans le markdown renderer : remplacement `<img>` par `<Image>` optimisé
- **scrollToSection mutualisé** : `lib/scroll.ts` créé, 5 copies supprimées (Hero, Services, Différences, Réalisations, FloatingCta)

P3 — Maintenance :
- **Sitemap dates réelles** : utilise les dates des articles au lieu de `new Date()` à chaque build
- **getHoneypotFieldName() supprimée** : fonction morte dans `lib/security.ts`

**Résultat audit post-correctifs :**
- TypeScript : 0 erreur
- ESLint : 0 warning
- Build : clean (16 pages statiques)

### 2026-03-25 — Session complète

**Phase 1 :**
- `@vercel/analytics` installé, `<Analytics />` dans layout.tsx
- Light theme via `@media (prefers-color-scheme: light)` — variables CSS complètes, retiré `className="dark"` hardcodé
- Page `/mentions-legales` créée (SIREN, APE, hébergeur Vercel, RGPD, PI)
- Footer enrichi : SIREN, mentions légales, lien réalisations, tagline SEO, border bottom
- LinkedIn corrigé partout → `/alexis-dubus-603590284/`
- Section FAQ : 6 questions en accordion animé (technique, délais, satisfaction, WordPress, paiement, SEO)

**Phase 2 :**
- Mockup Clarmind CSS-only : barre de fenêtre, sidebar, KPI cards, bar chart
- Formulaire : retiré champ sujet, ajouté select budget, sujet auto-généré pour Formspree, grid 2 colonnes pour type/budget
- CTA flottant mobile : sticky bottom, apparaît après hero, disparaît à la section contact
- Hero : stats orientées client (délai, vitesse, prix)
- Section "Pourquoi un site sur mesure" : 4 cards (vitesse, coût, code, sécurité) entre Services et Réalisations

**Phase 3 :**
- JSON-LD enrichi : geo Caen, areaServed [Caen, Normandie], sameAs, hasOfferCatalog avec 3 offres
- OG image dynamique via `opengraph-image.tsx` (edge runtime)
- Sitemap : `/mentions-legales` ajoutée
- Middleware : confirmé supprimé, rien à nettoyer

**Phase 4 :**
- dubus.pro ajouté comme 2e réalisation (stack Next.js 16, React 19, Tailwind 4, Framer Motion)
- Page /parcours vérifiée : aucune mention stage/alternance/étudiant
- Calendly : en attente de création du compte
- **Refonte /parcours** : 5 projets détaillés (Clarmind, dubus.pro, homelab, pipeline Oura, reverse lookup) avec choix techniques justifiés, compétences avec contexte, timeline enrichie, approche, CTA collaborations
- **Lien recruteur** : "Vous recrutez ? Voir mon parcours technique →" ajouté dans le footer

**Phase 5 — Contenu SEO :**
- **Article blog** : "Combien coûte un site vitrine en 2026 ?" — ~3000 mots, données de marché réelles (Malt, MajorFlow, AMN, BOFIP), tableaux comparatifs, TCO 3 ans, prix Caen/Normandie, fiscalité, FAQ

**Phase 6 — Refonte design conversion :**
- **globals.css** : ajout `.btn-glow` (CTA halo lumineux), `.gradient-mesh`, `.bg-dot-pattern`, `.grain-overlay`, `.section-accent`, `.stat-number`, `.card-interactive`, amélioration `.btn-primary` et `.text-gradient-action`
- **HeroSection** : fond gradient mesh + dot grid + grain, headline 7xl, stats en cards avec icônes, CTA glow, suppression grille expertise
- **ServicesSection** : labels mono uppercase, bannière "Le plus demandé" full-width, temps de livraison affiché, prix 4xl, CTA avec flèche animée
- **DifferencesSection** : chiffres concrets (< 2s, 0 €/mois, 100%, A+), icônes dans containers, section-accent en fond, CTA discret
- **RealisationsSection** : browser frame premium (barre URL + SSL), barres chart animées whileInView, métriques en mini-cards avec icônes, badge SaaS B2B
- **ProcessSection** : timeline verticale avec ligne gradient, icônes contextuelles (ChatCircle, FileText, Code, Rocket), détail rapide par étape, animation slide-in-left
- **ContactSection** : badges réassurance (24h, gratuit, sans engagement), contact links en cards, btn-glow submit, section-accent
- **BlogSection + FaqSection** : labels mono uppercase cohérents, titres md:4xl
- **Cohérence** : toutes sections ont label mono + titre 3xl/4xl + mb-14 + rounded-xl

---

## Architecture actuelle

```
Homepage funnel :
Hero → Services (pricing 3 offres) → Différenciation (4 avantages) → Réalisations (Clarmind + dubus.pro) → Process (4 étapes) → FAQ (6 questions + JSON-LD) → Blog → Contact (formulaire Formspree)
```

- **Theme** : Dark/Light automatique (prefers-color-scheme, pas de toggle)
- **Analytics** : Vercel Analytics (RGPD-friendly, pas de cookies)
- **Formulaire** : Formspree + honeypot statique + validation + select budget
- **SEO** : JSON-LD ProfessionalService + FAQPage, OG image dynamique, sitemap avec dates réelles, meta tags
- **Sécurité** : CSP/HSTS headers (next.config.ts)
- **Blog** : 7 articles markdown (6 tech/sécu + 1 prospect/SEO), images via next/image
- **Pages** : /, /blog, /blog/[slug], /parcours, /contact, /mentions-legales
- **Mobile** : CTA flottant sticky bottom
- **Utils** : `lib/scroll.ts` (scroll partagé), `lib/security.ts` (validation/sanitization)

---

## Décisions prises

- Dark/light basé sur `prefers-color-scheme` (pas de toggle manuel)
- Pas de faux témoignages (obligation légale + crédibilité)
- Pas de placeholder témoignages non plus (signale l'absence de clients)
- Phosphor Icons uniquement
- Push direct sur main (projet solo)
- Commits en français
- LinkedIn officiel : /alexis-dubus-603590284/
- Subject formulaire auto-généré (type + budget)
- Calendly : lien simple quand créé, pas d'embed
- Prix affichés "TVA non applicable" (pas "HT")
- Hero : "rapidement" au lieu de délai précis (incohérent avec les offres variables)

---

## Problèmes connus (non corrigés)

- **Portfolio faible** : 1 seul vrai projet (Clarmind) + ce site. Pas de site vitrine réalisé pour un client → décalage avec le service vendu. Besoin de projets réels ou pro bono.
- **Pas de visuel Clarmind** : le mockup est un skeleton CSS, pas de screenshot du vrai produit. Le site clarmind.com est derrière un paywall.
- **Pas de preuve sociale** : zéro témoignage, zéro avis. Priorité absolue dès le premier client livré.
- **Navbar mono** : le style terminal (font-mono, `$`, `>`) peut dérouter les prospects non-tech. Choix délibéré pour le double usage recruteur.
- **FloatingCta mobile** : peut couvrir du contenu en bas de page (pas de padding-bottom compensatoire).
- **OG image en edge runtime** : fonctionne mais incohérent avec l'approche Node.js du reste du site.

---

## Prochaines étapes

- [ ] Push sur origin et deploy sur Vercel
- [ ] Tester Lighthouse réel en production
- [ ] Tester le light theme sur différents devices
- [ ] Vérifier l'OG image en partageant le lien sur LinkedIn
- [ ] Créer compte Calendly et ajouter le lien
- [ ] Google Search Console — soumettre le sitemap
- [ ] Google Business Profile — fiche locale Caen
- [ ] **Réaliser 1-2 sites vitrines (pro bono ou prix réduit) pour alimenter le portfolio**
- [ ] Obtenir 1er vrai témoignage client
- [ ] Ajouter screenshots réels de Clarmind quand disponibles
- [ ] 2e article prospect : "5 erreurs des sites de commerçants"
- [ ] 3e article prospect : "Pourquoi un site rapide vous fait gagner des clients"
