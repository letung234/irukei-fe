"use client";

import React from "react";
import { cn } from "@/utils/cn";

export type BadgeVariant = "neutral" | "info" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-bg-muted text-ink border-line",
  info: "bg-info-soft text-info-ink border-info",
  success: "bg-ok-soft text-ok-ink border-ok",
  warning: "bg-accent-soft text-accent-ink border-accent",
  danger: "bg-danger-soft text-danger-ink border-danger",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

/**
 * Badge
 * Semantic status indicator badge.
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = "neutral",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

Badge.displayName = "Badge";
export default Badge;
