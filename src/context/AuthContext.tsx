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
   * Calls API → stores tokens → updates React state → redirects to dashboard
   */
  const login = useCallback(
    async (payload: ILoginPayload) => {
      const { user: authUser } = await authApiService.login(payload);
      setUser(authUser);
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

  const value = useMemo<IAuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
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
