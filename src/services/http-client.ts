import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import tokenService from "./token.service";
import { PATHS } from "@/constants/paths";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

/**
 * httpClient
 * Axios instance with two interceptors:
 *
 * 1. REQUEST interceptor — attaches Bearer access token to every request
 * 2. RESPONSE interceptor — on 401:
 *      a) Attempts single token refresh (mirrors irukei's handleRefreshToken)
 *      b) If refresh succeeds → retries original request with new token
 *      c) If refresh fails → clears session and redirects to /login
 *
 * Mirrors irukei's src/services/baseRequest.ts pattern.
 */

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

/** Drain the failed-request queue after token refresh */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

// ── REQUEST INTERCEPTOR ─────────────────────────────────────────────────────
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── RESPONSE INTERCEPTOR ────────────────────────────────────────────────────
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = tokenService.getRefreshToken();

      // No refresh token → force logout
      if (!refreshToken) {
        tokenService.clearAll();
        if (typeof window !== "undefined") window.location.href = PATHS.LOGIN;
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return httpClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${API_BASE_URL}/v1/auth/refresh`, {
          refreshToken,
        });

        tokenService.saveTokens(data);
        httpClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenService.clearAll();
        if (typeof window !== "undefined") window.location.href = PATHS.LOGIN;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;
