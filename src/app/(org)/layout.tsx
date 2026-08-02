"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import Button from "@/components/ui/Button";
import { mockChildOrgs } from "@/lib/mock-data";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/org/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/org/tree", label: "Org Tree", icon: "🌳" },
  { href: "/org/users", label: "Users", icon: "👥" },
  { href: "/org/roles", label: "Roles", icon: "🔐" },
  { href: "/org/permissions", label: "Permissions", icon: "🛡️" },
  { href: "/org/companies", label: "Companies", icon: "🏢" },
  { href: "/org/billing", label: "Billing", icon: "💳" },
  { href: "/org/email-templates", label: "Email", icon: "📧" },
  { href: "/org/forms", label: "Forms", icon: "📋", locked: true },
  { href: "/org/audit", label: "Audit", icon: "📋" },
  { href: "/org/settings", label: "Settings", icon: "⚙️" },
];

function OrgHeader() {
  const [showOrgSelector, setShowOrgSelector] = useState(false);
  const currentOrg = mockChildOrgs[0];

  return (
    <div className="flex items-center justify-between flex-1">
      <div className="relative">
        <button
          onClick={() => setShowOrgSelector(!showOrgSelector)}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-bg-muted hover:bg-bg-hover transition-colors"
        >
          <span className="text-sm font-medium text-ink">{currentOrg.name}</span>
          <span className="text-xs">▼</span>
        </button>
        {showOrgSelector && (
          <div className="absolute top-full left-0 mt-1 w-80 bg-bg-elevated border border-line rounded-md shadow-lg z-50 p-2 max-h-96 overflow-y-auto">
            {mockChildOrgs.map((org) => (
              <button
                key={org.id}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  org.id === currentOrg.id
                    ? "bg-brand-soft text-brand"
                    : "hover:bg-bg-hover text-ink",
                )}
              >
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-ink-soft">
                  {org.memberCount} members
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-ink">Admin</p>
          <p className="text-xs text-ink-soft">Organization</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-semibold">
          AD
        </div>
      </div>
    </div>
  );
}

function OrgSidebar() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-3 border-b border-line">
        <h3 className="font-semibold text-ink text-sm">Org Admin</h3>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-1">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = currentPath.includes(
              item.href.split("/").pop() || ""
            );
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors relative",
                    isActive
                      ? "bg-brand-soft text-brand font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                    item.locked && "opacity-50 cursor-not-allowed pointer-events-none",
                  )}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.locked && <span className="text-xs">🔒</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line p-3">
        <Button size="sm" variant="danger" fullWidth>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default function OrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      header={<OrgHeader />}
      sidebar={<OrgSidebar />}
      density="dense"
    >
      {children}
    </AppShell>
  );
}
