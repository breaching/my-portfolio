---
slug: homelab-infrastructure
title: Homelab Infrastructure
description: Setup complet d'un serveur self-hosted avec Proxmox, Docker et monitoring.
category: Infrastructure
tags:
  - Linux
  - Docker
  - Proxmox
  - Ansible
  - Traefik
date: "2024"
github: https://github.com/username/homelab
featured: true
---

## Contexte

Mise en place d'une infrastructure complète de homelab pour héberger des services personnels et professionnels.

## Technologies utilisées

- **Proxmox VE** : Hyperviseur pour la virtualisation
- **Docker & Docker Compose** : Conteneurisation des services
- **Traefik** : Reverse proxy avec SSL automatique
- **Grafana + Prometheus** : Monitoring et alerting

## Architecture

```
┌─────────────────────────────────────────┐
│              Proxmox VE                 │
├─────────────┬─────────────┬─────────────┤
│   VM Web    │  VM Docker  │  VM Backup  │
│  (Nginx)    │ (Services)  │  (Borg)     │
└─────────────┴─────────────┴─────────────┘
```

## Fonctionnalités

- Haute disponibilité avec clustering
- Sauvegardes automatiques journalières
- Monitoring temps réel avec alertes
- Déploiement automatisé via Ansible

## Résultats

- **99.9%** d'uptime sur les services critiques
- Réduction des coûts d'hébergement de **70%**
- Compétences acquises en administration système
