/**
 * Unit tests for auth schema validation.
 * Tests zod schemas that power the login, forgot-password, and reset-password forms.
 */

import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
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
