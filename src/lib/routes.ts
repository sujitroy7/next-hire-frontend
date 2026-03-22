// 1. Define Public Routes (The Whitelist)

/**
 * These routes are accessible to everyone, even when the user is not logged in.
 */
export const publicRoutes = [
  /^\/$/, // Landing Page
  /^\/login$/, // Login
  /^\/register$/, // Register
  /^\/candidate\/profile\/[^/]+$/, // Matches /candidate/profile/123, but NOT /candidate/profile/123/edit
  /^\/org\/profile\/[^/]+$/, // Matches /org/profile/123, but NOT /org/profile/123/edit
  /^\/jobs\/view\/[^/]+$/, // Matches /jobs/view/123, but NOT /jobs/view/123/edit
  /^\/jobs$/, // Matches /jobs
  /^\/about$/, // Matches /about
  /^\/robots.txt$/, // Matches /robots.txt
  /^\/sitemap.xml$/, // Matches /sitemap.xml
];
