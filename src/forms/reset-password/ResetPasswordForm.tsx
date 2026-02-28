"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/schemas/auth.schema";
import authApiService from "@/services/auth.service";
import { getApiErrorMessage } from "@/utils/cn";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import AlertBanner from "@/components/ui/AlertBanner";
import { PATHS } from "@/constants/paths";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  if (!token) {
    return (
      <div className="flex flex-col gap-4">
        <AlertBanner type="error" message="Invalid or missing reset token." />
        <Link
          href={PATHS.FORGOT_PASSWORD}
          className="text-sm text-brand-600 hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Password reset</h2>
        {serverMessage && (
          <AlertBanner type="success" message={serverMessage} />
        )}
        <Link
          href={PATHS.LOGIN}
          className="text-sm text-brand-600 hover:underline"
        >
          Sign in with new password →
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await authApiService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setServerMessage(result.message);
      setIsDone(true);
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
        <h2 className="text-xl font-semibold text-gray-900">Reset password</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter and confirm your new password.
        </p>
      </div>

      {serverError && <AlertBanner type="error" message={serverError} />}

      <PasswordInput
        label="New password"
        placeholder="••••••••"
        required
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Confirm new password"
        placeholder="••••••••"
        required
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" fullWidth isLoading={isLoading}>
        Reset password
      </Button>

      <Link
        href={PATHS.LOGIN}
        className="text-center text-sm text-brand-600 hover:underline"
      >
        ← Back to sign in
      </Link>
    </form>
  );
}
