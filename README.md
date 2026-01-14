# Portfolio - Alexis Dubus

Portfolio perso. Next.js 16 + FastAPI + SQLite. Self-hosted derriere Cloudflare Tunnel.

## Stack

- **Frontend** : Next.js 16, TypeScript, Tailwind, Framer Motion
- **Backend** : FastAPI async, SQLAlchemy, SQLite
- **Infra** : Nginx Proxy Manager, Cloudflared

## Securite

J'ai pousse la securite plus loin que necessaire pour un portfolio - c'est le but.

En resume :
- Rate limiting + brute force protection
- Honeypots pour detecter les scans
- Logs JSON structures
- L'app refuse de boot si la config prod est faible

## Structure

```
frontend/src/
├── app/           # Pages Next.js
├── components/    # UI
├── content/posts/ # Articles markdown
└── lib/           # API, utils

backend/
├── app/routers/   # Endpoints
├── app/models/    # SQLAlchemy
├── app/schemas/   # Pydantic
└── app/middleware/ # Rate limit, headers
```

## Setup local

```bash
# Frontend
cd frontend && npm i && npm run dev

# Backend
cd backend && pip install -r requirements.txt
cp .env.example .env
# Generer une cle: python -c "import secrets; print(secrets.token_urlsafe(32))"
uvicorn main:app --reload
```

## Deploiement

Guide complet : **[DEPLOY.md](./DEPLOY.md)**

En resume :
1. VM Debian sur Proxmox
2. Cloudflare Tunnel (zero port ouvert)
3. Nginx reverse proxy local
4. Services systemd

L'app refuse de boot en prod si la config est faible (cle API < 32 chars, debug=true, etc).
