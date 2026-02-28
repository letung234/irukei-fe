import type { Metadata } from "next";
import ChangePasswordForm from "@/forms/change-password/ChangePasswordForm";

export const metadata: Metadata = { title: "Change Password" };

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
