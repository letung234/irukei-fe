"use client";

import { usePermissions } from "@/context/PermissionContext";

export function PermissionsPanel() {
  const { permissionsPayload, isLoading, hasPermission } = usePermissions();

  if (isLoading && !permissionsPayload) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
        Loading permissions...
      </div>
    );
  }

  if (!permissionsPayload?.membershipId) {
    return (
      <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-medium">No active membership</p>
        <p className="mt-1 text-amber-800">
          Seed MongoDB with <code className="bg-white/80 px-1 rounded">npm run seed:authz</code> in
          irukei-be (after seed:user) to attach this account to a plan, organization, and role.
        </p>
      </div>
    );
  }

  const { permissions, isSuperAdmin, scopes, version, organizationId } = permissionsPayload;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900">Effective permissions</h2>
        <span className="text-xs text-gray-400">
          permissionVersion: {version} | org: {organizationId?.slice(0, 8)}...
        </span>
      </div>

      {isSuperAdmin && (
        <p className="text-sm font-medium text-violet-700">
          Super admin (system role with <code>*</code>) - plan limits bypassed.
        </p>
      )}

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Keys</p>
        <div className="flex flex-wrap gap-2">
          {permissions.length === 0 ? (
            <span className="text-sm text-gray-500">No keys (fail-close or billing block)</span>
          ) : (
            permissions.map((k) => (
              <span
                key={k}
                className="inline-flex items-center rounded-full bg-brand-50 text-brand-800 px-3 py-1 text-xs font-medium border border-brand-100"
              >
                {k}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-gray-50 p-3 border border-gray-100">
          <p className="font-medium text-gray-700">Company scope</p>
          <p className="mt-1 text-gray-600">
            {scopes.company.scope}
            {scopes.company.entityIds.length > 0 && (
              <span className="block text-xs text-gray-500 mt-1">
                {scopes.company.entityIds.length} entity id(s)
              </span>
            )}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 border border-gray-100">
          <p className="font-medium text-gray-700">Person scope</p>
          <p className="mt-1 text-gray-600">
            {scopes.person.scope}
            {scopes.person.entityIds.length > 0 && (
              <span className="block text-xs text-gray-500 mt-1">
                {scopes.person.entityIds.length} entity id(s)
              </span>
            )}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
        Example gate: <code>hasPermission(&quot;company.read&quot;)</code> ={" "}
        <strong>{hasPermission("company.read") ? "true" : "false"}</strong>
      </p>
    </div>
  );
}
