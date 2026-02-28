import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { IApiError } from "@/models/auth.model";

/**
 * cn — Tailwind class merger
 * Combines clsx conditional class logic with tailwind-merge deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * getApiErrorMessage
 * Extracts a human-readable message from an Axios error.
 * Handles both single string and array messages (from NestJS ValidationPipe).
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = "An unexpected error occurred",
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as Partial<IApiError> | undefined;
    if (data?.message) {
      return Array.isArray(data.message) ? data.message[0] : data.message;
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
