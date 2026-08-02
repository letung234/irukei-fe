"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

/**
 * Card
 * Rounded container with subtle shadow and background.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-bg-elevated border border-line shadow-sm",
        interactive &&
          "cursor-pointer transition-all hover:shadow-md hover:border-brand-muted",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";
export default Card;
