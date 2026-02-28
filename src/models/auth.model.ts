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
  tokens: ITokenPair;
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
}

/** Login form payload */
export interface ILoginPayload {
  email: string;
  password: string;
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
