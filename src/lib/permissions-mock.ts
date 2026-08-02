/**
 * Mock Permissions System
 * Simulates permission checking for permission-gated UI patterns
 */

export type PermissionId =
  | "perm_view_dashboard"
  | "perm_view_billing"
  | "perm_post_offers"
  | "perm_view_leads"
  | "perm_manage_users"
  | "perm_manage_roles"
  | "perm_delete_org"
  | "perm_manage_orgs";

export type RoleId = "role_admin" | "role_manager" | "role_recruiter" | "role_guest";

/* Mock current user role */
let currentUserRole: RoleId = "role_admin";

export function setCurrentUserRole(role: RoleId) {
  currentUserRole = role;
}

export function getCurrentUserRole(): RoleId {
  return currentUserRole;
}

/* Role → Permissions mapping */
const rolePermissionMap: Record<RoleId, PermissionId[]> = {
  role_admin: [
    "perm_view_dashboard",
    "perm_view_billing",
    "perm_post_offers",
    "perm_view_leads",
    "perm_manage_users",
    "perm_manage_roles",
    "perm_delete_org",
    "perm_manage_orgs",
  ],
  role_manager: [
    "perm_view_dashboard",
    "perm_view_billing",
    "perm_manage_users",
  ],
  role_recruiter: [
    "perm_view_dashboard",
    "perm_post_offers",
    "perm_view_leads",
  ],
  role_guest: ["perm_view_dashboard"],
};

/**
 * Check if current user has a specific permission
 */
export function hasPermission(permission: PermissionId): boolean {
  const permissions = rolePermissionMap[currentUserRole] || [];
  return permissions.includes(permission);
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(permissions: PermissionId[]): boolean {
  return permissions.some((perm) => hasPermission(perm));
}

/**
 * Check if user has all specified permissions
 */
export function hasAllPermissions(permissions: PermissionId[]): boolean {
  return permissions.every((perm) => hasPermission(perm));
}

/**
 * Get all permissions for current role
 */
export function getCurrentPermissions(): PermissionId[] {
  return rolePermissionMap[currentUserRole] || [];
}

/**
 * Mock function: Check if a feature is locked for current role
 */
export function isFeatureLocked(featureName: string): boolean {
  const lockedFeatures: Record<RoleId, string[]> = {
    role_admin: [],
    role_manager: ["mail"],
    role_recruiter: ["forms", "audit"],
    role_guest: ["mail", "forms", "audit", "users", "roles"],
  };

  return lockedFeatures[currentUserRole]?.includes(featureName) || false;
}
