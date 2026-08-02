/** Cookie/storage key names */
export const TOKEN_KEYS = {
  ACCESS_TOKEN: "irukei_access_token",
  REFRESH_TOKEN: "irukei_refresh_token",
  USER: "irukei_user",
  /** Temporary cookie: stores credentials mid-2FA-challenge for the /verify-2fa page */
  TWO_FA_CREDENTIAL: "irukei_2fa_credential",
} as const;

export const AUTH_PAGES = ["/login", "/forgot-password", "/reset-password"];

/**
 * Public routes do not require an access token.
 * Design-system shells + marketplace are browsable without auth for FE review.
 */
export const PUBLIC_ROUTES = [
  ...AUTH_PAGES,
  "/",
  "/marketplace",
  "/ui",
  "/app/student",
  "/app/company",
  "/app/org",
  "/admin",
];

/**
 * 2FA-specific routes.
 * verify-2fa: accessible without auth (credential cookie acts as temp auth).
 * setup-2fa: requires auth (user must be logged in to configure 2FA).
 */
export const TWO_FA_ROUTES = {
  VERIFY: "/verify-2fa",
  SETUP: "/setup-2fa",
} as const;
