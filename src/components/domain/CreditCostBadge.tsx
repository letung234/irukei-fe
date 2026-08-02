import React from "react";
import { cn } from "@/utils/cn";

/** Shows credit cost with amber treatment for paid actions. */
export function CreditCostBadge({
  cost,
  className,
}: {
  cost: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent-ink",
        className,
      )}
    >
      −{cost} credits
    </span>
  );
}

export default CreditCostBadge;
