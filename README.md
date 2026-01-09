# Portfolio - Alexis Dubus

Portfolio personnel full-stack avec une attention particulière à la sécurité et aux bonnes pratiques.

## Stack

```
Frontend     Next.js 16 · TypeScript · Tailwind CSS · Framer Motion
Backend      FastAPI · SQLAlchemy async · SQLite · Pydantic
Infra        Self-hosted · Nginx Proxy Manager · Cloudflared
```

## Securite

> Documentation complete : **[SECURITY.md](./SECURITY.md)** (STRIDE, OWASP Top 10)

### Points Cles

| Protection | Implementation |
|------------|----------------|
| **Injection (SQL/XSS)** | SQLAlchemy ORM + bleach sanitization |
| **Auth Admin** | API Key timing-safe (secrets.compare_digest) |
| **Rate Limiting** | 100 req/min (Frontend proxy + Backend middleware) |
| **Logging Securite** | JSON structure avec evenements dedies |
| **Detection Intrusion** | Honeypots + patterns suspicieux |
| **Validation Config** | Blocage au demarrage si config production invalide |

### Evenements de Securite Logues

```
AUTH_SUCCESS / AUTH_FAILURE     # Authentification admin
RATE_LIMIT_TRIGGERED            # Limite de requetes atteinte
SUSPICIOUS_REQUEST              # Pattern d'attaque detecte
HONEYPOT_TRIGGERED              # Scan malveillant detecte
INPUT_REJECTED                  # Validation echouee
```

### Validation Production

L'application **refuse de demarrer** en production si :
- `ADMIN_API_KEY` < 32 caracteres
- `DEBUG` = true
- `ALLOWED_HOSTS` contient "*"
- `CORS_ORIGINS` contient localhost
- `ENABLE_HSTS` = false

### Infra
- **Reverse proxy** : Pas d'exposition directe des services
- **Tunnel** : Cloudflared (pas de port ouvert sur le routeur)
- **Secrets** : Variables d'environnement, jamais dans le code

## Architecture

```
frontend/
├── src/app/           # Pages (App Router)
├── src/components/    # UI + sections
├── src/lib/           # API client, utils, markdown renderer
└── src/types/         # Types partagés

backend/
├── app/routers/       # Endpoints REST
├── app/models/        # ORM SQLAlchemy
├── app/schemas/       # Validation Pydantic
├── app/dependencies/  # Auth, rate limiting
└── app/config.py      # Settings centralisés
```

## Points techniques

**Frontend**
- Composants extraits en sections réutilisables
- Scroll-spy navigation custom
- Animations Framer Motion avec `layoutId` pour les transitions
- Accessibilité : skip link, ARIA live regions, `prefers-reduced-motion`

**Backend**
- Endpoints async (non-bloquants)
- ORM async avec `aiosqlite`
- Logging des tentatives d'auth échouées
- Config via `pydantic-settings` avec validation

## Setup

```bash
# Frontend
cd frontend && npm i && npm run dev

# Backend
cd backend && pip install -r requirements.txt
uvicorn app.main:app --reload
```

Copier `.env.example` → `.env` et générer une clé admin :
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

