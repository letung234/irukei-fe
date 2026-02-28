"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import { useAuth } from "@/context/AuthContext";
import { getApiErrorMessage } from "@/utils/cn";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import AlertBanner from "@/components/ui/AlertBanner";
import { PATHS } from "@/constants/paths";

/**
 * LoginForm
 * Mirrors irukei's forms/login-form/login.tsx structure:
 *  - useForm + zodResolver
 *  - Separate isLoading state
 *  - Error surfaced via AlertBanner
 *  - API call delegated to AuthContext.login (which calls authApiService.login)
 */
export default function LoginForm() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    setServerError(null);
    try {
      await login({ email: data.email, password: data.password });
      // Redirect handled inside AuthContext.login
    } catch (err) {
      setServerError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back. Enter your credentials.
        </p>
      </div>

      {serverError && <AlertBanner type="error" message={serverError} />}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div>
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="mt-1 text-right">
          <Link
            href={PATHS.FORGOT_PASSWORD}
            className="text-xs text-brand-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button type="submit" fullWidth isLoading={isLoading} size="md">
        Sign in
      </Button>
    </form>
  );
}
