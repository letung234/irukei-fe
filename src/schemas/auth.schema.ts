import { z } from "zod";

/**
 * loginSchema
 * Mirrors irukei's loginSchema (zod + validator.isStrongPassword pattern).
 * For learning clarity: simplified strong-password check is explicit inline.
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase().trim()),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase().trim()),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Current password is required" })
      .min(1, "Current password is required"),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string({
      required_error: "Please confirm new password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// ─── 2FA Schemas ─────────────────────────────────────────────────────────────

/**
 * verifyOtpSchema
 * Verify-2FA form: user can enter a 6-digit TOTP OR a 16-char backup code.
 * At least one must be provided (server enforces this too).
 */
export const verifyOtpSchema = z
  .object({
    otp: z
      .string()
      .optional()
      .refine((v) => !v || /^\d{6}$/.test(v), {
        message: "OTP must be exactly 6 digits",
      })
      .transform((v) => v || undefined),
    backupCode: z
      .string()
      .optional()
      .refine((v) => !v || v.length >= 10, {
        message: "Backup code must be at least 10 characters",
      })
      .transform((v) => v?.trim() || undefined),
  })
  .refine((data) => data.otp || data.backupCode, {
    message: "Please enter an OTP code or a backup code",
    path: ["otp"],
  });

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

/**
 * enableTwoFaSchema
 * Setup-2FA form: just the 6-digit OTP from the authenticator app.
 */
export const enableTwoFaSchema = z.object({
  code: z
    .string({ required_error: "OTP code is required" })
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export type EnableTwoFaFormValues = z.infer<typeof enableTwoFaSchema>;
