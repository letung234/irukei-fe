"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Switch
 * Accessible toggle switch with optional label.
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, id, ...props }, ref) => {
    const switchId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            role="switch"
            aria-checked={props.checked}
            className={cn(
              "w-10 h-6 rounded-full bg-line cursor-pointer appearance-none transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
              "checked:bg-brand",
              props.disabled && "cursor-not-allowed opacity-50",
              className,
            )}
            {...props}
          />
          <span
            className={cn(
              "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform pointer-events-none",
              props.checked && "translate-x-4",
            )}
            aria-hidden="true"
          />
        </div>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm font-medium text-ink cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
export default Switch;
