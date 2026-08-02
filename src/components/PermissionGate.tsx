"use client";

import React from "react";
import { hasPermission, type PermissionId } from "@/lib/permissions-mock";

interface PermissionGateProps {
  permission: PermissionId;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * PermissionGate
 * Conditionally render children based on user permission.
 * Shows fallback if permission is denied.
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  fallback = null,
  children,
}) => {
  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default PermissionGate;
