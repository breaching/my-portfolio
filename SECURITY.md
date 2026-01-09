# Securite

Ce portfolio est volontairement sur-securise. Pour m'exercer, pas parce qu'un portfolio a besoin de tout ca.

## Architecture

```
Internet -> Cloudflare (DDoS, TLS) -> Nginx Proxy -> App
```

Trois couches. Si une tombe, les autres tiennent.

## Ce qui est implemente

### Protection des endpoints admin

- API Key comparee en timing-safe (`secrets.compare_digest`)
- Brute force : 5 echecs = IP bloquee 15 min
- Pas de stack traces en prod

### Rate limiting

- Global : 100 req/min par IP
- Contact form : 5 soumissions/heure par IP
- Headers `Retry-After` sur les 429

### Detection d'intrusion

Honeypots sur les endpoints classiques des scanners :
```
/wp-admin, /wp-login.php, /.env, /phpinfo.php, /admin
```

Quand quelqu'un tape dessus, je log l'IP et le user-agent. Ca me dit qui scanne.

Patterns suspects bloques automatiquement :
- `' OR '1'='1` (SQLi)
- `../../../` (path traversal)
- `<script>` (XSS)

### Logging

Tout est logue en JSON :

```json
{"timestamp": "...", "event": "AUTH_FAILURE", "ip": "192.168.x.x", "path": "/api/projects"}
```

Events : `AUTH_SUCCESS`, `AUTH_FAILURE`, `RATE_LIMIT_TRIGGERED`, `SUSPICIOUS_REQUEST`, `HONEYPOT_TRIGGERED`

### Validation startup

En prod, l'app check au demarrage :
- Cle API >= 32 chars
- Debug = false
- CORS sans localhost
- HSTS active

Si c'est pas bon, elle refuse de boot. Pas de config faible possible.

## OWASP Top 10

| Risque | Comment c'est gere |
|--------|-------------------|
| Injection | ORM + bleach sanitization |
| Auth cassee | Timing-safe + brute force protection |
| Sensitive data | HTTPS force, pas de secrets dans les logs |
| Security misconfig | Validation au boot |
| XSS | Sanitization input + react-markdown |

## Choix techniques

**API Key plutot que JWT** : Un seul admin (moi). JWT c'est overkill.

**SQLite plutot que Postgres** : Self-hosted, peu de trafic. Un fichier suffit.

**Rate limit in-memory** : Single instance. Redis serait overkill.

## Limites

- Pas de HA (une seule instance)
- Rate limit reset au restart
- Pas de WAF complet (Cloudflare fait le gros du boulot)

C'est un portfolio, pas une banque. Ces limites sont acceptables.

## Rotation des cles

```bash
# Generer nouvelle cle
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Mettre a jour .env, restart
```

A faire une fois par an ou si compromis.

## Tests

```bash
python test_security.py --url http://localhost:8000

# Teste : headers, auth, rate limit, XSS, honeypots, brute force...
```
