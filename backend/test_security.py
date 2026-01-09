#!/usr/bin/env python3
"""
Security testing script for the Portfolio API.

Run this script to verify security measures are working correctly.
Usage: python test_security.py

Requirements:
- API must be running (default: http://localhost:8000)
- Admin API key must be set in environment or passed as argument
"""

import sys
import requests
import time
from typing import Dict, List, Tuple
import argparse


class SecurityTester:
    """Test security features of the Portfolio API."""

    def __init__(self, base_url: str, admin_key: str = None):
        self.base_url = base_url.rstrip("/")
        self.admin_key = admin_key
        self.results: List[Tuple[str, bool, str]] = []

    def test(self, name: str, passed: bool, message: str = ""):
        """Record test result."""
        self.results.append((name, passed, message))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {name}")
        if message:
            print(f"  → {message}")

    def print_summary(self):
        """Print test summary."""
        passed = sum(1 for _, p, _ in self.results if p)
        total = len(self.results)
        print(f"\n{'='*60}")
        print(f"SUMMARY: {passed}/{total} tests passed")
        print(f"{'='*60}")

        if passed < total:
            print("\nFailed tests:")
            for name, passed, msg in self.results:
                if not passed:
                    print(f"  - {name}: {msg}")

    def test_security_headers(self):
        """Test that security headers are present."""
        print("\n[1] Testing Security Headers...")

        try:
            response = requests.get(f"{self.base_url}/health")

            headers_to_check = {
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "DENY",
                "X-XSS-Protection": "1; mode=block",
                "Referrer-Policy": "no-referrer",
                "Content-Security-Policy": lambda v: "default-src 'none'" in v,
                "Permissions-Policy": lambda v: "camera=()" in v,
            }

            for header, expected in headers_to_check.items():
                value = response.headers.get(header)
                if callable(expected):
                    passed = value and expected(value)
                else:
                    passed = value == expected

                self.test(
                    f"Header: {header}",
                    passed,
                    f"Got: {value}" if not passed else ""
                )

            # Server header should be removed
            self.test(
                "Server header removed",
                "Server" not in response.headers,
                "Server header exposes version information"
            )

        except requests.RequestException as e:
            self.test("Security headers check", False, f"Connection error: {e}")

    def test_authentication(self):
        """Test admin authentication."""
        print("\n[2] Testing Admin Authentication...")

        # Test without API key
        try:
            response = requests.get(f"{self.base_url}/api/contact")
            self.test(
                "Reject request without API key",
                response.status_code == 401,
                f"Expected 401, got {response.status_code}"
            )
        except requests.RequestException as e:
            self.test("Auth test (no key)", False, f"Error: {e}")

        # Test with wrong API key
        try:
            response = requests.get(
                f"{self.base_url}/api/contact",
                headers={"X-API-Key": "wrong-key-12345"}
            )
            self.test(
                "Reject request with wrong API key",
                response.status_code == 401,
                f"Expected 401, got {response.status_code}"
            )
        except requests.RequestException as e:
            self.test("Auth test (wrong key)", False, f"Error: {e}")

        # Test with correct API key (if provided)
        if self.admin_key:
            try:
                response = requests.get(
                    f"{self.base_url}/api/contact",
                    headers={"X-API-Key": self.admin_key}
                )
                self.test(
                    "Accept request with correct API key",
                    response.status_code == 200,
                    f"Expected 200, got {response.status_code}"
                )
            except requests.RequestException as e:
                self.test("Auth test (correct key)", False, f"Error: {e}")
        else:
            print("  ⚠ Skipping correct API key test (not provided)")

    def test_rate_limiting(self):
        """Test rate limiting functionality."""
        print("\n[3] Testing Rate Limiting...")

        endpoint = f"{self.base_url}/api/projects"

        try:
            # Make rapid requests
            responses = []
            for i in range(15):
                r = requests.get(endpoint)
                responses.append(r)
                time.sleep(0.1)  # Small delay to not overwhelm

            # Check for rate limit headers
            last_response = responses[-1]
            has_rate_limit_headers = all([
                "X-RateLimit-Limit" in last_response.headers,
                "X-RateLimit-Remaining" in last_response.headers,
                "X-RateLimit-Reset" in last_response.headers,
            ])

            self.test(
                "Rate limit headers present",
                has_rate_limit_headers,
                "Missing rate limit headers"
            )

            print(f"  → Made {len(responses)} requests")
            print(f"  → Limit: {last_response.headers.get('X-RateLimit-Limit', 'N/A')}")
            print(f"  → Remaining: {last_response.headers.get('X-RateLimit-Remaining', 'N/A')}")

        except requests.RequestException as e:
            self.test("Rate limiting check", False, f"Error: {e}")

    def test_input_validation(self):
        """Test input validation and XSS prevention."""
        print("\n[4] Testing Input Validation...")

        # Test XSS in contact form
        xss_payloads = [
            "<script>alert('xss')</script>",
            "javascript:alert(1)",
            "<img src=x onerror=alert(1)>",
        ]

        for payload in xss_payloads:
            try:
                response = requests.post(
                    f"{self.base_url}/api/contact",
                    json={
                        "name": payload,
                        "email": "test@test.com",
                        "subject": "Test",
                        "message": "Test message"
                    }
                )

                # Should accept but sanitize
                if response.status_code == 201:
                    data = response.json()
                    sanitized = payload not in data.get("name", "")
                    self.test(
                        f"XSS sanitization: {payload[:30]}...",
                        sanitized,
                        f"Payload not sanitized: {data.get('name')}"
                    )
                else:
                    self.test(
                        f"XSS handling: {payload[:30]}...",
                        True,
                        "Request rejected (good)"
                    )

            except requests.RequestException as e:
                self.test(f"XSS test: {payload[:20]}...", False, f"Error: {e}")

        # Test path traversal in slug
        try:
            response = requests.get(f"{self.base_url}/api/projects/../../../etc/passwd")
            self.test(
                "Path traversal prevention",
                response.status_code == 404,
                f"Expected 404, got {response.status_code}"
            )
        except requests.RequestException as e:
            self.test("Path traversal test", False, f"Error: {e}")

    def test_cors_configuration(self):
        """Test CORS configuration."""
        print("\n[5] Testing CORS Configuration...")

        try:
            response = requests.options(
                f"{self.base_url}/api/projects",
                headers={"Origin": "https://evil.com"}
            )

            # Check CORS headers
            cors_headers = {
                "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
                "Access-Control-Allow-Credentials": response.headers.get("Access-Control-Allow-Credentials"),
            }

            self.test(
                "CORS configured",
                "Access-Control-Allow-Origin" in response.headers,
                f"CORS headers: {cors_headers}"
            )

            # Check credentials not allowed
            credentials = response.headers.get("Access-Control-Allow-Credentials", "false")
            self.test(
                "CORS credentials disabled",
                credentials.lower() != "true",
                f"Credentials: {credentials}"
            )

        except requests.RequestException as e:
            self.test("CORS check", False, f"Error: {e}")

    def test_error_handling(self):
        """Test error handling doesn't leak information."""
        print("\n[6] Testing Error Handling...")

        # Test 404 error
        try:
            response = requests.get(f"{self.base_url}/api/nonexistent")
            self.test(
                "404 error handling",
                response.status_code == 404,
                f"Got {response.status_code}"
            )

            # Check no stack trace in response
            if response.status_code >= 400:
                body = response.text.lower()
                has_stack_trace = any([
                    "traceback" in body,
                    "exception" in body and "file" in body,
                    "line " in body and ".py" in body
                ])
                self.test(
                    "No stack trace in error response",
                    not has_stack_trace,
                    "Stack trace detected in error response"
                )

        except requests.RequestException as e:
            self.test("Error handling check", False, f"Error: {e}")

    def test_api_documentation(self):
        """Test that API documentation is disabled in production."""
        print("\n[7] Testing API Documentation...")

        endpoints = ["/docs", "/redoc"]

        for endpoint in endpoints:
            try:
                response = requests.get(f"{self.base_url}{endpoint}")

                # In production, should be 404
                # In development, might be 200 (that's okay)
                if response.status_code == 404:
                    self.test(
                        f"API docs disabled: {endpoint}",
                        True,
                        "Production mode (good)"
                    )
                else:
                    print(f"  ⚠ Warning: {endpoint} is accessible (disable in production)")

            except requests.RequestException as e:
                self.test(f"Docs check: {endpoint}", False, f"Error: {e}")

    def test_honeypot_endpoints(self):
        """Test honeypot endpoints return 404 and don't reveal their nature."""
        print("\n[8] Testing Honeypot Endpoints...")

        honeypots = [
            "/admin",
            "/wp-admin",
            "/wp-login.php",
            "/.env",
            "/phpinfo.php",
            "/config.php",
        ]

        for endpoint in honeypots:
            try:
                response = requests.get(f"{self.base_url}{endpoint}")

                # Should return 404 (not reveal honeypot)
                self.test(
                    f"Honeypot {endpoint} returns 404",
                    response.status_code == 404,
                    f"Got {response.status_code}"
                )

                # Should not contain "honeypot" in response
                body = response.text.lower()
                self.test(
                    f"Honeypot {endpoint} doesn't reveal itself",
                    "honeypot" not in body,
                    "Honeypot revealed in response"
                )

            except requests.RequestException as e:
                self.test(f"Honeypot test: {endpoint}", False, f"Error: {e}")

    def test_suspicious_request_patterns(self):
        """Test that suspicious patterns are blocked."""
        print("\n[9] Testing Suspicious Request Detection...")

        patterns = [
            ("SQL injection", "/api/projects?q=' OR '1'='1"),
            ("Path traversal", "/api/projects/../../../etc/passwd"),
            ("XSS in URL", "/api/projects?q=<script>alert(1)</script>"),
            ("Union select", "/api/projects?q=UNION SELECT * FROM users"),
        ]

        for name, path in patterns:
            try:
                response = requests.get(f"{self.base_url}{path}")

                # Should be blocked (400 or 404)
                self.test(
                    f"Block {name}",
                    response.status_code in [400, 404],
                    f"Got {response.status_code}"
                )

            except requests.RequestException as e:
                self.test(f"Pattern test: {name}", False, f"Error: {e}")

    def test_contact_rate_limit(self):
        """Test contact-specific rate limiting."""
        print("\n[10] Testing Contact Rate Limit...")

        endpoint = f"{self.base_url}/api/contact"
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Rate Limit Test",
            "message": "This is a test message for rate limiting."
        }

        try:
            # Make several submissions
            responses = []
            for i in range(7):
                r = requests.post(endpoint, json=contact_data)
                responses.append(r)
                time.sleep(0.2)

            # Check if any got rate limited
            rate_limited = any(r.status_code == 429 for r in responses)

            # After 5 submissions, should be rate limited
            self.test(
                "Contact form rate limit",
                rate_limited or len([r for r in responses if r.status_code == 201]) <= 5,
                f"Made {len([r for r in responses if r.status_code == 201])} successful submissions"
            )

            # Check for Retry-After header on 429
            limited_response = next((r for r in responses if r.status_code == 429), None)
            if limited_response:
                self.test(
                    "Contact rate limit has Retry-After",
                    "Retry-After" in limited_response.headers,
                    "Missing Retry-After header"
                )

        except requests.RequestException as e:
            self.test("Contact rate limit check", False, f"Error: {e}")

    def test_brute_force_protection(self):
        """Test brute force protection for admin auth."""
        print("\n[11] Testing Brute Force Protection...")

        endpoint = f"{self.base_url}/api/contact"

        try:
            # Make multiple failed auth attempts
            responses = []
            for i in range(7):
                r = requests.get(
                    endpoint,
                    headers={"X-API-Key": f"wrong-key-{i}"}
                )
                responses.append(r)
                time.sleep(0.1)

            # Check if IP got blocked
            blocked = any(r.status_code == 429 for r in responses)

            self.test(
                "Brute force detection",
                blocked or responses[-1].status_code in [401, 429],
                f"Last response: {responses[-1].status_code}"
            )

            # If blocked, check Retry-After
            blocked_response = next((r for r in responses if r.status_code == 429), None)
            if blocked_response:
                self.test(
                    "Brute force block has Retry-After",
                    "Retry-After" in blocked_response.headers,
                    "Missing Retry-After header"
                )
                print(f"  → IP blocked after {len(responses)} attempts")

        except requests.RequestException as e:
            self.test("Brute force protection", False, f"Error: {e}")

    def run_all_tests(self):
        """Run all security tests."""
        print(f"\nTesting API at: {self.base_url}")
        print("="*60)

        self.test_security_headers()
        self.test_authentication()
        self.test_rate_limiting()
        self.test_input_validation()
        self.test_cors_configuration()
        self.test_error_handling()
        self.test_api_documentation()
        self.test_honeypot_endpoints()
        self.test_suspicious_request_patterns()
        self.test_contact_rate_limit()
        self.test_brute_force_protection()

        self.print_summary()


def main():
    parser = argparse.ArgumentParser(description="Security testing for Portfolio API")
    parser.add_argument(
        "--url",
        default="http://localhost:8000",
        help="Base URL of the API (default: http://localhost:8000)"
    )
    parser.add_argument(
        "--api-key",
        help="Admin API key for testing authenticated endpoints"
    )

    args = parser.parse_args()

    tester = SecurityTester(args.url, args.api_key)
    tester.run_all_tests()

    # Exit with error code if any tests failed
    failed = sum(1 for _, passed, _ in tester.results if not passed)
    sys.exit(1 if failed > 0 else 0)


if __name__ == "__main__":
    main()
