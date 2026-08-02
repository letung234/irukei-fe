"use client";

import React from "react";
import { cn } from "@/utils/cn";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  ariaLabel: string;
}

const variantClasses: Record<IconButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-ink focus:ring-brand",
  secondary: "bg-bg-muted text-ink hover:bg-bg-hover focus:ring-brand",
  ghost: "bg-transparent text-ink hover:bg-bg-muted focus:ring-brand",
  danger: "bg-danger text-white hover:bg-danger-ink focus:ring-danger",
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

/**
 * IconButton
 * Icon-only button with accessible aria-label.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "secondary",
      size = "md",
      ariaLabel,
      className,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  ),
);

IconButton.displayName = "IconButton";
export default IconButton;
