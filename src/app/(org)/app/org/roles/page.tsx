import React from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Checkbox from "@/components/ui/Checkbox";
import { mockRoles, mockPermissions } from "@/lib/mock-data";

export default function RolesPage() {
  const selectedRole = mockRoles[0]; // Admin role

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Role & Permission Manager"
        description="Manage roles and their permissions"
        primaryAction={<Button variant="primary" size="md">+ Create Role</Button>}
      />

      {/* Main Content - 3 Column Layout */}
      <div className="grid md:grid-cols-3 gap-4 h-[600px]">
        {/* Left: Role List */}
        <Card className="p-4 flex flex-col overflow-hidden">
          <h3 className="font-semibold text-ink mb-4 text-sm">Roles</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {mockRoles.map((role) => (
              <button
                key={role.id}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  role.id === selectedRole.id
                    ? "bg-brand-soft text-brand font-medium"
                    : "hover:bg-bg-hover text-ink-soft"
                }`}
              >
                <div className="font-medium">{role.name}</div>
                <div className="text-xs opacity-75">{role.permissionIds.length} perms</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Center: Allow Permissions */}
        <Card className="p-4 border-2 border-ok-soft flex flex-col overflow-hidden bg-ok-soft/30">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-ok-ink text-sm">Allow Zone</h3>
            <Badge variant="success" size="sm">Grant</Badge>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {mockPermissions.map((perm) => {
              const isGranted = selectedRole.permissionIds.includes(perm.id);
              const isHighRisk = perm.riskLevel === "high" || perm.riskLevel === "critical";
              return (
                <div
                  key={perm.id}
                  className="flex items-start gap-2 p-2 rounded-md hover:bg-ok-soft/50 transition-colors"
                >
                  <Checkbox
                    id={perm.id}
                    checked={isGranted}
                    disabled
                    label={
                      <div className="flex items-center gap-1">
                        <span>{perm.name}</span>
                        {isHighRisk && (
                          <Badge variant="warning" size="sm">⚠️ High Risk</Badge>
                        )}
                      </div>
                    }
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right: Deny Permissions */}
        <Card className="p-4 border-2 border-danger-soft flex flex-col overflow-hidden bg-danger-soft/30">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-danger-ink text-sm">Deny Zone</h3>
            <Badge variant="danger" size="sm">Restrict</Badge>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            <div className="p-3 text-xs text-danger-ink text-center opacity-60">
              No restrictions configured
            </div>
          </div>
        </Card>
      </div>

      {/* Permission Matrix Below */}
      <Card className="p-6">
        <h3 className="font-semibold text-ink mb-4">Permission Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left px-2 py-2 font-medium text-ink-soft">Permission</th>
                <th className="text-center px-2 py-2 font-medium text-ink-soft">Admin</th>
                <th className="text-center px-2 py-2 font-medium text-ink-soft">Manager</th>
                <th className="text-center px-2 py-2 font-medium text-ink-soft">Recruiter</th>
                <th className="text-center px-2 py-2 font-medium text-ink-soft">Guest</th>
              </tr>
            </thead>
            <tbody>
              {mockPermissions.map((perm) => (
                <tr key={perm.id} className="border-b border-line hover:bg-bg-hover">
                  <td className="px-2 py-3 text-ink">{perm.name}</td>
                  {mockRoles.map((role) => (
                    <td key={role.id} className="text-center px-2 py-3">
                      {role.permissionIds.includes(perm.id) ? (
                        <span className="text-ok text-lg">✓</span>
                      ) : (
                        <span className="text-line">−</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
