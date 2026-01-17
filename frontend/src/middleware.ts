import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting storage (in-memory, resets on restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const blockedIPs = new Map<string, number>();

// Brute force protection for contact form
const contactAttempts = new Map<string, number[]>();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // 100 requests per minute
const CONTACT_RATE_LIMIT = 5; // 5 contact attempts per 15 minutes
const CONTACT_WINDOW = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes block

// Honeypot paths - common scanner targets
const HONEYPOT_PATHS = [
  "/wp-admin",
  "/wp-login.php",
  "/wp-content",
  "/wordpress",
  "/.env",
  "/.git",
  "/.git/config",
  "/config.php",
  "/phpinfo.php",
  "/phpmyadmin",
  "/admin",
  "/admin.php",
  "/administrator",
  "/backup",
  "/backup.sql",
  "/database.sql",
  "/db.sql",
  "/.htaccess",
  "/.htpasswd",
  "/server-status",
  "/xmlrpc.php",
  "/wp-includes",
  "/license.txt",
  "/readme.html",
];

// Suspicious patterns (SQL injection, XSS, path traversal)
const SUSPICIOUS_PATTERNS = [
  // SQL Injection
  /('|")\s*(or|and)\s*('|")?1('|")?\s*=\s*('|")?1/i,
  /union\s+(all\s+)?select/i,
  /select\s+.*\s+from/i,
  /insert\s+into/i,
  /drop\s+(table|database)/i,
  /--\s*$/,
  /;\s*drop/i,

  // XSS
  /<script[\s>]/i,
  /javascript:/i,
  /on(load|error|click|mouse|focus|blur)\s*=/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,
  /<svg[\s>].*on/i,

  // Path Traversal
  /\.\.\//,
  /\.\.\\/,
  /%2e%2e%2f/i,
  /%2e%2e\//i,
  /\.\.%2f/i,
  /%252e%252e%252f/i,

  // Command Injection
  /;\s*(ls|cat|rm|wget|curl|bash|sh|nc|netcat)/i,
  /\|\s*(ls|cat|rm|wget|curl|bash|sh)/i,
  /`[^`]*`/,
  /\$\([^)]*\)/,
];

// Security event types
type SecurityEvent =
  | "RATE_LIMIT_EXCEEDED"
  | "HONEYPOT_TRIGGERED"
  | "SUSPICIOUS_REQUEST"
  | "IP_BLOCKED"
  | "CONTACT_RATE_LIMIT";

// Structured security logger
function logSecurityEvent(
  event: SecurityEvent,
  ip: string,
  path: string,
  details?: Record<string, unknown>
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: "WARNING",
    security_event: event,
    ip: ip,
    path: path,
    ...details,
  };
  console.log(JSON.stringify(logEntry));
}

// Get client IP from request
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  return "unknown";
}

// Check if IP is blocked
function isIPBlocked(ip: string): boolean {
  const blockedUntil = blockedIPs.get(ip);
  if (!blockedUntil) return false;

  if (Date.now() > blockedUntil) {
    blockedIPs.delete(ip);
    return false;
  }
  return true;
}

// Rate limiting check
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Contact form rate limiting
function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = contactAttempts.get(ip) || [];

  // Remove old attempts
  const recentAttempts = attempts.filter(time => now - time < CONTACT_WINDOW);

  if (recentAttempts.length >= CONTACT_RATE_LIMIT) {
    return false;
  }

  recentAttempts.push(now);
  contactAttempts.set(ip, recentAttempts);
  return true;
}

// Check for suspicious patterns in URL and query string
function hasSuspiciousPattern(url: string): { suspicious: boolean; pattern?: string } {
  const decodedUrl = decodeURIComponent(url);

  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(url) || pattern.test(decodedUrl)) {
      return { suspicious: true, pattern: pattern.source };
    }
  }
  return { suspicious: false };
}

// Check if path is a honeypot
function isHoneypotPath(pathname: string): boolean {
  const lowerPath = pathname.toLowerCase();
  return HONEYPOT_PATHS.some(hp => lowerPath.startsWith(hp) || lowerPath === hp);
}

export function middleware(request: NextRequest) {
  const ip = getClientIP(request);
  const pathname = request.nextUrl.pathname;
  const fullUrl = request.nextUrl.toString();

  // 1. Check if IP is blocked
  if (isIPBlocked(ip)) {
    logSecurityEvent("IP_BLOCKED", ip, pathname);
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. Check honeypots first (before rate limiting to always catch scanners)
  if (isHoneypotPath(pathname)) {
    logSecurityEvent("HONEYPOT_TRIGGERED", ip, pathname);
    // Block the IP for repeated honeypot hits
    const currentBlock = blockedIPs.get(ip);
    if (!currentBlock) {
      blockedIPs.set(ip, Date.now() + BLOCK_DURATION);
    }
    return new NextResponse("Not Found", { status: 404 });
  }

  // 3. Check for suspicious patterns
  const suspiciousCheck = hasSuspiciousPattern(fullUrl);
  if (suspiciousCheck.suspicious) {
    logSecurityEvent("SUSPICIOUS_REQUEST", ip, pathname, {
      pattern: suspiciousCheck.pattern,
      query: request.nextUrl.search
    });
    return new NextResponse("Bad Request", { status: 400 });
  }

  // 4. Rate limiting
  if (!checkRateLimit(ip)) {
    logSecurityEvent("RATE_LIMIT_EXCEEDED", ip, pathname, {
      limit: RATE_LIMIT_MAX,
      window: "1 minute"
    });
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "60",
      }
    });
  }

  // 5. Contact form specific rate limiting
  if (pathname === "/api/contact" && request.method === "POST") {
    if (!checkContactRateLimit(ip)) {
      logSecurityEvent("CONTACT_RATE_LIMIT", ip, pathname, {
        limit: CONTACT_RATE_LIMIT,
        window: "15 minutes"
      });
      return new NextResponse(
        JSON.stringify({ error: "Trop de tentatives. Réessayez dans 15 minutes." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "900",
          }
        }
      );
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
