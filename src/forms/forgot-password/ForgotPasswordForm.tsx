"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/schemas/auth.schema";
import authApiService from "@/services/auth.service";
import { getApiErrorMessage } from "@/utils/cn";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AlertBanner from "@/components/ui/AlertBanner";
import { PATHS } from "@/constants/paths";

export default function ForgotPasswordForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await authApiService.forgotPassword({ email: data.email });
      setServerMessage(result.message);
      setIsSubmitted(true);
    } catch (err) {
      setServerError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted && serverMessage) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Check your email
        </h2>
        <AlertBanner type="success" message={serverMessage} />
        <p className="text-sm text-gray-500">
          If an account exists for that email, you will receive a password reset
          link shortly.
        </p>
        <Link
          href={PATHS.LOGIN}
          className="text-sm text-brand-600 hover:underline"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Forgot password</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your email and we'll send a reset link.
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

      <Button type="submit" fullWidth isLoading={isLoading}>
        Send reset link
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
