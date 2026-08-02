"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Input — base field with optional label, hint, error.
 * Label linked via htmlFor; error announced with aria-invalid.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-ink"
          >
            {label}
            {props.required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm transition-colors bg-bg-elevated text-ink",
            "placeholder:text-ink-lighter focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1",
            error
              ? "border-danger bg-danger-soft focus:ring-danger"
              : "border-line hover:border-ink-lighter",
            props.disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-danger"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-ink-soft">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
