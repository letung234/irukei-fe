import httpClient from "./http-client";
import tokenService from "./token.service";
import {
  ILoginPayload,
  ILoginResponse,
  IForgotPasswordPayload,
  IResetPasswordPayload,
  IChangePasswordPayload,
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
   * Saves tokens + user in cookie on success.
   */
  async login(payload: ILoginPayload): Promise<ILoginResponse> {
    const { data } = await httpClient.post<ILoginResponse>(
      "/v1/auth/login",
      payload,
    );
    tokenService.saveTokens(data.tokens);
    tokenService.saveUser(data.user);
    return data;
  },

  /**
   * POST /v1/auth/refresh
   * Called automatically by the http-client interceptor.
   * Can also be called explicitly.
   */
  async refreshToken(refreshToken: string): Promise<ILoginResponse["tokens"]> {
    const { data } = await httpClient.post<ILoginResponse["tokens"]>(
      "/v1/auth/refresh",
      {
        refreshToken,
      },
    );
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
};

export default authApiService;
