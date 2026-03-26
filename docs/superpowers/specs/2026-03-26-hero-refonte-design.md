# Hero Section — Refonte Conversion

**Date :** 2026-03-26
**Statut :** Validé
**Fichier principal :** `frontend/src/components/sections/HeroSection.tsx`

---

## Objectif

Refondre le hero pour maximiser la conversion (demandes de devis) auprès des commerçants/artisans/TPE à Caen. Le hero doit être visuellement supérieur aux concurrents locaux (Baptiste Nuytten, Olivier Leval) tout en parlant le langage du prospect non-tech.

## Décisions validées

### 1. Headline fixe orienté émotion
- **H1 :** "Votre entreprise mérite un site à la hauteur."
- Suppression du FlipWords — le message doit être immédiat, pas rotatif
- Mise en forme : "Votre entreprise mérite" (font-light) + "un site à la hauteur." (font-medium/semibold) + point accent

### 2. Sous-titre raccourci
- **Avant :** "Développeur web freelance en Normandie. Je crée des sites vitrines sur mesure qui inspirent confiance — et vous amènent des clients."
- **Après :** "Développeur web freelance à Caen. Sites vitrines sur mesure — rapides, modernes, et qui convertissent."
- Plus court, plus punchy, ancrage géographique "Caen" (SEO)

### 3. CTA unique
- Suppression du CTA secondaire "Voir mes réalisations"
- Focus sur un seul CTA : "Demander un devis gratuit" (bouton glow accent)
- Micro-copy maintenu : "Devis gratuit · Réponse sous 24h · Sans engagement"

### 4. Mockup navigateur (gardé et amélioré)
- Le mockup "Boulangerie Martin" reste — c'est le différenciateur unique vs concurrents
- Améliorations : design plus léché, animations d'entrée plus fluides
- **Nouveau :** version simplifiée visible sur mobile (actuellement `hidden lg:block`)
- Scores Lighthouse maintenus dans la barre du mockup

### 5. Stats row orientées prospect
- **800 €** — à partir de
- **10 jours** — délai de livraison
- **0 €** — devis & conseil gratuit
- NumberTicker animé maintenu

### 6. Éléments gardés tels quels
- Badge "Disponible — Caen & remote" avec pastille verte
- Gradient mesh background + dot pattern + grain overlay
- Animations Framer Motion (stagger, fadeInUp)

### 7. Éléments supprimés
- FlipWords component (import retiré du hero)
- CTA secondaire "Voir mes réalisations"

## Structure layout

```
[Badge disponibilité]

Votre entreprise mérite
un site à la hauteur.              [Mockup navigateur]
                                   [Boulangerie Martin]
Sous-titre court...                [+ Lighthouse scores]

[CTA Demander un devis gratuit]
Micro-copy réassurance

--- Stats row (3 colonnes) ---
[800 €]  [10 jours]  [0 € devis]
```

**Mobile :** colonne unique, mockup visible sous les CTAs (version simplifiée/réduite).

## Fichiers impactés

| Fichier | Action |
|---------|--------|
| `components/sections/HeroSection.tsx` | Refonte majeure |
| `components/ui/FlipWords.tsx` | Conserver (peut être utilisé ailleurs), retirer l'import du hero |

## Contraintes techniques

- Mobile-first responsive (375px → 768px → 1280px)
- Animations Framer Motion cohérentes avec le reste du site
- Phosphor Icons uniquement
- `"use client"` nécessaire (Framer Motion)
- Pas de nouvelles dépendances
