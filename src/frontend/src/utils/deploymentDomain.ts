/**
 * Utility to validate and sanitize deployment domain strings.
 * Ensures compliance with platform constraints: 5-50 characters, [a-zA-Z0-9-] only.
 */

const DOMAIN_REGEX = /^[a-zA-Z0-9-]{5,50}$/;

/**
 * Validates a deployment domain string against platform constraints.
 */
export function isValidDeploymentDomain(domain: string): boolean {
  return DOMAIN_REGEX.test(domain);
}

/**
 * Sanitizes a deployment domain string by removing invalid characters
 * and ensuring length constraints.
 */
export function sanitizeDeploymentDomain(domain: string): string {
  // Remove invalid characters (keep only alphanumeric and hyphens)
  let sanitized = domain.replace(/[^a-zA-Z0-9-]/g, '-');
  
  // Remove consecutive hyphens
  sanitized = sanitized.replace(/-+/g, '-');
  
  // Remove leading/trailing hyphens
  sanitized = sanitized.replace(/^-+|-+$/g, '');
  
  // Ensure minimum length
  if (sanitized.length < 5) {
    sanitized = sanitized.padEnd(5, '0');
  }
  
  // Ensure maximum length
  if (sanitized.length > 50) {
    sanitized = sanitized.substring(0, 50);
  }
  
  return sanitized;
}

/**
 * Returns the canonical deployment domain for the application.
 * Falls back to a sanitized version of the hostname or a default value.
 */
export function getDeploymentDomain(): string {
  // Try environment variable first
  const envDomain = import.meta.env.VITE_DEPLOYMENT_DOMAIN;
  if (envDomain && isValidDeploymentDomain(envDomain)) {
    return envDomain;
  }
  
  // Try hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const sanitized = sanitizeDeploymentDomain(hostname);
    if (isValidDeploymentDomain(sanitized)) {
      return sanitized;
    }
  }
  
  // Default fallback
  return 'adventure-academy';
}
