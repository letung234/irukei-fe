"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

/**
 * Radio
 * Custom styled radio button with optional label and description.
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const radioId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={cn(
              "h-4 w-4 border-line bg-bg-elevated cursor-pointer",
              "accent-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
              props.disabled && "cursor-not-allowed opacity-50",
              className,
            )}
            {...props}
          />
        </div>
        {label && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={radioId}
              className="text-sm font-medium text-ink cursor-pointer"
            >
              {label}
            </label>
            {description && (
              <p className="text-xs text-ink-soft">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Radio.displayName = "Radio";
export default Radio;
