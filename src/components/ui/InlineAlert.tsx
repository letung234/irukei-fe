"use client";

import React from "react";
import { cn } from "@/utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "danger";

interface InlineAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  message: string;
  icon?: React.ReactNode;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "bg-info-soft border-info text-info-ink",
  success: "bg-ok-soft border-ok text-ok-ink",
  warning: "bg-accent-soft border-accent text-accent-ink",
  danger: "bg-danger-soft border-danger text-danger-ink",
};

/**
 * InlineAlert
 * Inline message for info, success, warning, and danger states.
 */
const InlineAlert = React.forwardRef<HTMLDivElement, InlineAlertProps>(
  (
    {
      variant = "info",
      title,
      message,
      icon,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex gap-3 rounded-md border p-4",
        variantClasses[variant],
        className,
      )}
      role="alert"
      {...props}
    >
      {icon && <span className="flex-shrink-0 mt-0.5">{icon}</span>}
      <div className="flex flex-col gap-1">
        {title && <p className="font-medium text-sm">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  ),
);

InlineAlert.displayName = "InlineAlert";
export default InlineAlert;
