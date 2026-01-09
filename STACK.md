# Stack Technique - Portfolio Alexis Dubus

> Vue d'ensemble complète de l'architecture, des technologies et des implémentations de sécurité.

---

## Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE                              │
│                    (Tunnel + Protection DDoS)                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NGINX PROXY MANAGER                          │
│                  (Reverse Proxy + SSL/TLS)                      │
└─────────────────────────────────────────────────────────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              ▼                                   ▼
┌──────────────────────────┐       ┌──────────────────────────┐
│       FRONTEND           │       │        BACKEND           │
│    Next.js 16 (3000)     │◄─────►│    FastAPI (8000)        │
│    React 19 + TS         │       │    SQLAlchemy Async      │
│    Tailwind CSS 4        │       │    SQLite + aiosqlite    │
└──────────────────────────┘       └──────────────────────────┘
```

---

## 1. Frontend

### Technologies

| Technologie | Version | Usage |
|------------|---------|-------|
| Next.js | 16.1.1 | Framework React (App Router) |
| React | 19.2.3 | UI Library |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 4.x | Styling utility-first |
| Framer Motion | 12.x | Animations |
| Phosphor Icons | 2.1.10 | Icônes |
| react-markdown | 10.1.0 | Rendu Markdown sécurisé |

### Structure

```
frontend/src/
├── app/                    # Pages (App Router)
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Layout racine
│   ├── blog/
│   │   ├── page.tsx       # Liste des posts
│   │   └── [slug]/page.tsx # Post dynamique
│   ├── contact/page.tsx
│   ├── parcours/page.tsx
│   ├── robots.ts          # robots.txt généré
│   └── sitemap.ts         # sitemap.xml généré
├── components/
│   ├── sections/          # Sections homepage
│   ├── layout/            # Navbar, Footer
│   ├── ui/                # Composants réutilisables
│   └── blog/              # Composants blog
├── lib/
│   ├── api.ts             # Client API
│   ├── posts.ts           # Loader markdown
│   ├── markdown.tsx       # Renderer sécurisé
│   └── utils.ts           # Utilitaires
├── content/posts/         # Articles en Markdown
├── types/                 # Interfaces TypeScript
└── proxy.ts               # Middleware sécurité
```

### Configuration

**next.config.ts** - Optimisations et sécurité :
- `poweredByHeader: false` - Cache la version Next.js
- `removeConsole` en production
- `reactStrictMode: true`
- Security headers (voir section Sécurité)

---

## 2. Backend

### Technologies

| Technologie | Version | Usage |
|------------|---------|-------|
| FastAPI | 0.109+ | Framework API async |
| Uvicorn | 0.27+ | Serveur ASGI |
| SQLAlchemy | 2.0+ | ORM async |
| aiosqlite | 0.19+ | Driver SQLite async |
| Pydantic | 2.5+ | Validation données |
| bleach | 6.1+ | Sanitization HTML |
| python-frontmatter | 1.0+ | Parsing Markdown |

### Structure

```
backend/
├── app/
│   ├── models/            # Modèles SQLAlchemy
│   │   ├── project.py
│   │   └── contact.py
│   ├── schemas/           # Schémas Pydantic
│   │   ├── project.py
│   │   └── contact.py
│   ├── routers/           # Endpoints API
│   │   ├── projects.py
│   │   └── contact.py
│   ├── middleware/
│   │   └── security.py    # Headers + Rate limiting
│   ├── services/
│   │   └── markdown.py    # Service parsing MD
│   ├── config.py          # Settings centralisés
│   ├── database.py        # Connexion DB async
│   └── dependencies.py    # Auth + injections
├── main.py                # Point d'entrée
├── test_security.py       # Tests de sécurité
└── requirements.txt
```

### Endpoints API

#### Projects (CRUD)
```
GET    /api/projects              # Liste paginée
GET    /api/projects/categories   # Catégories uniques
GET    /api/projects/{slug}       # Détail
POST   /api/projects              # Créer (admin)
PATCH  /api/projects/{slug}       # Modifier (admin)
DELETE /api/projects/{slug}       # Supprimer (admin)
```

#### Contact
```
POST   /api/contact               # Soumettre message
GET    /api/contact               # Liste (admin)
GET    /api/contact/{id}          # Détail (admin)
PATCH  /api/contact/{id}/read     # Marquer lu (admin)
DELETE /api/contact/{id}          # Supprimer (admin)
```

#### Système
```
GET    /                          # Status
GET    /health                    # Health check
```

---

## 3. Base de Données

### SQLite + SQLAlchemy Async

**Pourquoi SQLite ?**
- Simple pour self-hosting
- Pas de serveur DB à maintenir
- Performances suffisantes pour un portfolio
- Fichier unique (`portfolio.db`)

### Schéma

```sql
-- Table projects
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    category VARCHAR(50) NOT NULL,
    tags TEXT,  -- JSON array
    date VARCHAR(20),
    image VARCHAR(500),
    github VARCHAR(500),
    demo VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table contact_messages
