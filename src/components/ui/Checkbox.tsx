"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
}

/**
 * Checkbox
 * Custom styled checkbox with optional label and description.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const checkboxId = id ?? (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              "h-4 w-4 rounded border-line bg-bg-elevated cursor-pointer",
              "accent-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
              props.disabled && "cursor-not-allowed opacity-50",
              className,
            )}
            {...props}
          />
        </div>
        {label && (
          <div className="flex flex-col gap-1">
            {typeof label === "string" ? (
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-ink cursor-pointer"
              >
                {label}
              </label>
            ) : (
              <div className="text-sm font-medium text-ink cursor-pointer">
                {label}
              </div>
            )}
            {description && (
              <p className="text-xs text-ink-soft">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
