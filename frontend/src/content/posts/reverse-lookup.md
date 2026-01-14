---
title: "Reverse Lookup Engine"
description: "Moteur de recherche inversée sur millions de records avec cross-référencement multi-sources."
type: "projet"
date: "2024-08-12"
tags: ["Python", "SQLite", "FTS5", "Data Engineering"]
---

## Le problème

J'avais besoin d'un outil capable de faire du cross-référencement sur des millions d'enregistrements provenant de sources hétérogènes. Les solutions existantes étaient soit trop lentes, soit inadaptées à mon cas d'usage.

## Choix techniques

- **SQLite + FTS5** : Après avoir testé plusieurs approches, SQLite avec l'extension FTS5 s'est révélé idéal pour la recherche full-text performante sur de gros volumes
- **Indexation optimisée** : Création d'index stratégiques pour les requêtes fréquentes
- **Python** : Scripts d'ingestion et de normalisation des données

## Architecture

```
Sources (CSV/JSON) → Normalisation → SQLite (FTS5) → API de recherche
```

## Ce que j'ai appris

- L'importance de l'indexation sur des volumes importants
- Les subtilités de FTS5 (tokenizers, ranking)
- La gestion de données sales : types invalides, encodages, doublons
- Le batch processing pour l'ingestion de gros fichiers
