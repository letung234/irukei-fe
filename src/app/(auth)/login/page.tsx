import type { Metadata } from "next";
import LoginForm from "@/forms/login/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return <LoginForm />;
}
