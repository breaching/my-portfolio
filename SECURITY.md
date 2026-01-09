# Documentation Securite - Portfolio

> Guide complet de securite, modele de menaces et conformite OWASP.

---

## Table des Matieres

1. [Resume Executif](#1-resume-executif)
2. [Modele de Menaces (STRIDE)](#2-modele-de-menaces-stride)
3. [Mapping OWASP Top 10](#3-mapping-owasp-top-10)
4. [Evenements de Securite](#4-evenements-de-securite)
5. [Configuration Production](#5-configuration-production)
6. [Exemples d'Attaques et Mitigations](#6-exemples-dattaques-et-mitigations)
7. [Checklist Deploiement](#7-checklist-deploiement)

---

## 1. Resume Executif

### Surface d'Attaque

| Composant | Exposition | Risque |
|-----------|-----------|--------|
| Frontend Next.js | Public | Moyen |
| Backend FastAPI | Public (via API) | Eleve |
| Base SQLite | Interne | Faible |
| Admin API | Protege (API Key) | Critique |

### Mesures Implementees

- **Authentification** : API Key avec comparaison timing-safe
- **Validation** : Pydantic strict + sanitization bleach
- **Rate Limiting** : Frontend proxy + Backend middleware
- **Logging** : Evenements de securite structures (JSON)
- **Headers** : CSP, HSTS, X-Frame-Options, etc.
- **Honeypots** : Detection des scans malveillants

---

## 2. Modele de Menaces (STRIDE)

### S - Spoofing (Usurpation d'identite)

| Menace | Impact | Mitigation | Status |
|--------|--------|------------|--------|
| Vol de cle API admin | Critique | Comparaison timing-safe, cle 32+ chars | OK |
| Falsification IP | Moyen | Headers CF-Connecting-IP, X-Real-IP | OK |
| Session hijacking | N/A | Pas de sessions (stateless API) | N/A |

### T - Tampering (Falsification)

| Menace | Impact | Mitigation | Status |
|--------|--------|------------|--------|
| Injection SQL | Critique | ORM SQLAlchemy (requetes parametrees) | OK |
| XSS stored | Eleve | bleach sanitization + react-markdown | OK |
| Modification DB | Critique | Fichier SQLite permissions restrictives | OK |

### R - Repudiation (Non-repudiation)

| Menace | Impact | Mitigation | Status |
|--------|--------|------------|--------|
| Actions admin non tracees | Moyen | Logging JSON structure avec IP masquee | OK |
| Attaques non detectees | Eleve | SecurityLogger avec evenements specifiques | OK |

### I - Information Disclosure

| Menace | Impact | Mitigation | Status |
|--------|--------|------------|--------|
| Stack traces exposees | Moyen | Exception handler sans details en prod | OK |
| Enumeration endpoints | Faible | Messages d'erreur generiques | OK |
| Fuite cle API dans logs | Critique | Filtrage automatique des secrets | OK |

### D - Denial of Service

| Menace | Impact | Mitigation | Status |
|--------|--------|------------|--------|
| Flood de requetes | Eleve | Rate limiting (100 req/min) | OK |
| Requetes volumineuses | Moyen | MAX_REQUEST_SIZE = 5MB | OK |
| Slowloris | Moyen | Timeout Uvicorn + Cloudflare | OK |

### E - Elevation of Privilege

| Menace | Impact | Mitigation | Status |
|--------|--------|------------|--------|
| Acces admin sans auth | Critique | Header X-API-Key obligatoire | OK |
| Path traversal | Eleve | Validation slug alphanumerique | OK |
| IDOR | Moyen | Pas d'ID sequentiels exposes | OK |

---

## 3. Mapping OWASP Top 10 (2021)

### A01:2021 - Broken Access Control

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Acces admin non autorise | API Key obligatoire | `dependencies.py:require_admin_auth()` |
| CORS bypass | Whitelist stricte | `CORSMiddleware(allow_origins=[...])` |
| Directory traversal | Validation inputs | Slugs alphanumeriques uniquement |

**Fichiers concernes** : `dependencies.py:21-61`, `main.py:68-76`

### A02:2021 - Cryptographic Failures

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Cle API faible | Minimum 32 caracteres | `config.py:57-58` |
| Transmission non chiffree | HSTS force | `SecurityHeadersMiddleware` |
| Timing attacks | secrets.compare_digest | `dependencies.py:51` |

**Fichiers concernes** : `config.py:43-58`, `dependencies.py:51`

### A03:2021 - Injection

| Risque | Protection | Implementation |
|--------|------------|----------------|
| SQL Injection | ORM SQLAlchemy | Toutes requetes DB |
| XSS | bleach + react-markdown | `schemas/contact.py`, `lib/markdown.tsx` |
| Command Injection | N/A | Pas d'execution de commandes |

**Fichiers concernes** : `schemas/contact.py`, `services/markdown.py`

### A04:2021 - Insecure Design

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Absence de rate limiting | Middleware dedie | `RateLimitMiddleware` |
| Pas de monitoring | Logging structure | `logging_config.py` |
| Config non validee | Validation startup | `config.py:51-81` |

**Fichiers concernes** : `middleware/security.py:81-145`, `logging_config.py`

### A05:2021 - Security Misconfiguration

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Debug en production | Validation bloquante | `config.py:60-61` |
| CORS * en prod | Validation bloquante | `config.py:63-64` |
| Headers manquants | Middleware automatique | `SecurityHeadersMiddleware` |
| Server header expose | Suppression automatique | `security.py:76` |

**Fichiers concernes** : `config.py:51-81`, `middleware/security.py:22-78`

### A06:2021 - Vulnerable Components

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Dependencies vulnerables | Audit regulier | `pip-audit`, `npm audit` |
| Versions obsoletes | Lock files | `requirements.txt`, `package-lock.json` |

**Commandes audit** :
```bash
# Backend
pip-audit

# Frontend
npm audit
```

### A07:2021 - Identification and Authentication Failures

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Brute force API key | Rate limiting | 100 req/min max |
| Enumeration users | N/A | Pas de systeme utilisateur |
| Logging auth | Logging complet | `SecurityLogger.auth_failure()` |

**Fichiers concernes** : `dependencies.py:51-60`, `logging_config.py:104-112`

### A08:2021 - Software and Data Integrity Failures

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Modification code | Git integrity | Repo versionne |
| CI/CD compromis | N/A | Deploiement manuel |
| Dependances alterees | Lock files | Hash verification |

### A09:2021 - Security Logging and Monitoring Failures

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Logs non structures | JSON formatter | `logging_config.py:19-50` |
| Pas d'alertes | Events specifiques | `SecurityEvent` enum |
| IP non tracee | Logging avec masquage | `SecurityLogger._log()` |

**Evenements logues** :
- `AUTH_SUCCESS` / `AUTH_FAILURE`
- `RATE_LIMIT_TRIGGERED`
- `SUSPICIOUS_REQUEST`
- `HONEYPOT_TRIGGERED`
- `INPUT_REJECTED`
- `ACCESS_DENIED`

### A10:2021 - Server-Side Request Forgery (SSRF)

| Risque | Protection | Implementation |
|--------|------------|----------------|
| Requetes vers localhost | N/A | Pas de fetch externe |
| URL injection | Validation stricte | Pydantic HttpUrl |

---

## 4. Evenements de Securite

### Format des Logs

```json
{
  "timestamp": "2025-01-09T12:34:56.789Z",
  "level": "WARNING",
  "logger": "security",
  "message": "Admin authentication failed: invalid_api_key",
  "security_event": "AUTH_FAILURE",
  "ip": "192.168.1.xxx",
  "path": "/api/projects",
  "details": {"reason": "invalid_api_key"}
}
```

### Types d'Evenements

| Event | Niveau | Declencheur |
|-------|--------|-------------|
| `AUTH_SUCCESS` | INFO | Authentification admin reussie |
| `AUTH_FAILURE` | WARNING | Cle API invalide |
| `RATE_LIMIT_TRIGGERED` | WARNING | Limite de requetes atteinte |
| `INPUT_REJECTED` | WARNING | Validation Pydantic echouee |
| `ACCESS_DENIED` | WARNING | Acces refuse (auth non configuree) |
| `SUSPICIOUS_REQUEST` | WARNING | Pattern d'attaque detecte |
| `HONEYPOT_TRIGGERED` | WARNING | Acces endpoint honeypot |

### Patterns Detectes (SuspiciousRequestMiddleware)

```python
SUSPICIOUS_PATTERNS = [
    "../",           # Path traversal
    "..\\",          # Path traversal Windows
    "<script",       # XSS
    "javascript:",   # XSS
    "' OR ",         # SQL injection
    "\" OR ",        # SQL injection
    "1=1",           # SQL injection
    "UNION SELECT",  # SQL injection
    "/etc/passwd",   # LFI Linux
    "cmd.exe",       # RCE Windows
    "powershell",    # RCE Windows
]
```

### Honeypots

Endpoints qui simulent des cibles d'attaque courantes :

| Endpoint | Cible simulee |
|----------|---------------|
| `/admin`, `/admin/login` | Panel admin generique |
| `/wp-admin`, `/wp-login.php` | WordPress |
| `/.env` | Fichier environnement |
| `/config.php`, `/phpinfo.php` | Configuration PHP |
| `/api/admin/users` | API admin |

---

## 5. Configuration Production

### Variables Obligatoires

```bash
# CRITIQUE - L'application refuse de demarrer sans ces valeurs
ENVIRONMENT=production
DEBUG=false
ADMIN_API_KEY=<minimum_32_caracteres>
ALLOWED_HOSTS=["votre-domaine.com"]
CORS_ORIGINS=["https://votre-domaine.com"]
ENABLE_HSTS=true
```

### Validation au Demarrage

L'application effectue ces verifications en production :

1. `ADMIN_API_KEY` >= 32 caracteres
2. `DEBUG` = false
3. `ALLOWED_HOSTS` ne contient pas "*"
4. `CORS_ORIGINS` ne contient pas localhost
5. `ENABLE_HSTS` = true

**En cas d'erreur, l'application refuse de demarrer** avec un message explicite.

### Exemple de Configuration

```bash
# Production
ENVIRONMENT=production
DEBUG=false
ADMIN_API_KEY=Kj8mN2pL9qR4sT6vW8xY0zA3bC5dE7fG9hI1jK3lM5nO7pQ9
CORS_ORIGINS=["https://dubus.pro"]
ALLOWED_HOSTS=["dubus.pro", "api.dubus.pro"]
ENABLE_HSTS=true
ENABLE_RATE_LIMITING=true
RATE_LIMIT_CALLS=100
RATE_LIMIT_PERIOD=60
LOG_LEVEL=WARNING
LOG_FORMAT=json
```

---

## 6. Exemples d'Attaques et Mitigations

### SQL Injection

**Attaque** :
```
GET /api/projects?slug=' OR '1'='1
```

**Reponse** : 400 Bad Request (SuspiciousRequestMiddleware)

**Log** :
```json
{
  "security_event": "SUSPICIOUS_REQUEST",
  "reason": "suspicious_pattern:' OR "
}
```

### XSS via Contact Form

**Attaque** :
```json
{
  "name": "<script>alert('xss')</script>",
  "email": "test@test.com",
  "subject": "Test",
  "message": "<img src=x onerror=alert('xss')>"
}
```

**Resultat** : Donnees sanitizees par bleach
```json
{
  "name": "alert('xss')",
  "message": ""
}
```

### Brute Force API Key

**Attaque** : Tentatives multiples avec differentes cles

**Reponse** : 429 Too Many Requests (apres 100 tentatives/min)

**Log** :
```json
{
  "security_event": "AUTH_FAILURE",
  "ip": "192.168.1.xxx",
  "reason": "invalid_api_key"
}
```

### Path Traversal

**Attaque** :
```
GET /api/projects/../../etc/passwd
```

**Reponse** : 400 Bad Request

**Log** :
```json
{
  "security_event": "SUSPICIOUS_REQUEST",
  "reason": "suspicious_pattern:../"
}
```

### Scanner Detection

**Attaque** :
```
GET /wp-admin
User-Agent: nikto/2.1.5
```

**Reponse** : 404 Not Found (honeypot)

**Log** :
```json
{
  "security_event": "HONEYPOT_TRIGGERED",
  "path": "/wp-admin",
  "user_agent": "nikto/2.1.5"
}
```

---

## 7. Checklist Deploiement

### Avant Mise en Production

- [ ] `ENVIRONMENT=production` configure
- [ ] `DEBUG=false` verifie
- [ ] `ADMIN_API_KEY` genere (32+ caracteres)
- [ ] `CORS_ORIGINS` sans localhost
- [ ] `ALLOWED_HOSTS` specifiques (pas de "*")
- [ ] `ENABLE_HSTS=true` active
- [ ] Certificat SSL/TLS valide
- [ ] `pip-audit` execute sans vulnerabilites critiques
- [ ] `npm audit` execute sans vulnerabilites critiques
- [ ] Logs accessibles et structures (JSON)
- [ ] Backup base de donnees configure
- [ ] Firewall configure (seuls ports 80/443 exposes)

### Tests de Securite

```bash
# Backend - Tests automatises
python test_security.py --url https://api.votre-domaine.com --api-key <KEY>

# Audit dependances
cd backend && pip-audit
cd frontend && npm audit

# Scan headers (externe)
curl -I https://votre-domaine.com | grep -E "^(X-|Content-Security|Strict)"
```

### Monitoring

1. **Alerter sur** :
   - `AUTH_FAILURE` repetes (>5/min d'une meme IP)
   - `HONEYPOT_TRIGGERED` (investigation requise)
   - `RATE_LIMIT_TRIGGERED` massifs

2. **Metriques a suivre** :
   - Nombre de requetes 4xx/5xx
   - Temps de reponse moyen
   - Requetes par IP unique

---

## 8. Justification des Choix Techniques

### Pourquoi API Key vs JWT/OAuth ?

| Critere | API Key | JWT | OAuth |
|---------|---------|-----|-------|
| Complexite | Simple | Moyenne | Elevee |
| Use case | Single admin | Multi-users | Federation |
| Stateless | Oui | Oui | Non |
| Rotation | Manuelle | Auto (expiry) | Via provider |

**Choix : API Key** car :
- Un seul admin (moi)
- Pas de gestion de sessions
- Simplicite de deploiement self-hosted
- Comparaison timing-safe pour eviter les timing attacks

### Pourquoi SQLite vs PostgreSQL ?

| Critere | SQLite | PostgreSQL |
|---------|--------|------------|
| Deploiement | Fichier unique | Serveur separe |
| Backup | `cp portfolio.db backup.db` | pg_dump |
| Concurrence | Limitee | Excellente |
| Resources | Minimal | ~100MB RAM min |

**Choix : SQLite** car :
- Self-hosted sur hardware local
- Traffic faible (portfolio personnel)
- Pas de serveur DB a maintenir
- Backup trivial

### Pourquoi Rate Limiting In-Memory vs Redis ?

| Critere | In-Memory | Redis |
|---------|-----------|-------|
| Deploiement | Aucun | Service additionnel |
| Multi-worker | Non | Oui |
| Persistance | Non | Oui |
| Latence | ~0ms | ~1ms |

**Choix : In-Memory** car :
- Single instance (pas de workers multiples)
- Pas de persistance necessaire
- Evite une dependance externe

---

## 9. Limites Connues

### Limitations Architecturales

| Limite | Impact | Mitigation |
|--------|--------|------------|
| Single instance | Pas de HA | Acceptable pour portfolio |
| Rate limit in-memory | Reset au redemarrage | Impact faible |
| SQLite mono-writer | Bottleneck ecriture | Traffic faible |
| Pas de WAF complet | Patterns limites | Cloudflare en amont |

### Fonctionnalites Non Implementees

- **2FA** : Non necessaire (API key seule)
- **Session management** : API stateless
- **Audit trail complet** : Logs basiques suffisants
- **Encryption at rest** : Non necessaire (pas de donnees sensibles)

### Risques Residuels Acceptes

1. **DoS niveau application** : Mitige par Cloudflare + rate limiting
2. **Enumeration lente** : Possible mais rate limited
3. **Zero-day dependencies** : Monitore via audits reguliers

---

## 10. Rotation des Secrets

### Procedure de Rotation API Key

```bash
# 1. Generer nouvelle cle
python -c "import secrets; print(secrets.token_urlsafe(32))"

# 2. Mettre a jour .env
ADMIN_API_KEY=<nouvelle_cle>

# 3. Redemarrer le backend
systemctl restart portfolio-backend

# 4. Mettre a jour les clients (si applicable)
```

### Frequence Recommandee

| Secret | Frequence | Declencheur |
|--------|-----------|-------------|
| ADMIN_API_KEY | Annuelle | Ou si compromis |
| Certificat TLS | Auto (Let's Encrypt) | - |
| Cloudflare Tunnel | Jamais | Gere par Cloudflare |

---

## References

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [STRIDE Threat Model](https://docs.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)

---

*Document genere le 9 Janvier 2025 - Version 1.1*
