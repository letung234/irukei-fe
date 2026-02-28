/**
 * AlertBanner
 * Inline success/error notification displayed inside forms.
 */

import { cn } from "@/utils/cn";

interface AlertBannerProps {
  type: "success" | "error";
  message: string;
  className?: string;
}

export default function AlertBanner({
  type,
  message,
  className,
}: AlertBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg px-4 py-3 text-sm font-medium",
        type === "success" &&
          "bg-green-50 text-green-700 border border-green-200",
        type === "error" && "bg-red-50 text-red-700 border border-red-200",
        className,
      )}
    >
      {message}
    </div>
  );
}
