---
title: "GPU Passthrough sur Proxmox"
description: "Configuration complète du passthrough GPU (GTX 1070 Ti) pour une VM dédiée IA."
type: "article"
date: "2024-01-15"
tags: ["Proxmox", "GPU", "Linux", "Virtualisation"]
---

## Prérequis

- CPU avec support VT-d (Intel) ou AMD-Vi
- Carte mère avec IOMMU
- GPU dédié (pas l'iGPU)

## Configuration BIOS

Activer :
- VT-d / AMD-Vi
- IOMMU
- Above 4G Decoding (si disponible)

## Configuration Proxmox

### 1. Kernel parameters

Dans `/etc/default/grub` :
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"
```

### 2. Modules VFIO

Dans `/etc/modules` :
```
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

### 3. Blacklist du driver

Empêcher le host d'utiliser le GPU :
```
blacklist nouveau
blacklist nvidia
```

### 4. Configuration VM

- Machine : q35
- BIOS : OVMF (UEFI)
- Ajouter le GPU en PCI passthrough

## Troubleshooting

Les problèmes courants :
- IOMMU groups : parfois il faut passer tout le groupe
- Reset bug : certains GPU ne supportent pas bien le reset
- Audio HDMI : nécessite parfois un patch séparé
