"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { verifyOtpSchema, VerifyOtpFormValues } from "@/schemas/auth.schema";
import authApiService from "@/services/auth.service";
import tokenService from "@/services/token.service";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AlertBanner from "@/components/ui/AlertBanner";
import { PATHS } from "@/constants/paths";

/**
 * VerifyOtpForm
 * Shown on /verify-2fa — user enters a 6-digit TOTP or a backup code.
 *
 * Flow (mirrors irukei's getAuthForTwoFA verify path):
 *  1. Read temp credentials from cookie (set by LoginForm on 2FA challenge)
 *  2. Submit email + password + OTP/backup to POST /v1/auth/2fa/verify
 *  3. On success: save tokens+user → redirect to dashboard (or setup-2fa if needed)
 *  4. On failure: show error, let user retry
 */
export default function VerifyOtpForm() {
  const router = useRouter();
  const { completeTwoFaSetup } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [credentialsMissing, setCredentialsMissing] = useState(false);

  useEffect(() => {
    const creds = tokenService.getTwoFaCredential();
    if (!creds) setCredentialsMissing(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const onSubmit = async (values: VerifyOtpFormValues) => {
    setApiError(null);

    const creds = tokenService.getTwoFaCredential();
    if (!creds) {
      setApiError("Session expired. Please log in again.");
      router.replace(PATHS.LOGIN);
      return;
    }

    try {
      const response = await authApiService.verifyOtp({
        email: creds.email,
        password: creds.password,
        otp: values.otp,
        backupCode: values.backupCode,
      });

      tokenService.clearTwoFaCredential();

      if (response.user.isRequire2FA) {
        // Backup code was used — 2FA got reset, must re-setup
        completeTwoFaSetup();
        router.replace(PATHS.SETUP_TWO_FA);
      } else {
        router.replace(PATHS.DASHBOARD);
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Verification failed. Please try again.";
      setApiError(typeof message === "string" ? message : message[0]);
    }
  };

  if (credentialsMissing) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Your session has expired. Please log in again.
        </p>
        <Button
          onClick={() => router.replace(PATHS.LOGIN)}
          variant="primary"
          className="w-full"
        >
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-4">
        {apiError && <AlertBanner type="error" message={apiError} />}

        {!useBackupCode ? (
          <>
            <p className="text-sm text-gray-600">
              Enter the 6-digit code from your authenticator app.
            </p>
            <Input
              label="OTP Code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              error={errors.otp?.message}
              {...register("otp")}
            />
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              Enter one of your backup codes. Each code can only be used once.
            </p>
            <Input
              label="Backup Code"
              type="text"
              autoComplete="off"
              placeholder="XXXX-XXXX-XXXX"
              error={errors.backupCode?.message}
              {...register("backupCode")}
            />
          </>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Verify
        </Button>

        <button
          type="button"
          onClick={() => {
            setUseBackupCode((v) => !v);
            setApiError(null);
            reset();
          }}
          className="w-full text-sm text-brand-600 hover:text-brand-800 underline"
        >
          {useBackupCode
            ? "Use authenticator app instead"
            : "Use a backup code instead"}
        </button>
      </div>
    </form>
  );
}
