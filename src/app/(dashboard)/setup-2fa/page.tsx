import SetupTwoFaForm from "@/forms/setup-two-fa/SetupTwoFaForm";

export const metadata = {
  title: "Set Up Two-Factor Authentication | Irukei",
};

/**
 * /setup-2fa page
 * Accessible only to authenticated users whose isRequire2FA = true.
 * Middleware protects this route (requires access token cookie).
 *
 * Guides the user through three steps:
 *  1. Scan QR code
 *  2. Enter OTP to confirm
 *  3. Save backup codes
 */
export default function SetupTwoFaPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Set Up Two-Factor Authentication
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Secure your account by linking an authenticator app.
        </p>
      </div>
      <SetupTwoFaForm />
    </div>
  );
}
