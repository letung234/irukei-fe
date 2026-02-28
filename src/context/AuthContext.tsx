"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import authApiService from "@/services/auth.service";
import tokenService from "@/services/token.service";
import { IAuthUser, ILoginPayload } from "@/models/auth.model";
import { PATHS } from "@/constants/paths";

// ─── Context shape ──────────────────────────────────────────────────────────

interface IAuthContextValue {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: ILoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  /** Call after successful 2FA enable to mark user as fully onboarded */
  completeTwoFaSetup: () => void;
}

// ─── Context creation ────────────────────────────────────────────────────────

const AuthContext = createContext<IAuthContextValue | null>(null);
AuthContext.displayName = "AuthContext";

// ─── Provider component ──────────────────────────────────────────────────────

/**
 * AuthProvider
 * Global auth state provider.
 * Mirrors irukei's pattern of keeping auth state hydrated from cookies
 * on first render (SSR-safe).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true until hydration completes

  // Hydrate auth state from cookie on mount (client-side only)
  useEffect(() => {
    const storedUser = tokenService.getUser();
    if (storedUser && tokenService.isAuthenticated()) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  /**
   * Login
   * 2FA-aware login:
   *  1. If top-level isRequire2FA=true → challenge required → redirect to /verify-2fa
   *     (temp credentials are stored in the form itself, not in cookies)
   *  2. If user.isRequire2FA=true → tokens issued, but user needs setup → redirect /setup-2fa
   *  3. Normal login → redirect to dashboard
   */
  const login = useCallback(
    async (payload: ILoginPayload) => {
      const response = await authApiService.login(payload);

      // Case 1: Active 2FA challenge (no tokens issued)
      if (response.isRequire2FA && !response.tokens) {
        // Don't set user in state — not authenticated yet.
        // Form stores credentials temporarily for /verify-2fa re-submission.
        router.replace(PATHS.VERIFY_TWO_FA);
        return;
      }

      // Case 2: Logged in but must set up 2FA first
      if (response.user.isRequire2FA) {
        setUser(response.user);
        router.replace(PATHS.SETUP_TWO_FA);
        return;
      }

      // Case 3: Normal login, fully authenticated
      setUser(response.user);
      router.replace(PATHS.DASHBOARD);
    },
    [router],
  );

  /**
   * Logout
   * Calls API → clears cookies → resets state → redirects to login
   */
  const logout = useCallback(async () => {
    await authApiService.logout();
    setUser(null);
    router.replace(PATHS.LOGIN);
  }, [router]);

  /**
   * After the user completes 2FA setup, clear the isRequire2FA flag from state
   * so the dashboard is accessible without re-login.
   */
  const completeTwoFaSetup = useCallback(() => {
    setUser((prev) => (prev ? { ...prev, isRequire2FA: false } : prev));
  }, []);

  const value = useMemo<IAuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      completeTwoFaSetup,
    }),
    [user, isLoading, login, logout, completeTwoFaSetup],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * useAuth
 * Typed hook for consuming AuthContext.
 * Throws if used outside AuthProvider — surfaces misuse at dev time.
 */
export function useAuth(): IAuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
