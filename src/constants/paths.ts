export const PATHS = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  CHANGE_PASSWORD: "/change-password",
  /** Two-factor authentication: enter OTP / backup code during login */
  VERIFY_TWO_FA: "/verify-2fa",
  /** Two-factor authentication: scan QR code and confirm to enable */
  SETUP_TWO_FA: "/setup-2fa",
} as const;

export type PathValues = (typeof PATHS)[keyof typeof PATHS];
