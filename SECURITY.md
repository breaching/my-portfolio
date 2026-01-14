# Security Documentation

## Overview
This document outlines the security measures implemented in this portfolio application and provides guidance for secure deployment.

## Security Measures Implemented

### 1. Backend Security (FastAPI)

#### Authentication & Authorization
- **API Key Authentication**: Admin endpoints protected with constant-time API key comparison
- **Endpoints Protected**:
  - `POST /api/projects` - Create project (Admin only)
  - `PATCH /api/projects/{slug}` - Update project (Admin only)
  - `DELETE /api/projects/{slug}` - Delete project (Admin only)
  - `GET /api/contact` - List contact messages (Admin only)
  - `GET /api/contact/{id}` - Get contact message (Admin only)
  - `PATCH /api/contact/{id}/read` - Mark as read (Admin only)
  - `DELETE /api/contact/{id}` - Delete message (Admin only)

#### Input Validation
- **Pydantic Schemas**: All inputs validated with strict schemas
- **Path Traversal Protection**: Slug validation with regex `^[a-zA-Z0-9_-]+$`
- **Email Validation**: Using `email-validator` library
- **Field Length Limits**: All text fields have maximum lengths
- **Request Size Limiting**: Maximum 5MB request body size

#### Security Headers
- `Content-Security-Policy`: Prevents XSS and code injection
- `X-Content-Type-Options`: Prevents MIME type sniffing
- `X-Frame-Options`: Prevents clickjacking
- `X-XSS-Protection`: Legacy XSS protection
- `Referrer-Policy`: Prevents referrer leakage
- `Permissions-Policy`: Restricts browser features
- `Strict-Transport-Security`: Forces HTTPS (commented out for local dev)

#### Rate Limiting
- Default: 100 requests per 60 seconds per IP
- Configurable via environment variables
- IP detection supports proxy headers (X-Forwarded-For, CF-Connecting-IP)

#### HTML Sanitization
- All markdown content sanitized with `bleach` library
- Only safe HTML tags and attributes allowed
- Prevents XSS attacks via user-generated content

#### Error Handling
- Generic error messages in production
- Detailed errors only in debug mode
- All errors logged for monitoring
- No sensitive information disclosure

#### SQL Injection Protection
- SQLAlchemy ORM with parameterized queries
- No raw SQL queries used
- Async session management with automatic rollback

### 2. Frontend Security (Next.js)

#### Security Headers
- `Strict-Transport-Security`: Force HTTPS
- `X-Frame-Options`: Prevent embedding
- `X-Content-Type-Options`: Prevent MIME sniffing
- `X-XSS-Protection`: Legacy XSS protection
- `Referrer-Policy`: Control referrer information
- `Permissions-Policy`: Restrict dangerous features

#### Production Optimizations
- Console logs removed in production
- React Strict Mode enabled
- Powered-by header disabled

#### API Security
- Environment variables for API URL
- No credentials stored in frontend code
- Proper error handling without leaking details

### 3. Configuration Security

#### Environment Variables
All sensitive data stored in environment variables:
- `ADMIN_API_KEY`: Admin authentication (REQUIRED)
- `SMTP_PASSWORD`: Email credentials (if used)
- `DATABASE_URL`: Database connection string
- `CORS_ORIGINS`: Allowed origins

#### CORS Configuration
- Restrictive origins list
- No credentials allowed (`allow_credentials=False`)
- Only necessary methods allowed
- Only required headers exposed

## Deployment Recommendations

### 1. Generate Secure API Key

```bash
# Generate a secure random API key
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Add this to your `.env` file:
```env
ADMIN_API_KEY=your-generated-key-here
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
# Production settings
DEBUG=false
APP_NAME="Portfolio API"

# Database
DATABASE_URL="sqlite+aiosqlite:///./portfolio.db"

# CORS - Add your actual frontend URL
CORS_ORIGINS=["https://yourdomain.com"]

# Security
ADMIN_API_KEY="your-secure-api-key-here"
ENABLE_RATE_LIMITING=true
RATE_LIMIT_CALLS=100
RATE_LIMIT_PERIOD=60
MAX_REQUEST_SIZE=5000000

