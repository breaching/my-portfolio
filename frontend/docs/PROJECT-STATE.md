# PROJECT STATE — dubus.pro

> Dernière mise à jour : 2026-03-25

## Statut global

**Objectif** : Machine de conversion freelance + portfolio technique crédible pour employeurs/stages.

**Toutes les phases sont terminées.** Prochaines étapes : deploy, test Lighthouse réel, création compte Calendly.

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
| 15 | Hero percutant ("Votre site pro en 2 semaines") | DONE |
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

---

## Changelog

### 2026-03-25 — Session complète

**Phase 1 :**
- `@vercel/analytics` installé, `<Analytics />` dans layout.tsx
- Light theme via `@media (prefers-color-scheme: light)` — variables CSS complètes, retiré `className="dark"` hardcodé
- Page `/mentions-legales` créée (SIREN, APE, hébergeur Vercel, RGPD, PI)
- Footer enrichi : SIREN, mentions légales, lien réalisations, tagline SEO, border bottom
- LinkedIn corrigé partout → `/alexis-dubus-603590284/`
- Section FAQ : 6 questions en accordion animé (technique, délais, satisfaction, WordPress, paiement, SEO)

**Phase 2 :**
- Placeholder témoignages discret en bas de Réalisations
- Mockup Clarmind CSS-only : barre de fenêtre, sidebar, KPI cards, bar chart
- Formulaire : retiré champ sujet, ajouté select budget, sujet auto-généré pour Formspree, grid 2 colonnes pour type/budget
- CTA flottant mobile : sticky bottom, apparaît après hero, disparaît à la section contact
- Hero : "Votre site pro en ligne en 2 semaines", stats orientées client (délai, vitesse, prix)
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

---

## Architecture actuelle

```
Homepage funnel :
Hero → Services (pricing 3 offres) → Différenciation (4 avantages) → Réalisations (Clarmind + dubus.pro) → Process (4 étapes) → FAQ (6 questions) → Blog → Contact (formulaire Formspree)
```

- **Theme** : Dark/Light automatique (prefers-color-scheme, pas de toggle)
- **Analytics** : Vercel Analytics (RGPD-friendly, pas de cookies)
- **Formulaire** : Formspree + honeypot + validation + select budget
- **SEO** : JSON-LD ProfessionalService enrichi, OG image dynamique, sitemap, meta tags
- **Sécurité** : CSP/HSTS headers (next.config.ts)
- **Blog** : 6 articles markdown (tech/sécu)
- **Pages** : /, /blog, /blog/[slug], /parcours, /contact, /mentions-legales
- **Mobile** : CTA flottant sticky bottom

---

## Décisions prises

- Dark/light basé sur `prefers-color-scheme` (pas de toggle manuel)
- Pas de faux témoignages (obligation légale + crédibilité)
- Phosphor Icons uniquement
- Push direct sur main (projet solo)
- Commits en français
- LinkedIn officiel : /alexis-dubus-603590284/
- Subject formulaire auto-généré (type + budget)
- Calendly : lien simple quand créé, pas d'embed

---

## Prochaines étapes

- [ ] Deploy sur Vercel et tester Lighthouse réel
- [ ] Créer compte Calendly et ajouter le lien
- [ ] Écrire 1er article blog orienté prospect ("Combien coûte un site vitrine en 2026")
- [ ] Obtenir 1er vrai témoignage client pour remplacer le placeholder
- [ ] Ajouter screenshots réels de Clarmind quand disponibles
