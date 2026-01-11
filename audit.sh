#!/bin/bash
#
# Audit securite complet - Portfolio Self-Hosted
# Usage: chmod +x audit.sh && sudo ./audit.sh
#

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
WARN=0
FAIL=0

pass() { echo -e "${GREEN}[PASS]${NC} $1"; ((PASS++)); }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; ((WARN++)); }
fail() { echo -e "${RED}[FAIL]${NC} $1"; ((FAIL++)); }
info() { echo -e "${BLUE}[INFO]${NC} $1"; }
header() { echo -e "\n${BLUE}=== $1 ===${NC}"; }

# Check root
if [ "$EUID" -ne 0 ]; then
    echo "Run as root: sudo ./audit.sh"
    exit 1
fi

echo ""
echo "========================================"
echo "   AUDIT SECURITE - PORTFOLIO"
echo "   $(date)"
echo "========================================"

# ==========================================
header "1. SERVICES"
# ==========================================

for svc in portfolio-api portfolio-web cloudflared nginx; do
    if systemctl is-active --quiet $svc; then
        pass "$svc actif"
    else
        fail "$svc inactif"
    fi
done

# ==========================================
header "2. PORTS OUVERTS"
# ==========================================

# Seul SSH devrait ecouter sur 0.0.0.0
EXPOSED=$(ss -tlnp | grep "0.0.0.0" | grep -v ":22" | wc -l)
if [ "$EXPOSED" -eq 0 ]; then
    pass "Aucun port expose (sauf SSH)"
else
    fail "Ports exposes sur 0.0.0.0 :"
    ss -tlnp | grep "0.0.0.0" | grep -v ":22"
fi

# Verifier que 80/443 ne sont PAS ouverts
if ss -tlnp | grep -q ":80 "; then
    warn "Port 80 ecoute (devrait passer par tunnel)"
fi
if ss -tlnp | grep -q ":443 "; then
    warn "Port 443 ecoute (devrait passer par tunnel)"
fi

# ==========================================
header "3. FIREWALL (UFW)"
# ==========================================

if ufw status | grep -q "Status: active"; then
    pass "UFW actif"
else
    fail "UFW inactif - run: ufw enable"
fi

if ufw status | grep -q "22.*ALLOW"; then
    pass "SSH autorise"
else
    warn "Regle SSH non trouvee"
fi

# Verifier default deny
if ufw status verbose | grep -q "Default: deny (incoming)"; then
    pass "Default deny incoming"
else
    fail "Default devrait etre deny incoming"
fi

# ==========================================
header "4. SSH HARDENING"
# ==========================================

SSHD="/etc/ssh/sshd_config"

if grep -qE "^PermitRootLogin\s+no" $SSHD 2>/dev/null; then
    pass "Root login desactive"
else
    fail "Root login actif - ajouter: PermitRootLogin no"
fi

if grep -qE "^PasswordAuthentication\s+no" $SSHD 2>/dev/null; then
    pass "Password auth desactive"
else
    warn "Password auth actif - recommande: PasswordAuthentication no"
fi

if grep -qE "^PubkeyAuthentication\s+yes" $SSHD 2>/dev/null || ! grep -qE "^PubkeyAuthentication\s+no" $SSHD 2>/dev/null; then
    pass "Pubkey auth actif"
else
    fail "Pubkey auth desactive"
fi

# ==========================================
header "5. FAIL2BAN"
# ==========================================

if systemctl is-active --quiet fail2ban; then
    pass "Fail2ban actif"

    # Check SSH jail
    if fail2ban-client status sshd &>/dev/null; then
        pass "Jail sshd active"
        BANNED=$(fail2ban-client status sshd | grep "Currently banned" | awk '{print $NF}')
        info "IPs bannies SSH: $BANNED"
    else
        warn "Jail sshd non configuree"
    fi
else
    fail "Fail2ban inactif"
fi

# ==========================================
header "6. UTILISATEURS"
# ==========================================

# Check si portfolio user existe et n'est pas root
if id "portfolio" &>/dev/null; then
    pass "User portfolio existe"

    if [ "$(id -u portfolio)" -ne 0 ]; then
        pass "User portfolio n'est pas root"
    else
        fail "User portfolio est root!"
    fi
