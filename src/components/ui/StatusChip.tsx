"use client";

import React from "react";
import { cn } from "@/utils/cn";

export type StatusChipColor =
  | "ok"
  | "danger"
  | "brand"
  | "accent"
  | "info"
  | "ink-soft";

interface StatusChipProps extends React.HTMLAttributes<HTMLDivElement> {
  status: string;
  color?: StatusChipColor;
  icon?: React.ReactNode;
}

const colorClasses: Record<StatusChipColor, string> = {
  ok: "bg-ok-soft text-ok-ink",
  danger: "bg-danger-soft text-danger-ink",
  brand: "bg-brand-soft text-brand-ink",
  accent: "bg-accent-soft text-accent-ink",
  info: "bg-info-soft text-info-ink",
  "ink-soft": "bg-bg-muted text-ink-soft",
};

/**
 * StatusChip
 * Domain-aware status indicator with semantic coloring.
 * Used for QUEUED, RUNNING, READY, FAILED, PUBLISHED, DRAFT, etc.
 */
const StatusChip = React.forwardRef<HTMLDivElement, StatusChipProps>(
  (
    {
      status,
      color = "ink-soft",
      icon,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        colorClasses[color],
        className,
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{status}</span>
    </div>
  ),
);

StatusChip.displayName = "StatusChip";
export default StatusChip;
