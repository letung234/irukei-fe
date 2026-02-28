import httpClient from "./http-client";
import tokenService from "./token.service";
import {
  ILoginPayload,
  ILoginResponse,
  ITokenPair,
  IForgotPasswordPayload,
  IResetPasswordPayload,
  IChangePasswordPayload,
  IVerifyOtpPayload,
  IQrCodeResponse,
  IEnableTwoFaResponse,
} from "@/models/auth.model";

/**
 * AuthApiService
 * Wraps all auth-related API calls against the irukei-be.
 * Mirrors irukei's AuthService class pattern.
 *
 * Responsibilities (SRP):
 *  - Making HTTP requests to /v1/auth/*
 *  - Storing / clearing tokens via tokenService
 * Does NOT:
 *  - Manage React state (that belongs to AuthContext)
 *  - Navigate (caller decides redirect)
 */
const authApiService = {
  /**
   * POST /v1/auth/login
   * Handles 2FA-aware login:
   *  - If response.isRequire2FA === true at top level → tokens are null, redirect to /verify-2fa
   *  - If response.user.isRequire2FA === true → tokens issued, but redirect to /setup-2fa
   * Mirrors irukei's login service + twoFa flow.
   */
  async login(payload: ILoginPayload): Promise<ILoginResponse> {
    const { data } = await httpClient.post<ILoginResponse>(
      "/v1/auth/login",
      payload,
    );
    // Only save tokens if fully authenticated (not mid-2FA-challenge)
    if (data.tokens && !data.isRequire2FA) {
      tokenService.saveTokens(data.tokens);
      tokenService.saveUser(data.user);
    }
    return data;
  },

  /**
   * POST /v1/auth/refresh
   * Called automatically by the http-client interceptor.
   * Can also be called explicitly.
   */
  async refreshToken(refreshToken: string): Promise<ITokenPair> {
    const { data } = await httpClient.post<ITokenPair>("/v1/auth/refresh", {
      refreshToken,
    });
    tokenService.saveTokens(data);
    return data;
  },

  /**
   * POST /v1/auth/logout
   * Clears all local tokens after server confirms logout.
   */
  async logout(): Promise<void> {
    const refreshToken = tokenService.getRefreshToken();
    try {
      if (refreshToken) {
        await httpClient.post("/v1/auth/logout", { refreshToken });
      }
    } finally {
      // Always clear local state, even if server call fails
      tokenService.clearAll();
    }
  },

  /**
   * POST /v1/auth/forgot-password
   */
  async forgotPassword(
    payload: IForgotPasswordPayload,
  ): Promise<{ message: string }> {
    const { data } = await httpClient.post<{ message: string }>(
      "/v1/auth/forgot-password",
      payload,
    );
    return data;
  },

  /**
   * POST /v1/auth/reset-password
   */
  async resetPassword(
    payload: IResetPasswordPayload,
  ): Promise<{ message: string }> {
    const { data } = await httpClient.post<{ message: string }>(
      "/v1/auth/reset-password",
      payload,
    );
    return data;
  },

  /**
   * POST /v1/auth/validate-reset-token
   */
  async validateResetToken(token: string): Promise<{ valid: boolean }> {
    const { data } = await httpClient.post<{ valid: boolean }>(
      "/v1/auth/validate-reset-token",
      { token },
    );
    return data;
  },

  /**
   * POST /v1/auth/change-password (authenticated)
   */
  async changePassword(
    payload: IChangePasswordPayload,
  ): Promise<{ message: string }> {
    const { data } = await httpClient.post<{ message: string }>(
      "/v1/auth/change-password",
      payload,
    );
    return data;
  },

  // ─── Two-Factor Authentication ──────────────────────────────────────────────

  /**
   * POST /v1/auth/2fa/verify
   * Complete login after 2FA challenge.
   * Sends original credentials + OTP (or backup code).
   * Saves tokens + user on success.
   * Mirrors irukei's auth.service enableTwoFactorAuthentication flow.
   */
  async verifyOtp(payload: IVerifyOtpPayload): Promise<ILoginResponse> {
    const { data } = await httpClient.post<ILoginResponse>(
      "/v1/auth/2fa/verify",
      payload,
    );
    if (data.tokens) {
      tokenService.saveTokens(data.tokens);
      tokenService.saveUser(data.user);
    }
    return data;
  },

  /**
   * POST /v1/auth/2fa/generate-qr
   * Requires authentication. Returns QR code data URL for the authenticator app.
   * Mirrors irukei's generate2FAQRCode service method.
   */
  async generateQRCode(): Promise<IQrCodeResponse> {
    const { data } = await httpClient.post<IQrCodeResponse>(
      "/v1/auth/2fa/generate-qr",
    );
    return data;
  },

  /**
   * POST /v1/auth/2fa/enable
   * Confirm OTP from authenticator app to permanently enable 2FA.
   * Returns backup codes on first activation.
   * Mirrors irukei's enableTwoFactorAuthentication service method.
   */
  async enableTwoFa(code: string): Promise<IEnableTwoFaResponse> {
    const { data } = await httpClient.post<IEnableTwoFaResponse>(
      "/v1/auth/2fa/enable",
      { code },
    );
    // Clear isRequire2FA from stored user since setup is complete
    const currentUser = tokenService.getUser();
    if (currentUser) {
      tokenService.saveUser({ ...currentUser, isRequire2FA: false });
    }
    return data;
  },

  /**
   * DELETE /v1/auth/2fa
   * Reset (disable) 2FA for the authenticated user.
   */
  async resetTwoFa(): Promise<{ message: string }> {
    const { data } = await httpClient.delete<{ message: string }>(
      "/v1/auth/2fa",
    );
    return data;
  },
};

export default authApiService;
