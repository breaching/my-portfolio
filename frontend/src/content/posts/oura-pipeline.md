---
title: "Oura Ring → InfluxDB"
description: "Pipeline ETL complet : API Oura, transformation JSON complexe, stockage time-series."
type: "projet"
date: "2024-01-20"
tags: ["Python", "ETL", "InfluxDB", "API", "Time Series"]
---

## Le problème

Les données de mon Oura Ring étaient bloquées dans leur app. Je voulais les récupérer, les transformer et les stocker dans ma propre base pour analyse et visualisation custom.

## Pipeline

```
API Oura → Extraction → Transformation → InfluxDB 2
```

## Défis techniques

- **JSON imbriqué complexe** : L'API Oura renvoie des structures profondes avec beaucoup de nesting
- **Mapping de champs** : Certains champs changent selon les jours
- **Gestion des erreurs** : Timeouts, données manquantes, rate limiting

## Données traitées

- Sommeil : phases, durée, qualité
- Activité : pas, calories, mouvement
- Readiness : score quotidien, HRV, température

## Ce que j'ai appris

- La manipulation de JSON complexe en Python
- Les bases time-series (InfluxDB 2, Flux)
- La robustesse d'un pipeline ETL (retry, logging, validation)
- La gestion du rate limiting API
