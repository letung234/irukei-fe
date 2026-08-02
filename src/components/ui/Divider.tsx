"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: "horizontal" | "vertical";
}

/**
 * Divider
 * Separator with optional label.
 */
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ label, variant = "horizontal", className, ...props }, ref) => {
    if (variant === "vertical") {
      return (
        <div
          ref={ref}
          className={cn("h-6 w-px bg-line", className)}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3", className)}
        role="separator"
        {...props}
      >
        <div className="flex-1 h-px bg-line" />
        {label && <span className="text-xs text-ink-soft px-2">{label}</span>}
        <div className="flex-1 h-px bg-line" />
      </div>
    );
  },
);

Divider.displayName = "Divider";
export default Divider;
