import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "@/forms/reset-password/ResetPasswordForm";

export const metadata: Metadata = { title: "Reset Password" };

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-400">Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
