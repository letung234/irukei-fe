"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * Label
 * Standalone label component with optional required indicator.
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-danger">*</span>}
    </label>
  ),
);

Label.displayName = "Label";
export default Label;
