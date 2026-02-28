export const PATHS = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  CHANGE_PASSWORD: "/change-password",
} as const;

export type PathValues = (typeof PATHS)[keyof typeof PATHS];
