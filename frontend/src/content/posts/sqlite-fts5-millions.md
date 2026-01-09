---
title: "SQLite FTS5 sur millions de rows"
description: "Optimisation de recherche full-text sur des volumes importants de données."
type: "article"
date: "2024-01-10"
tags: ["SQLite", "FTS5", "Performance", "Database"]
---

## Contexte

SQLite est souvent sous-estimé pour les gros volumes. Avec une bonne configuration, il peut gérer des millions de rows efficacement.

## Pourquoi FTS5 ?

- Recherche full-text native
- Pas de dépendance externe
- Très performant une fois bien configuré

## Configuration optimale

```sql
CREATE VIRTUAL TABLE search_index USING fts5(
  name, email, phone,
  tokenize='unicode61 remove_diacritics 1'
);
```

## Indexation

Pour l'ingestion de gros volumes :
```sql
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = -64000; -- 64MB
```

## Requêtes performantes

```sql
SELECT * FROM search_index
WHERE search_index MATCH 'term*'
ORDER BY rank
LIMIT 100;
```

## Résultats

Sur 5M+ de rows :
- Recherche : < 100ms
- Indexation : ~30min (batch)
- Taille fichier : raisonnable avec compression
