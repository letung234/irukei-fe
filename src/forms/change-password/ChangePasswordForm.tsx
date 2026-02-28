"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/schemas/auth.schema";
import authApiService from "@/services/auth.service";
import { getApiErrorMessage } from "@/utils/cn";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import AlertBanner from "@/components/ui/AlertBanner";
import { PATHS } from "@/constants/paths";

export default function ChangePasswordForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    setServerError(null);
    setServerMessage(null);
    try {
      const result = await authApiService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });
      setServerMessage(result.message);
      reset();
    } catch (err) {
      setServerError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <div className="mb-6">
        <Link
          href={PATHS.DASHBOARD}
          className="text-sm text-brand-600 hover:underline"
        >
          ← Back to dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Change Password
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Your new password must be at least 8 characters.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5"
        >
          {serverMessage && (
            <AlertBanner type="success" message={serverMessage} />
          )}
          {serverError && <AlertBanner type="error" message={serverError} />}

          <PasswordInput
            label="Current password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
          />

          <PasswordInput
            label="New password"
            placeholder="••••••••"
            required
            autoComplete="new-password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <PasswordInput
            label="Confirm new password"
            placeholder="••••••••"
            required
            autoComplete="new-password"
            error={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Update password
          </Button>
        </form>
      </div>
    </div>
  );
}
