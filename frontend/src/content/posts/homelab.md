---
title: "Homelab & IA locale"
description: "Infrastructure Proxmox avec GPU passthrough pour héberger des LLMs locaux via Ollama."
type: "projet"
date: "2024-02-15"
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

- **Ollama** : Pour faire tourner des modèles comme Llama, Mistral, etc.
- **32GB RAM** : Essentiel pour les modèles de taille moyenne
- **Objectif** : Assistant personnel local et automatisations

## Ce que j'ai appris

- La virtualisation bas niveau (IOMMU, vfio)
- L'administration Proxmox avancée
- Les contraintes mémoire des LLMs
- L'importance de la stabilité pour un homelab (uptime, monitoring)
