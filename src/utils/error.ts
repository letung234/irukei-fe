import { AxiosError } from "axios";

/** Minimal shape shared by Nest HttpExceptionFilter (`StandardErrorPayload`) and legacy errors. */
type ApiErrorBody = {
  message?: string | string[];
  errorCode?: string;
};

/**
 * Extracts a single human-readable message from an Axios error response.
 * Works with Nest ValidationPipe (message: string[]) and the global exception filter.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = "An unexpected error occurred",
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorBody | undefined;
    if (data?.message != null) {
      return Array.isArray(data.message) ? data.message[0] : data.message;
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
