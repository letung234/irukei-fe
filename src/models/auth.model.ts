/**
 * Auth-related type definitions.
 * Mirrors irukei's models/user.model.ts + models/auth.ts patterns.
 */

export interface IToken {
  token: string;
  expiresAt: number; // Unix timestamp ms
}

/** Shape returned from POST /v1/auth/login */
export interface ILoginResponse {
  user: IAuthUser;
  /**
   * tokens is null when isRequire2FA is true at the top level
   * (challenge required — client must redirect to /verify-2fa)
   */
  tokens: ITokenPair | null;
  /**
   * Top-level flag: true = active 2FA challenge pending (no tokens issued).
   * user.isRequire2FA = true = user needs to SET UP 2FA for first time (tokens are issued).
   */
  isRequire2FA?: boolean;
}

export interface ITokenPair {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

/** The user object stored in auth state / cookie */
export interface IAuthUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  /**
   * true = user has no 2FA or needs to set up 2FA for the first time.
   * FE should redirect to /setup-2fa after login in this case.
   * Mirrors irukei's isRequire2FA in user object.
   */
  isRequire2FA?: boolean;
}

/** Login form payload */
export interface ILoginPayload {
  email: string;
  password: string;
}

/** Verify-2FA form payload (sent with original credentials + OTP or backup code) */
export interface IVerifyOtpPayload {
  email: string;
  password: string;
  otp?: string;
  backupCode?: string;
}

/** Setup-2FA: QR Code response */
export interface IQrCodeResponse {
  qrDataUrl: string;
}

/** Setup-2FA: enable 2FA response */
export interface IEnableTwoFaResponse {
  backupCodes: string[];
}

/** Forgot password payload */
export interface IForgotPasswordPayload {
  email: string;
}

/** Reset password payload */
export interface IResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

/** Change password payload (authenticated) */
export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

/** Generic API error shape (mirrors BE HttpExceptionFilter response) */
export interface IApiError {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}
