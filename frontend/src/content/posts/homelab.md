---
title: "Homelab & IA locale"
description: "Infrastructure Proxmox avec GPU passthrough pour héberger des LLMs locaux via Ollama."
type: "projet"
date: "2025-08-15"
tags: ["Proxmox", "Linux", "GPU Passthrough", "Ollama", "LLM"]
---

## Le problème

Je voulais héberger des LLMs localement pour plusieurs raisons : confidentialité, coût, latence, et surtout pour comprendre comment ça fonctionne sous le capot.

## Infrastructure

- **Hardware** : Dell Optiplex reconditionné, i5-8500, 32GB RAM, GTX 1070 Ti
- **Hyperviseur** : Proxmox VE (bare-metal)
- **GPU Passthrough** : Configuration vfio-pci pour passer le GPU à une VM dédiée

## Configuration GPU Passthrough

La partie la plus technique du projet. Points clés :
- Activation IOMMU dans le BIOS
- Configuration kernel : `intel_iommu=on iommu=pt`
- Isolation du GPU avec vfio-pci
- Séparation iGPU (host) / dGPU (VM)

## Stack IA

- **Ollama** : Pour faire tourner des modèles comme Llama, Mistral, etc. Je run principalement **Cogito:8b** et **Qwen3:8b** pour les réflexions et tâches plus poussées. Pour la vitesse ou des traitements minimaux, comme la génération d'images text-to-image ou la description d'images, j'utilise **Gemma 3:4b**. Occasionnellement, **Mistral7b** est aussi déployé.
- **Open WebUI** : Une interface utilisateur web conviviale pour interagir facilement avec les modèles Ollama. Elle offre une expérience similaire à ChatGPT, mais entièrement self-hosted et privée.
- **API Ollama** : L'utilisation de l'API RESTful d'Ollama permet l'intégration des LLMs locaux dans des applications tierces et des scripts personnalisés, ouvrant la voie à des automatisations avancées et à l'expérimentation de nouvelles applications basées sur l'IA.
- **Modèles Quantifiés** : Je me suis également intéressé aux modèles quantifiés (par exemple, en Q4) pour optimiser l'utilisation de la RAM et la vitesse d'inférence sur mon hardware limité.
- **32GB RAM** : Essentiel pour les modèles de taille moyenne.
- **Automatisation (n8n)** : Intégration avec n8n pour orchestrer des workflows automatisés tirant parti de ces LLMs locaux.
- **Objectif** : Assistant personnel local et automatisations.

## Ce que j'ai appris

- La virtualisation bas niveau (IOMMU, vfio)
- L'administration Proxmox avancée
- Les contraintes mémoire des LLMs
- L'importance de la stabilité pour un homelab (uptime, monitoring)
