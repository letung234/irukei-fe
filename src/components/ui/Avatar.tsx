"use client";

import React from "react";
import { cn } from "@/utils/cn";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallbackBg?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-2xl",
};

/**
 * Avatar
 * Circular user avatar with initials or image fallback.
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      initials,
      src,
      alt = "User avatar",
      size = "md",
      fallbackBg = "bg-brand",
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full flex-shrink-0 font-medium",
        "text-white bg-brand",
        sizeClasses[size],
        className,
      )}
      role="img"
      aria-label={alt}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </div>
  ),
);

Avatar.displayName = "Avatar";
export default Avatar;
