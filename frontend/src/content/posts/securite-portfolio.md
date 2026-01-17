---
title: "Sécuriser un portfolio : défense en profondeur"
description: "Comment j'ai implémenté une architecture de sécurité complète pour ce portfolio. OWASP Top 10, threat modeling STRIDE, et preuves d'attaques bloquées."
type: "projet"
date: "2026-01-06"
tags: ["Securite", "OWASP", "Next.js", "DevSecOps"]
github: "https://github.com/breaching/my-portfolio"
---

## Le contexte

Ce portfolio n'est pas juste une vitrine. C'est une démonstration de compétences en sécurité applicative. L'objectif : implémenter une architecture de sécurité complète, documentée et testable.

## Architecture de defense

### 3 couches de protection

```
Internet
    |
    v
[Cloudflare] -----> DDoS protection, TLS 1.3, WAF
    |
    v
[Next.js Middleware] --> Rate limiting, honeypots, validation
    |
    v
[Application] ----> Input sanitization, CSP, security headers
```

Chaque couche a un rôle spécifique. Si une couche est compromise, les autres restent actives.

## Conformite OWASP Top 10

| Risque | Protection |
|--------|------------|
| **A01 - Broken Access Control** | CSP strict + frame-ancestors 'none' |
| **A02 - Cryptographic Failures** | HSTS force + TLS 1.3 via Cloudflare |
| **A03 - Injection** | Input sanitization + pattern detection |
| **A05 - Security Misconfiguration** | Headers sécurité complets |
| **A07 - Auth Failures** | Rate limiting (5 contacts/15min) |
| **A09 - Logging Failures** | Logs JSON structurés pour tous les events sécurité |

## Threat Model (STRIDE)

J'ai appliqué la méthodologie STRIDE pour identifier les menaces :

- **Spoofing** : Honeypot dans le formulaire pour piéger les bots
- **Tampering** : Sanitization de tous les inputs
- **Repudiation** : Logging structuré de toutes les requêtes suspectes
- **Information Disclosure** : Pas de stack traces, headers X-Powered-By désactivés
- **Denial of Service** : Rate limiting multi-niveau (global + formulaire)
- **Elevation of Privilege** : Pas d'admin, architecture statique

## Implementations techniques

### Middleware de sécurité (Next.js)

```typescript
// Rate limiting global : 100 req/min
if (!checkRateLimit(ip)) {
  logSecurityEvent("RATE_LIMIT_EXCEEDED", ip, pathname);
  return new NextResponse("Too Many Requests", { status: 429 });
}

// Rate limiting contact : 5 tentatives/15min
if (!checkContactRateLimit(ip)) {
  logSecurityEvent("CONTACT_RATE_LIMIT", ip, pathname);
  return new NextResponse("Too Many Requests", { status: 429 });
}
```

### Honeypots

Des endpoints pièges détectent les scans malveillants :

```typescript
const HONEYPOT_PATHS = [
  "/wp-admin", "/.env", "/phpinfo.php",
  "/phpmyadmin", "/.git/config", "/backup.sql"
];

if (isHoneypotPath(pathname)) {
  logSecurityEvent("HONEYPOT_TRIGGERED", ip, pathname);
  blockedIPs.set(ip, Date.now() + BLOCK_DURATION);
  return new NextResponse("Not Found", { status: 404 });
}
```

Quand un scanner teste `/wp-admin`, l'IP est bloquée 15 minutes.

### Détection de patterns malveillants

```typescript
const SUSPICIOUS_PATTERNS = [
  // SQL Injection
  /('|")\s*(or|and)\s*('|")?1('|")?\s*=\s*('|")?1/i,
  /union\s+(all\s+)?select/i,

  // XSS
  /<script[\s>]/i,
  /javascript:/i,

  // Path Traversal
  /\.\.\//,
  /%2e%2e%2f/i,
];

if (hasSuspiciousPattern(fullUrl)) {
  logSecurityEvent("SUSPICIOUS_REQUEST", ip, pathname);
  return new NextResponse("Bad Request", { status: 400 });
}
```

### Honeypot formulaire

Un champ invisible piège les bots qui remplissent tous les champs :

```typescript
// Honeypot check - if filled, it's a bot
if (honeypot) {
  // Silently "succeed" to not reveal the trap
  setFormStatus("success");
  return;
}
```

### Validation et sanitization des inputs

```typescript
// Sanitize HTML entities
function sanitizeHtml(input: string): string {
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char]);
}

// Validate before sending
const validation = validateContactInput(formData);
if (!validation.valid) {
  setFormError(validation.errors.join(". "));
  return;
}
```

## Security Headers

```typescript
// Headers configurés dans next.config.ts
{
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Content-Security-Policy": "default-src 'self'; frame-ancestors 'none'..."
}
```

## Exemples d'attaques bloquees

| Attaque | Payload | Resultat |
|---------|---------|----------|
| SQL Injection | `' OR '1'='1` | 400 Bad Request |
| XSS | `<script>alert(1)</script>` | Input sanitized |
| Path Traversal | `../../../etc/passwd` | 400 Bad Request |
| Rate Limit | 100+ req/min | 429 + Retry-After |
| Scanner | `GET /wp-admin` | Logged + 404 + IP blocked |
| Bot spam | Honeypot filled | Silent success (no email) |

## Logging securite

Chaque événement de sécurité est logué en JSON structuré :

```json
{
  "timestamp": "2026-01-17T12:34:56Z",
  "level": "WARNING",
  "security_event": "HONEYPOT_TRIGGERED",
  "ip": "192.168.1.xxx",
  "path": "/wp-admin"
}
```

Événements tracés :
- `RATE_LIMIT_EXCEEDED`
- `HONEYPOT_TRIGGERED`
- `SUSPICIOUS_REQUEST`
- `IP_BLOCKED`
- `CONTACT_RATE_LIMIT`

## Choix techniques justifiés

**Pourquoi Next.js middleware ?**
Edge runtime, exécution avant le rendu. Bloque les attaques au plus tôt.

**Pourquoi Formspree ?**
Service externe = pas de backend à sécuriser. Moins de surface d'attaque.

**Pourquoi rate limiting in-memory ?**
Single instance, pas de workers multiples. Redis serait overkill.

## Limites connues

- Rate limit reset au redémarrage
- Pas de WAF applicatif complet (Cloudflare en amont)
- In-memory storage = pas de persistence

Ces limites sont acceptables pour un portfolio personnel.

## Ce que j'ai appris

1. **Défense en profondeur** : plusieurs couches indépendantes
2. **STRIDE** : méthodologie structurée pour identifier les menaces
3. **OWASP Top 10** : checklist concrète de vulnérabilités à couvrir
4. **Security logging** : les logs structurés changent tout pour le monitoring
5. **Minimal attack surface** : pas de backend = moins de risques
