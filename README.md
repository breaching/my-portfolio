# Portfolio - Alexis Dubus

Portfolio perso. Next.js + Tailwind. Self-hosted derriere Cloudflare Tunnel.

## Stack

- **Frontend** : Next.js, TypeScript, Tailwind, Framer Motion
- **Contact** : Formspree
- **Infra** : PM2, Cloudflared

## Structure

```
frontend/src/
├── app/           # Pages Next.js
├── components/    # UI
├── content/posts/ # Articles markdown
└── lib/           # Utils
```

## Setup local

```bash
cd frontend && npm i && npm run dev
```

## Deploiement

1. VM Debian sur Proxmox
2. Cloudflare Tunnel (zero port ouvert)
3. PM2 pour le process management
