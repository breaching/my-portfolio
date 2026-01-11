#!/bin/bash
#
# Security Monitor - Envoie des alertes Discord/Telegram
# Usage: ./monitor.sh (run en background avec systemd)
#

# ====== CONFIG ======
# Discord webhook (creer sur ton serveur Discord)
DISCORD_WEBHOOK=""

# Ou Telegram (creer bot via @BotFather)
TELEGRAM_BOT_TOKEN=""
TELEGRAM_CHAT_ID=""

# Seuils d'alerte
ALERT_HONEYPOT=1        # Alerte des le premier honeypot
ALERT_AUTH_FAIL=3       # Alerte apres 3 auth failures
ALERT_RATE_LIMIT=10     # Alerte apres 10 rate limits
# ====================

send_discord() {
    local msg="$1"
    if [ -n "$DISCORD_WEBHOOK" ]; then
        curl -s -H "Content-Type: application/json" \
            -d "{\"content\":\"🚨 **SECURITY ALERT**\n$msg\"}" \
            "$DISCORD_WEBHOOK" > /dev/null
    fi
}

send_telegram() {
    local msg="$1"
    if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
        curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
            -d "chat_id=${TELEGRAM_CHAT_ID}" \
            -d "text=🚨 SECURITY ALERT: $msg" \
            -d "parse_mode=HTML" > /dev/null
    fi
}

alert() {
    local msg="$1"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ALERT: $msg"
    send_discord "$msg"
    send_telegram "$msg"
}

# Compteurs
declare -A counters
reset_counters() {
    counters[honeypot]=0
    counters[auth_fail]=0
    counters[rate_limit]=0
    counters[suspicious]=0
}
reset_counters

# Reset compteurs toutes les 5 minutes
last_reset=$(date +%s)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Monitor started"

# Watch les logs en temps reel
journalctl -u portfolio-api -f --no-pager -o cat | while read line; do
    now=$(date +%s)

    # Reset compteurs toutes les 5 min
    if (( now - last_reset > 300 )); then
        reset_counters
        last_reset=$now
    fi

    # Honeypot triggered
    if echo "$line" | grep -q "HONEYPOT_TRIGGERED"; then
        ((counters[honeypot]++))
        ip=$(echo "$line" | grep -oP '"ip":\s*"\K[^"]+' || echo "unknown")
        path=$(echo "$line" | grep -oP '"path":\s*"\K[^"]+' || echo "unknown")

        if (( counters[honeypot] >= ALERT_HONEYPOT )); then
            alert "Honeypot triggered!\nIP: $ip\nPath: $path"
            counters[honeypot]=0
        fi
    fi

    # Auth failure
    if echo "$line" | grep -q "AUTH_FAILURE"; then
        ((counters[auth_fail]++))
        ip=$(echo "$line" | grep -oP '"ip":\s*"\K[^"]+' || echo "unknown")

        if (( counters[auth_fail] >= ALERT_AUTH_FAIL )); then
            alert "Multiple auth failures!\nIP: $ip\nCount: ${counters[auth_fail]}"
            counters[auth_fail]=0
        fi
    fi

    # Rate limit
    if echo "$line" | grep -q "RATE_LIMIT_TRIGGERED"; then
        ((counters[rate_limit]++))
        ip=$(echo "$line" | grep -oP '"ip":\s*"\K[^"]+' || echo "unknown")

        if (( counters[rate_limit] >= ALERT_RATE_LIMIT )); then
            alert "Heavy rate limiting!\nIP: $ip\nCount: ${counters[rate_limit]}"
            counters[rate_limit]=0
        fi
    fi

    # Suspicious request
    if echo "$line" | grep -q "SUSPICIOUS_REQUEST"; then
        ((counters[suspicious]++))
        ip=$(echo "$line" | grep -oP '"ip":\s*"\K[^"]+' || echo "unknown")
        reason=$(echo "$line" | grep -oP '"reason":\s*"\K[^"]+' || echo "unknown")

        alert "Suspicious request blocked!\nIP: $ip\nReason: $reason"
    fi

    # Brute force blocked
    if echo "$line" | grep -q "brute_force_blocked"; then
        ip=$(echo "$line" | grep -oP '"ip":\s*"\K[^"]+' || echo "unknown")
        alert "🔒 IP blocked (brute force)!\nIP: $ip"
    fi
done
