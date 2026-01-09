---
title: "Securiser un portfolio : defense en profondeur"
description: "Comment j'ai implemente une architecture de securite complete pour ce portfolio. OWASP Top 10, threat modeling STRIDE, et preuves d'attaques bloquees."
type: "projet"
date: "2025-01-10"
tags: ["Securite", "OWASP", "FastAPI", "Next.js", "DevSecOps"]
---

## Le contexte

Ce portfolio n'est pas juste une vitrine. C'est une demonstration de competences en securite applicative. L'objectif : implementer une architecture de securite complete, documentee, et testable.

## Architecture de defense

### 3 couches de protection

```
Internet
    |
    v
[Cloudflare] -----> DDoS protection, TLS 1.3, WAF
    |
    v
[Nginx Proxy] ----> Isolation, headers securite
    |
    v
[Application] ----> Rate limiting, validation, logging
```

Chaque couche a un role specifique. Si une couche est compromise, les autres restent actives.

## Conformite OWASP Top 10

| Risque | Protection |
|--------|------------|
| **A01 - Broken Access Control** | API Key timing-safe + CORS whitelist |
| **A02 - Cryptographic Failures** | HSTS force + secrets.compare_digest |
| **A03 - Injection** | ORM SQLAlchemy + bleach sanitization |
| **A05 - Security Misconfiguration** | Validation bloquante au demarrage |
| **A07 - Auth Failures** | Brute force protection (5 tentatives = 15min block) |
| **A09 - Logging Failures** | Logs JSON structures avec events securite |

## Threat Model (STRIDE)

J'ai applique la methodologie STRIDE pour identifier les menaces :

- **Spoofing** : Comparaison timing-safe des credentials
- **Tampering** : ORM uniquement, pas de SQL brut
- **Repudiation** : Logging de toutes les actions admin
- **Information Disclosure** : Pas de stack traces en prod
- **Denial of Service** : Rate limiting multi-niveau
- **Elevation of Privilege** : Validation stricte des inputs

## Implementations techniques

### Protection brute force

```python
# Apres 5 echecs d'auth, l'IP est bloquee 15 minutes
if len(failed_attempts[ip]) >= 5:
    blocked_ips[ip] = current_time + 900
    security_logger.log("BRUTE_FORCE_BLOCKED", ip=ip)
```

### Honeypots

Des endpoints pieges detectent les scans malveillants :

```python
@app.get("/wp-admin")
@app.get("/.env")
@app.get("/phpinfo.php")
async def honeypot(request: Request):
    security_logger.honeypot_triggered(ip, path)
    return JSONResponse(status_code=404)
```

Quand un scanner teste `/wp-admin`, je le sais immediatement.

### Validation au demarrage

L'application refuse de demarrer en production si :

- `ADMIN_API_KEY` < 32 caracteres
- `DEBUG` = true
- `ALLOWED_HOSTS` contient "*"
- `ENABLE_HSTS` = false

Pas de config faible possible.

## Exemples d'attaques bloquees

| Attaque | Payload | Resultat |
|---------|---------|----------|
| SQL Injection | `' OR '1'='1` | 400 Bad Request |
| XSS | `<script>alert(1)</script>` | Input sanitized |
| Path Traversal | `../../../etc/passwd` | 400 Bad Request |
| Brute Force | 5+ failed auth | 429 + 15min block |
| Scanner | `GET /wp-admin` | Logged + 404 |

## Logging securite

Chaque evenement de securite est logue en JSON structure :

```json
{
  "timestamp": "2025-01-10T12:34:56Z",
  "level": "WARNING",
  "security_event": "AUTH_FAILURE",
  "ip": "192.168.1.xxx",
  "path": "/api/projects",
  "reason": "invalid_api_key"
}
```

Events traces : `AUTH_SUCCESS`, `AUTH_FAILURE`, `RATE_LIMIT_TRIGGERED`, `SUSPICIOUS_REQUEST`, `HONEYPOT_TRIGGERED`.

## Tests automatises

Suite de 11 categories de tests de securite :

```bash
python test_security.py --url https://api.example.com

[1] Testing Security Headers... OK
[2] Testing Authentication... OK
[3] Testing Rate Limiting... OK
[4] Testing Input Validation... OK
[5] Testing CORS... OK
[6] Testing Error Handling... OK
[7] Testing API Documentation... OK
[8] Testing Honeypots... OK
[9] Testing Suspicious Patterns... OK
[10] Testing Contact Rate Limit... OK
[11] Testing Brute Force Protection... OK

SUMMARY: 35/35 tests passed
```

## Choix techniques justifies

**Pourquoi API Key vs JWT ?**
Un seul admin (moi). JWT ajouterait de la complexite sans benefice. La cle est comparee de facon timing-safe.

**Pourquoi SQLite ?**
Self-hosted, traffic faible. Pas besoin d'un serveur PostgreSQL. Backup = `cp portfolio.db backup.db`.

**Pourquoi rate limiting in-memory ?**
Single instance, pas de workers multiples. Redis serait overkill.

## Limites connues

- Pas de HA (single instance)
- Rate limit reset au redemarrage
- Pas de WAF applicatif complet (Cloudflare en amont)

Ces limites sont acceptables pour un portfolio personnel.

## Ce que j'ai appris

1. **Defense in depth** : plusieurs couches independantes
2. **STRIDE** : methodologie structuree pour identifier les menaces
3. **OWASP Top 10** : checklist concrete de vulnerabilites a couvrir
4. **Security logging** : les logs structures changent tout pour le monitoring
5. **Fail secure** : l'app refuse de demarrer si la config est faible
