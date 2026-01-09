# Portfolio - Alexis Dubus

Portfolio perso. Next.js 16 + FastAPI + SQLite. Self-hosted derriere Cloudflare Tunnel.

## Stack

- **Frontend** : Next.js 16, TypeScript, Tailwind, Framer Motion
- **Backend** : FastAPI async, SQLAlchemy, SQLite
- **Infra** : Nginx Proxy Manager, Cloudflared

## Securite

J'ai pousse la securite plus loin que necessaire pour un portfolio - c'est le but. Details dans [SECURITY.md](./SECURITY.md).

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

## Prod

Mettre `ENVIRONMENT=production` dans le .env backend. L'app verifie que :
- `ADMIN_API_KEY` >= 32 chars
- `DEBUG` = false
- `ALLOWED_HOSTS` != "*"
- `ENABLE_HSTS` = true

Sinon elle refuse de demarrer.