CREATE TABLE contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX ix_projects_slug ON projects(slug);
```

### Configuration Connexion

```python
# database.py
DATABASE_URL = "sqlite+aiosqlite:///./portfolio.db"

engine = create_async_engine(
    DATABASE_URL,
    echo=False,  # Pas de logs SQL en prod
)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

---

## 4. Securite

> **Documentation complete** : Voir [SECURITY.md](./SECURITY.md) pour le modele STRIDE, mapping OWASP Top 10 et exemples d'attaques.

### Frontend - Headers HTTP

**next.config.ts** :
```typescript
headers: [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()..." },
  { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'..." }
]
```

### Frontend - Proxy Middleware

**proxy.ts** :
```typescript
// Rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000;  // 1 minute
const MAX_REQUESTS = 100;

// User-agents bloqués
const BLOCKED_USER_AGENTS = [
  "wget", "curl", "python-requests", "scrapy",
  "nikto", "sqlmap", "nmap", "masscan"...
];

// Détection IP (Cloudflare compatible)
const ip = request.headers.get("cf-connecting-ip")
        || request.headers.get("x-real-ip")
        || request.headers.get("x-forwarded-for");
```

### Frontend - robots.txt

**robots.ts** - Bloque les crawlers IA :
```typescript
rules: [
  { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
  { userAgent: "GPTBot", disallow: "/" },
  { userAgent: "ChatGPT-User", disallow: "/" },
  { userAgent: "CCBot", disallow: "/" },
  { userAgent: "anthropic-ai", disallow: "/" },
  { userAgent: "Google-Extended", disallow: "/" },
  { userAgent: "Bytespider", disallow: "/" },
  // + AhrefsBot, SemrushBot, MJ12bot, DotBot
]
```

### Backend - Authentification Admin

**dependencies.py** :
```python
async def require_admin_auth(x_api_key: str = Header(...)):
    settings = get_settings()

    # Comparaison timing-safe (anti timing attack)
    if not secrets.compare_digest(x_api_key, settings.admin_api_key):
        logger.warning(f"Invalid API key attempt")
        raise HTTPException(status_code=401)
```

### Backend - Validation Pydantic

**schemas/contact.py** :
```python
class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=5, max_length=200)
    message: str = Field(min_length=10, max_length=5000)

    @field_validator("name", "subject", "message")
    def sanitize_html(cls, v):
        # Supprime tout HTML (anti-XSS)
        return bleach.clean(v, tags=[], strip=True)
```

### Backend - Rate Limiting

**middleware/security.py** :
```python
class RateLimitMiddleware:
    def __init__(self, calls: int = 100, period: int = 60):
        self.calls = calls
        self.period = period
        self.requests = {}  # IP -> [(timestamp, count)]

    async def __call__(self, request, call_next):
        ip = self.get_client_ip(request)

        if self.is_rate_limited(ip):
            return JSONResponse(
                status_code=429,
                headers={"Retry-After": str(self.period)},
                content={"detail": "Too many requests"}
            )
```

### Backend - Headers Sécurité

**middleware/security.py** :
```python
class SecurityHeadersMiddleware:
    async def __call__(self, request, call_next):
        response = await call_next(request)

        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Content-Security-Policy"] = "default-src 'none'"
        response.headers["Permissions-Policy"] = "camera=(), microphone=()..."

        # HSTS uniquement en HTTPS
        if self.enable_hsts and request.url.scheme == "https":
            response.headers["Strict-Transport-Security"] = "max-age=31536000"

        return response
```

