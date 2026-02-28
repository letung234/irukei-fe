import type { Metadata } from "next";
import ForgotPasswordForm from "@/forms/forgot-password/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
