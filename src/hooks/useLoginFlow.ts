"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import authApiService from "@/services/auth.service";
import tokenService from "@/services/token.service";
import { getApiErrorMessage } from "@/utils/error";
import { PATHS } from "@/constants/paths";
import type { LoginFormValues } from "@/schemas/auth.schema";

/**
 * Encapsulates the 2FA-aware login side effects (cookies, redirects, errors)
 * so {@link LoginForm} stays a thin presentational shell.
 */
export function useLoginFlow() {
  const router = useRouter();
  const { completeTwoFaSetup } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = useCallback(
    async (values: LoginFormValues) => {
      setIsSubmitting(true);
      setServerError(null);
      try {
        const response = await authApiService.login({
          email: values.email,
          password: values.password,
        });

        if (response.isRequire2FA && !response.tokens) {
          tokenService.saveTwoFaCredential(values.email, values.password);
          router.replace(PATHS.VERIFY_TWO_FA);
          return;
        }

        if (response.user.isRequire2FA) {
          completeTwoFaSetup();
          router.replace(PATHS.SETUP_TWO_FA);
          return;
        }

        router.replace(PATHS.DASHBOARD);
      } catch (err) {
        setServerError(getApiErrorMessage(err));
      } finally {
        setIsSubmitting(false);
      }
    },
    [completeTwoFaSetup, router],
  );

  return { submitLogin, isSubmitting, serverError };
}
