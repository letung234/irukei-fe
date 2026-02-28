/** Cookie/storage key names  (mirrors irukei's constants/common.ts pattern) */
export const TOKEN_KEYS = {
  ACCESS_TOKEN: "irukei_access_token",
  REFRESH_TOKEN: "irukei_refresh_token",
  USER: "irukei_user",
} as const;

export const AUTH_PAGES = ["/login", "/forgot-password", "/reset-password"];
export const PUBLIC_ROUTES = [...AUTH_PAGES, "/"];