else
    warn "User portfolio non trouve"
fi

# Users avec shell
SHELL_USERS=$(cat /etc/passwd | grep -E "/bin/(bash|sh|zsh)" | cut -d: -f1 | tr '\n' ' ')
info "Users avec shell: $SHELL_USERS"

# ==========================================
header "7. FICHIERS SENSIBLES"
# ==========================================

# .env backend
ENV_FILE="/home/portfolio/app/backend/.env"
if [ -f "$ENV_FILE" ]; then
    PERMS=$(stat -c "%a" "$ENV_FILE")
    if [ "$PERMS" = "600" ] || [ "$PERMS" = "400" ]; then
        pass ".env permissions OK ($PERMS)"
    else
        warn ".env permissions: $PERMS (recommande: 600)"
    fi

    # Check API key length
    API_KEY=$(grep "ADMIN_API_KEY" "$ENV_FILE" | cut -d= -f2)
    if [ ${#API_KEY} -ge 32 ]; then
        pass "API key >= 32 chars"
    else
        fail "API key trop courte (${#API_KEY} chars)"
    fi

    # Check ENVIRONMENT=production
    if grep -q "ENVIRONMENT=production" "$ENV_FILE"; then
        pass "ENVIRONMENT=production"
    else
        fail "ENVIRONMENT n'est pas production"
    fi

    # Check DEBUG=false
    if grep -q "DEBUG=false" "$ENV_FILE"; then
        pass "DEBUG=false"
    else
        fail "DEBUG n'est pas false"
    fi
else
    warn ".env non trouve a $ENV_FILE"
fi

# DB file permissions
DB_FILE="/home/portfolio/app/backend/portfolio.db"
if [ -f "$DB_FILE" ]; then
    DB_PERMS=$(stat -c "%a" "$DB_FILE")
    info "portfolio.db permissions: $DB_PERMS"

    DB_OWNER=$(stat -c "%U" "$DB_FILE")
    if [ "$DB_OWNER" = "portfolio" ]; then
        pass "DB owner: portfolio"
    else
        warn "DB owner: $DB_OWNER (devrait etre portfolio)"
    fi
fi

# ==========================================
header "8. CLOUDFLARE TUNNEL"
# ==========================================

if systemctl is-active --quiet cloudflared; then
    pass "Cloudflared actif"

    # Check config exists
    if [ -f "/etc/cloudflared/config.yml" ]; then
        pass "Config tunnel presente"
    else
        warn "Config tunnel non trouvee"
    fi

    # Check credentials
    CRED_FILES=$(ls /root/.cloudflared/*.json 2>/dev/null | wc -l)
    if [ "$CRED_FILES" -gt 0 ]; then
        pass "Credentials tunnel presentes"
    else
        warn "Credentials tunnel non trouvees"
    fi
else
    fail "Cloudflared inactif"
fi

# ==========================================
header "9. NGINX"
# ==========================================

if nginx -t &>/dev/null; then
    pass "Config Nginx valide"
else
    fail "Config Nginx invalide"
fi

# Check server_tokens off
if grep -r "server_tokens off" /etc/nginx/ &>/dev/null; then
    pass "server_tokens off"
else
    warn "server_tokens pas desactive (ajouter: server_tokens off;)"
fi

# ==========================================
header "10. UPDATES"
# ==========================================

# Check unattended-upgrades
if dpkg -l | grep -q unattended-upgrades; then
    pass "unattended-upgrades installe"
else
    warn "unattended-upgrades non installe"
fi

# Pending updates
UPDATES=$(apt list --upgradable 2>/dev/null | grep -c upgradable || echo 0)
if [ "$UPDATES" -eq 0 ] || [ "$UPDATES" = "0" ]; then
    pass "Systeme a jour"
else
    warn "$UPDATES updates disponibles"
fi

# ==========================================
header "11. LOGS SECURITE"
# ==========================================

# Check si logs existent
if journalctl -u portfolio-api --since "1 hour ago" &>/dev/null; then
    # Check for security events
    HONEYPOT=$(journalctl -u portfolio-api --since "24 hours ago" 2>/dev/null | grep -c "HONEYPOT_TRIGGERED" || echo 0)
    AUTH_FAIL=$(journalctl -u portfolio-api --since "24 hours ago" 2>/dev/null | grep -c "AUTH_FAILURE" || echo 0)
    RATE_LIMIT=$(journalctl -u portfolio-api --since "24 hours ago" 2>/dev/null | grep -c "RATE_LIMIT_TRIGGERED" || echo 0)
    SUSPICIOUS=$(journalctl -u portfolio-api --since "24 hours ago" 2>/dev/null | grep -c "SUSPICIOUS_REQUEST" || echo 0)

    info "Dernières 24h:"
    info "  - Honeypots: $HONEYPOT"
    info "  - Auth failures: $AUTH_FAIL"
    info "  - Rate limits: $RATE_LIMIT"
    info "  - Suspicious: $SUSPICIOUS"
fi

# ==========================================
header "12. TEST ENDPOINTS"
# ==========================================

# Test local health
if curl -s http://127.0.0.1:8000/health | grep -q "healthy"; then
    pass "Backend health OK"
else
    fail "Backend health KO"
fi

if curl -s http://127.0.0.1:3000 | grep -q "html"; then
    pass "Frontend OK"
else
    fail "Frontend KO"
fi

# Test honeypot
HONEYPOT_RESP=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/wp-admin)
if [ "$HONEYPOT_RESP" = "404" ]; then
    pass "Honeypot retourne 404"
else
    warn "Honeypot retourne $HONEYPOT_RESP"
fi

# Test suspicious pattern blocked
SQLI_RESP=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:8000/api/projects?q=' OR '1'='1")
if [ "$SQLI_RESP" = "400" ]; then
    pass "SQLi bloque (400)"
else
    warn "SQLi retourne $SQLI_RESP (attendu: 400)"
fi

# ==========================================
header "13. RESSOURCES"
# ==========================================

# Disk usage
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
if [ "$DISK_USAGE" -lt 80 ]; then
    pass "Disk usage: ${DISK_USAGE}%"
else
    warn "Disk usage: ${DISK_USAGE}% (>80%)"
fi

# Memory
MEM_USAGE=$(free | awk '/Mem:/ {printf "%.0f", $3/$2 * 100}')
if [ "$MEM_USAGE" -lt 80 ]; then
    pass "Memory usage: ${MEM_USAGE}%"
else
    warn "Memory usage: ${MEM_USAGE}% (>80%)"
fi

# ==========================================
header "14. BACKUP"
# ==========================================

# Check backup directory
if [ -d "/home/portfolio/backups" ]; then
    BACKUP_COUNT=$(ls /home/portfolio/backups/*.db 2>/dev/null | wc -l)
    if [ "$BACKUP_COUNT" -gt 0 ]; then
        pass "Backups: $BACKUP_COUNT fichiers"
        LATEST=$(ls -t /home/portfolio/backups/*.db 2>/dev/null | head -1)
        info "Dernier: $LATEST"
    else
        warn "Aucun backup trouve"
    fi
else
    warn "Dossier backups non trouve"
fi

# Check cron backup
if crontab -l 2>/dev/null | grep -q "portfolio.db"; then
    pass "Cron backup configure"
else
    warn "Cron backup non configure"
fi

# ==========================================
# RESUME
# ==========================================

echo ""
echo "========================================"
echo "   RESUME"
echo "========================================"
echo -e "${GREEN}PASS: $PASS${NC}"
echo -e "${YELLOW}WARN: $WARN${NC}"
echo -e "${RED}FAIL: $FAIL${NC}"
echo "========================================"

if [ "$FAIL" -gt 0 ]; then
    echo -e "${RED}Des problemes critiques ont ete detectes!${NC}"
    exit 1
elif [ "$WARN" -gt 0 ]; then
    echo -e "${YELLOW}Quelques ameliorations possibles.${NC}"
    exit 0
else
    echo -e "${GREEN}Tout est OK!${NC}"
    exit 0
fi
