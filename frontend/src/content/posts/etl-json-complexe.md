---
title: "Gérer du JSON imbriqué en ETL"
description: "Stratégies pour transformer des structures JSON complexes en données exploitables."
type: "article"
date: "2024-01-05"
tags: ["Python", "ETL", "JSON", "Data Engineering"]
---

## Le problème

Les APIs modernes renvoient souvent du JSON profondément imbriqué. Transformer ça en données plates exploitables n'est pas facile.

## Exemple de structure

```json
{
  "user": {
    "profile": {
      "metrics": {
        "sleep": [{"date": "...", "phases": [...]}]
      }
    }
  }
}
```

## Stratégies

### 1. Flatten récursif

```python
def flatten(obj, prefix=''):
    result = {}
    for k, v in obj.items():
        key = f"{prefix}_{k}" if prefix else k
        if isinstance(v, dict):
            result.update(flatten(v, key))
        else:
            result[key] = v
    return result
```

### 2. JSONPath pour extraction ciblée

Quand on sait exactement ce qu'on cherche.

### 3. Schema mapping

Définir un mapping explicite source → destination.

## Gestion des erreurs

- Champs manquants : valeurs par défaut
- Types invalides : conversion ou skip
- Listes vides : gestion explicite

## Bonnes pratiques

- Toujours valider le schéma en entrée
- Logger les anomalies
- Tests sur données réelles (pas juste les exemples de la doc)
