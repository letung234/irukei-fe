"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * EmptyState
 * Generic empty state with icon, title, description, and optional action.
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { icon, title, description, action, className, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-4xl text-ink-lighter">{icon}</div>
      )}
      <h3 className="text-lg font-semibold text-ink mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-ink-soft text-center mb-6 max-w-xs">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  ),
);

EmptyState.displayName = "EmptyState";
export default EmptyState;
