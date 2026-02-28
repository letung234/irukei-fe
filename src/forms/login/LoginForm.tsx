"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import { useAuth } from "@/context/AuthContext";
import authApiService from "@/services/auth.service";
import tokenService from "@/services/token.service";
import { getApiErrorMessage } from "@/utils/cn";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import AlertBanner from "@/components/ui/AlertBanner";
import { PATHS } from "@/constants/paths";
import { useRouter } from "next/navigation";

/**
 * LoginForm
 * Mirrors irukei's forms/login-form/login.tsx structure.
 *
 * 2FA-aware login flow:
 *  - On 2FA challenge: saves temp credentials to cookie → redirects to /verify-2fa
 *  - On 2FA setup needed: context.login handles redirect to /setup-2fa
 *  - Normal login: context.login handles redirect to /dashboard
 */
export default function LoginForm() {
  const { completeTwoFaSetup } = useAuth();
  const router = useRouter();
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
      const response = await authApiService.login({
        email: data.email,
        password: data.password,
      });

      // 2FA challenge: active challenge, no tokens issued yet
      if (response.isRequire2FA && !response.tokens) {
        // Store temp credentials so /verify-2fa can re-submit
        tokenService.saveTwoFaCredential(data.email, data.password);
        router.replace(PATHS.VERIFY_TWO_FA);
        return;
      }

      // 2FA setup needed: tokens issued but user has not set up 2FA yet
      if (response.user.isRequire2FA) {
        completeTwoFaSetup();
        router.replace(PATHS.SETUP_TWO_FA);
        return;
      }

      // Normal login
      router.replace(PATHS.DASHBOARD);
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
