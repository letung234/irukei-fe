/**
 * Unit tests for auth schema validation.
 * Tests zod schemas that power the login, forgot-password, and reset-password forms.
 */

import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
  enableTwoFaSchema,
} from "@/schemas/auth.schema";

describe("loginSchema", () => {
  it("should pass with valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("should fail with invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("should fail with empty password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toBeDefined();
    }
  });

  it("should normalize email to lowercase", () => {
    const result = loginSchema.safeParse({
      email: "USER@EXAMPLE.COM",
      password: "pass123",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });
});

describe("forgotPasswordSchema", () => {
  it("should pass with valid email", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "user@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should fail with invalid email", () => {
    const result = forgotPasswordSchema.safeParse({ email: "bad" });
    expect(result.success).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  it("should pass when passwords match and meet length", () => {
    const result = resetPasswordSchema.safeParse({
      password: "SecurePass1!",
      confirmPassword: "SecurePass1!",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when passwords do not match", () => {
    const result = resetPasswordSchema.safeParse({
      password: "SecurePass1!",
      confirmPassword: "DifferentPass!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword).toBeDefined();
    }
  });

  it("should fail when password is too short", () => {
    const result = resetPasswordSchema.safeParse({
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("verifyOtpSchema", () => {
  it("should pass when a valid 6-digit OTP is provided", () => {
    const result = verifyOtpSchema.safeParse({ otp: "123456" });
    expect(result.success).toBe(true);
  });

  it("should pass when a valid backup code (≥10 chars) is provided", () => {
    const result = verifyOtpSchema.safeParse({ backupCode: "ABCD-1234-EFGH" });
    expect(result.success).toBe(true);
  });

  it("should pass when both otp and backupCode are provided", () => {
    const result = verifyOtpSchema.safeParse({
      otp: "654321",
      backupCode: "ABCD-1234-EFGH",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when neither otp nor backupCode is provided", () => {
    const result = verifyOtpSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should fail when OTP is not exactly 6 digits", () => {
    const result = verifyOtpSchema.safeParse({ otp: "12345" });
    expect(result.success).toBe(false);
  });

  it("should fail when OTP contains non-digits", () => {
    const result = verifyOtpSchema.safeParse({ otp: "12345a" });
    expect(result.success).toBe(false);
  });

  it("should fail when backup code is too short (<10 chars)", () => {
    const result = verifyOtpSchema.safeParse({ backupCode: "SHORT" });
    expect(result.success).toBe(false);
  });
});

describe("enableTwoFaSchema", () => {
  it("should pass with a valid 6-digit code", () => {
    const result = enableTwoFaSchema.safeParse({ code: "123456" });
    expect(result.success).toBe(true);
  });

  it("should fail when code is not exactly 6 digits", () => {
    const result = enableTwoFaSchema.safeParse({ code: "12345" });
    expect(result.success).toBe(false);
  });

  it("should fail when code is empty", () => {
    const result = enableTwoFaSchema.safeParse({ code: "" });
    expect(result.success).toBe(false);
  });

  it("should fail when code contains non-digits", () => {
    const result = enableTwoFaSchema.safeParse({ code: "12345a" });
    expect(result.success).toBe(false);
  });

  it("should fail when code field is missing", () => {
    const result = enableTwoFaSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