### Backend - Sanitization Markdown

**services/markdown.py** :
```python
ALLOWED_TAGS = [
    "a", "abbr", "b", "blockquote", "code", "em", "i",
    "li", "ol", "pre", "strong", "ul", "h1", "h2", "h3",
    "h4", "h5", "h6", "p", "br", "span", "div", "table",
    "thead", "tbody", "tr", "th", "td", "img", "hr"
]

ALLOWED_ATTRIBUTES = {
    "a": ["href", "title", "rel"],
    "img": ["src", "alt"],
    "*": ["class"]
}

ALLOWED_PROTOCOLS = ["http", "https", "mailto"]

def sanitize_html(content: str) -> str:
    return bleach.clean(
        content,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        protocols=ALLOWED_PROTOCOLS,
        strip=True
    )
```

---

## 5. Variables d'Environnement

### Frontend (.env)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```bash
# Application
DEBUG=false
DATABASE_URL=sqlite+aiosqlite:///./portfolio.db

# Sécurité
ADMIN_API_KEY=<généré avec secrets.token_urlsafe(32)>
CORS_ORIGINS=["https://dubus.pro"]
ALLOWED_HOSTS=["dubus.pro", "www.dubus.pro"]

# Rate Limiting
ENABLE_RATE_LIMITING=true
RATE_LIMIT_CALLS=100
RATE_LIMIT_PERIOD=60

# HSTS
ENABLE_HSTS=true

# SMTP (optionnel)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
CONTACT_EMAIL=
```

---

## 6. Déploiement

### Architecture Self-Hosted

```
Internet
    │
    ▼
Cloudflare (DNS + Tunnel)
    │
    ▼
Cloudflared Daemon (serveur local)
    │
    ▼
Nginx Proxy Manager
    │
    ├── dubus.pro → localhost:3000 (Frontend)
    └── api.dubus.pro → localhost:8000 (Backend)
```

### Commandes

**Frontend :**
```bash
cd frontend
npm install
npm run build
npm start  # Production sur :3000
```

**Backend :**
```bash
cd backend
pip install -r requirements.txt
python -c "import secrets; print(secrets.token_urlsafe(32))"  # Générer clé
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Génération Clé Admin
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
# Exemple: Kj8mN2pL9qR4sT6vW8xY0zA3bC5dE7fG9hI1jK3lM5n
```

---

## 7. Tests de Sécurité

**test_security.py** - Suite de tests automatisés :

```bash
python test_security.py --url http://localhost:8000 --api-key <KEY>
```

Tests inclus :
1. ✓ Validation headers de sécurité
2. ✓ Auth admin (no key, wrong key, valid key)
3. ✓ Rate limiting (429 après limite)
4. ✓ Validation input + prévention XSS
5. ✓ Configuration CORS
6. ✓ Pas de stack trace exposée
7. ✓ Documentation API accessible

---

## 8. Résumé Métriques

| Catégorie | Nombre |
|-----------|--------|
| Pages Frontend | 6 |
| Composants React | 14+ |
| Endpoints API | 11 |
| Modèles DB | 2 |
| Schémas Validation | 5 |
| Headers Sécurité | 8+ |
| Middlewares | 5 |
| Dépendances Frontend | 6 |
| Dépendances Backend | 12 |

---

## 9. Points Forts Sécurité

| Protection | Implémentation |
|------------|----------------|
| XSS | react-markdown + bleach sanitization |
| SQL Injection | SQLAlchemy ORM (requêtes paramétrées) |
| CSRF | SameSite cookies + CORS strict |
| Timing Attack | secrets.compare_digest() |
| Rate Limiting | Frontend proxy + Backend middleware |
| Scraping | robots.txt + user-agent blocking |
| Headers | CSP, HSTS, X-Frame-Options, etc. |
| Auth | API key avec comparaison timing-safe |
| Input Validation | Pydantic strict + regex patterns |
| Path Traversal | Validation slugs alphanumériques |

---

*Dernière mise à jour : Janvier 2025*
