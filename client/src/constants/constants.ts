/**
 * Global constants for use throughout the app.
 * @packageDocumentation
 */

// media queries
export const MOBILE_BREAKPOINT = 768;
export const MOBILE_QUERY = Object.freeze({
  query: `(max-width: ${MOBILE_BREAKPOINT}px)`
});

// urls
export const API_BASE_URL = process.env.API_BASE_URL || '';

// auth variables from environment
export const AUTH_USERNAME = process.env.AUTH_USERNAME || '';
export const AUTH_PASSWORD = process.env.AUTH_PASSWORD || '';