# SMTP (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
CONTACT_EMAIL="your-email@gmail.com"
```

### 3. Nginx Proxy Manager Configuration

#### Proxy Host Settings
```nginx
# Backend proxy
location /api {
    proxy_pass http://localhost:8000/api;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # Limit request size
    client_max_body_size 5M;
}
```

#### SSL Configuration
- Enable "Force SSL" in Nginx Proxy Manager
- Use Let's Encrypt for automatic SSL certificates
- Enable HTTP/2 for better performance

### 4. Cloudflare Tunnel Configuration

If using Cloudflare Tunnel (cloudflared):

```yaml
# config.yml
tunnel: <your-tunnel-id>
credentials-file: /path/to/credentials.json

ingress:
  - hostname: api.yourdomain.com
    service: http://localhost:8000
  - hostname: yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

#### Cloudflare Dashboard Settings
- Enable "Always Use HTTPS"
- Enable "Automatic HTTPS Rewrites"
- Set SSL/TLS mode to "Full (strict)"
- Enable "Bot Fight Mode"
- Configure rate limiting rules
- Enable "Browser Integrity Check"

### 5. Database Security

#### SQLite Permissions
```bash
# Set restrictive permissions on database file
chmod 600 portfolio.db

# Ensure database directory is not web-accessible
# Never place database in public_html or www directories
```

#### Regular Backups
```bash
# Create automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp portfolio.db "backups/portfolio_${DATE}.db"
# Keep only last 30 days of backups
find backups/ -name "portfolio_*.db" -mtime +30 -delete
```

### 6. Firewall Configuration

```bash
# UFW (Ubuntu Firewall) example
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
# Only if API is directly exposed (not recommended)
# sudo ufw allow 8000/tcp
sudo ufw enable
```

### 7. Process Management

Use systemd for production:

```ini
# /etc/systemd/system/portfolio-api.service
[Unit]
Description=Portfolio API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/user/portfolio/backend
Environment="PATH=/home/user/portfolio/backend/.venv/bin"
ExecStart=/home/user/portfolio/backend/.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### 8. Monitoring & Logging

#### Application Logs
- Logs stored in `/var/log/portfolio/`
- Failed authentication attempts logged
- Rate limit violations logged
- Unhandled exceptions logged

#### Log Rotation
```bash
# /etc/logrotate.d/portfolio
/var/log/portfolio/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data www-data
}
```

## Security Checklist for Production

- [ ] Generate and set secure `ADMIN_API_KEY`
- [ ] Set `DEBUG=false` in production
- [ ] Configure restrictive `CORS_ORIGINS`
- [ ] Enable SSL/TLS with valid certificate
- [ ] Configure firewall to block unnecessary ports
- [ ] Set up automated database backups
- [ ] Configure rate limiting appropriately
- [ ] Review and restrict `ALLOWED_HOSTS`
- [ ] Enable Cloudflare security features
- [ ] Set up log monitoring and alerts
- [ ] Restrict database file permissions
- [ ] Disable API documentation endpoints in production
- [ ] Test authentication on all protected endpoints
- [ ] Verify HTTPS enforcement
- [ ] Test rate limiting functionality
- [ ] Review security headers with securityheaders.com
- [ ] Test for common vulnerabilities (OWASP Top 10)

## Vulnerability Reporting

If you discover a security vulnerability, please:
1. Do NOT create a public GitHub issue
2. Contact the maintainer directly
3. Provide detailed information about the vulnerability
4. Allow reasonable time for patching before disclosure

## Security Updates

### Dependencies
Keep dependencies up to date:

```bash
# Backend
pip install --upgrade pip
pip list --outdated
pip install -U package-name

# Frontend
npm outdated
npm update
```

### Regular Audits
```bash
# Python security audit
pip install safety
safety check

# Node.js security audit
npm audit
npm audit fix
```

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Cloudflare Security Best Practices](https://developers.cloudflare.com/fundamentals/security/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SecurityHeaders.com](https://securityheaders.com/)

## Last Updated
2026-01-08
