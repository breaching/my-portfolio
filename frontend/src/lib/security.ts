// Input validation and sanitization utilities

// Suspicious patterns to block
const MALICIOUS_PATTERNS = [
  // SQL Injection
  /('|")\s*(or|and)\s*('|")?1('|")?\s*=\s*('|")?1/i,
  /union\s+(all\s+)?select/i,
  /select\s+.*\s+from/i,
  /insert\s+into/i,
  /drop\s+(table|database)/i,
  /--\s*$/,

  // XSS
  /<script[\s>]/i,
  /javascript:/i,
  /on(load|error|click|mouse|focus|blur)\s*=/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,

  // Path Traversal
  /\.\.\//,
  /\.\.\\/,

  // Command Injection
  /;\s*(ls|cat|rm|wget|curl|bash|sh)/i,
  /\|\s*(ls|cat|rm|wget|curl|bash|sh)/i,
];

// HTML entities to escape
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 * Sanitize HTML by escaping dangerous characters
 */
export function sanitizeHtml(input: string): string {
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Check if input contains malicious patterns
 */
export function hasMaliciousContent(input: string): boolean {
  const decoded = decodeURIComponent(input);
  return MALICIOUS_PATTERNS.some(
    (pattern) => pattern.test(input) || pattern.test(decoded)
  );
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate and sanitize contact form input
 */
export function validateContactInput(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { valid: boolean; errors: string[]; sanitized?: typeof input } {
  const errors: string[] = [];

  // Check for malicious content
  const fields = [
    { name: "name", value: input.name },
    { name: "email", value: input.email },
    { name: "subject", value: input.subject },
    { name: "message", value: input.message },
  ];

  for (const field of fields) {
    if (hasMaliciousContent(field.value)) {
      errors.push(`Contenu non autorisé détecté dans ${field.name}`);
    }
  }

  // Validate name
  if (!input.name || input.name.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  }
  if (input.name.length > 100) {
    errors.push("Le nom ne doit pas dépasser 100 caractères");
  }

  // Validate email
  if (!isValidEmail(input.email)) {
    errors.push("Email invalide");
  }

  // Validate subject
  if (!input.subject || input.subject.trim().length < 5) {
    errors.push("Le sujet doit contenir au moins 5 caractères");
  }
  if (input.subject.length > 200) {
    errors.push("Le sujet ne doit pas dépasser 200 caractères");
  }

  // Validate message
  if (!input.message || input.message.trim().length < 10) {
    errors.push("Le message doit contenir au moins 10 caractères");
  }
  if (input.message.length > 5000) {
    errors.push("Le message ne doit pas dépasser 5000 caractères");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitize all fields
  return {
    valid: true,
    errors: [],
    sanitized: {
      name: sanitizeHtml(input.name.trim()),
      email: input.email.trim().toLowerCase(),
      subject: sanitizeHtml(input.subject.trim()),
      message: sanitizeHtml(input.message.trim()),
    },
  };
}

/**
 * Generate a simple honeypot field name (changes based on date)
 */
export function getHoneypotFieldName(): string {
  const date = new Date();
  const seed = date.getFullYear() * 1000 + date.getMonth() * 31 + date.getDate();
  return `website_url_${seed}`;
}
