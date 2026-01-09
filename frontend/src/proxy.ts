import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_USER_AGENTS = [
  "wget",
  "curl",
  "python-requests",
  "scrapy",
  "httpclient",
  "java/",
  "libwww",
  "lwp-trivial",
  "sitesucker",
  "webcopier",
  "httrack",
  "webzip",
  "teleport",
  "nikto",
  "sqlmap",
  "nmap",
  "masscan",
  "zgrab",
];

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // requests per window

const requestCounts = new Map<string, { count: number; timestamp: number }>();

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfIP = request.headers.get("cf-connecting-ip");

  return cfIP || realIP || forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  record.count++;

  if (record.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}

function isSuspiciousUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return true;

  const ua = userAgent.toLowerCase();
  return BLOCKED_USER_AGENTS.some((blocked) => ua.includes(blocked));
}

function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, record] of requestCounts.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW * 2) {
      requestCounts.delete(ip);
    }
  }
}

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const ip = getClientIP(request);
  const path = request.nextUrl.pathname;

  // Skip static files and assets
  if (
    path.startsWith("/_next") ||
    path.startsWith("/static") ||
    path.includes(".") // files with extensions
  ) {
    return NextResponse.next();
  }

  // Block suspicious user agents
  if (isSuspiciousUserAgent(userAgent)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Rate limiting
  if (isRateLimited(ip)) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "60",
      },
    });
  }

  // Cleanup old entries periodically (1% chance per request)
  if (Math.random() < 0.01) {
    cleanupOldEntries();
  }

  const response = NextResponse.next();

  // Add anti-scraping headers
  response.headers.set("X-Robots-Tag", "noarchive, noimageindex");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
