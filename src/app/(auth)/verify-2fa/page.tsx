import { Suspense } from "react";
import VerifyOtpForm from "@/forms/verify-otp/VerifyOtpForm";

export const metadata = {
  title: "Two-Factor Authentication | Irukei",
};

/**
 * /verify-2fa page
 * Accessible when:
 *   - User is NOT fully authenticated
 *   - AND has a valid `irukei_2fa_credential` temp cookie (set by LoginForm)
 *
 * Middleware guards this route (see middleware.ts).
 */
export default function VerifyTwoFaPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Two-Factor Authentication
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter the code from your authenticator app to continue.
        </p>
      </div>
      <Suspense>
        <VerifyOtpForm />
      </Suspense>
    </div>
  );
}
