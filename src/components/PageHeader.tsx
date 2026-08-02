"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}

/**
 * PageHeader
 * Page title, description, and action buttons container.
 */
export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      title,
      description,
      primaryAction,
      secondaryActions,
      className,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-ink">{title}</h1>
          {description && (
            <p className="text-ink-soft mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {secondaryActions && (
            <div className="flex gap-2">{secondaryActions}</div>
          )}
          {primaryAction && <div>{primaryAction}</div>}
        </div>
      </div>
    </div>
  ),
);

PageHeader.displayName = "PageHeader";
export default PageHeader;
