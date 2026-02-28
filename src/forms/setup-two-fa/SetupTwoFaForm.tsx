"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  enableTwoFaSchema,
  EnableTwoFaFormValues,
} from "@/schemas/auth.schema";
import authApiService from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AlertBanner from "@/components/ui/AlertBanner";
import { PATHS } from "@/constants/paths";

/**
 * SetupTwoFaForm
 * Shown on /setup-2fa — guides the user through enabling TOTP 2FA.
 *
 * Three-step flow (mirrors irukei's setup-two-factor page):
 *  Step 1: Display QR code (POST /v1/auth/2fa/generate-qr)
 *  Step 2: User scans with authenticator app, enters 6-digit OTP
 *  Step 3: Enable confirmed → show backup codes + redirect to dashboard
 */
export default function SetupTwoFaForm() {
  const router = useRouter();
  const { completeTwoFaSetup } = useAuth();

  const [step, setStep] = useState<"loading" | "qr" | "confirm" | "backup">(
    "loading",
  );
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnableTwoFaFormValues>({
    resolver: zodResolver(enableTwoFaSchema),
  });

  const fetchQrCode = useCallback(async () => {
    setApiError(null);
    try {
      const { qrDataUrl: url } = await authApiService.generateQRCode();
      setQrDataUrl(url);
      setStep("qr");
    } catch {
      setApiError("Failed to generate QR code. Please refresh and try again.");
      setStep("qr");
    }
  }, []);

  useEffect(() => {
    fetchQrCode();
  }, [fetchQrCode]);

  const onSubmit = async (values: EnableTwoFaFormValues) => {
    setApiError(null);
    try {
      const { backupCodes: codes } = await authApiService.enableTwoFa(
        values.code,
      );
      setBackupCodes(codes);
      completeTwoFaSetup();
      setStep("backup");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Invalid OTP code. Please try again.";
      setApiError(typeof message === "string" ? message : message[0]);
    }
  };

  if (step === "loading") {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Generating QR code…</p>
      </div>
    );
  }

  if (step === "backup") {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-800">
            ✓ Two-factor authentication enabled successfully!
          </p>
        </div>

        {backupCodes.length > 0 ? (
          <>
            <p className="text-sm text-gray-600">
              Save these backup codes in a safe place. Each code can only be
              used once to access your account if you lose your authenticator
              device.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm">
              {backupCodes.map((code) => (
                <div key={code} className="py-1 text-gray-800">
                  {code}
                </div>
              ))}
            </div>
            <p className="text-xs text-red-600 font-medium">
              ⚠ These codes will not be shown again. Copy them now.
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-600">
            2FA is now active. Backup codes were already generated during a
            previous setup.
          </p>
        )}

        <Button
          variant="primary"
          className="w-full"
          onClick={() => router.replace(PATHS.DASHBOARD)}
        >
          Continue to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {apiError && <AlertBanner type="error" message={apiError} />}

      {step === "qr" && qrDataUrl && (
        <>
          <p className="text-sm text-gray-600">
            Scan this QR code with your authenticator app (Google Authenticator,
            Authy, 1Password, etc.), then click &quot;Next&quot; to confirm.
          </p>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="2FA QR Code"
              width={200}
              height={200}
              className="rounded-lg border border-gray-200"
            />
          </div>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => setStep("confirm")}
          >
            I&apos;ve scanned the QR code — Next
          </Button>
        </>
      )}

      {step === "confirm" && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the 6-digit code displayed in your authenticator app to
              confirm setup.
            </p>
            <Input
              label="OTP Code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              error={errors.code?.message}
              {...register("code")}
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Confirm &amp; Enable 2FA
            </Button>
            <button
              type="button"
              onClick={() => setStep("qr")}
              className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Back to QR code
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
