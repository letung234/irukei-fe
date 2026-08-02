"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import { mockChildOrgs } from "@/lib/mock-data";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/app/org/dashboard", label: "Dashboard" },
  { href: "/app/org/tree", label: "Org Tree" },
  { href: "/app/org/users", label: "Users" },
  { href: "/app/org/roles", label: "Roles" },
  { href: "/app/org/permissions", label: "Permissions" },
  { href: "/app/org/companies", label: "Companies" },
  { href: "/app/org/billing", label: "Billing" },
  { href: "/app/org/email-templates", label: "Email Templates" },
  { href: "/app/org/forms", label: "Forms", locked: true },
  { href: "/app/org/audit", label: "Audit" },
  { href: "/app/org/settings", label: "Settings" },
];

function OrgHeader() {
  const [showOrgSelector, setShowOrgSelector] = useState(false);
  const currentOrg = mockChildOrgs[0];

  return (
    <div className="flex items-center justify-between flex-1 gap-4">
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowOrgSelector(!showOrgSelector)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-muted hover:bg-bg-hover transition-colors text-sm font-medium text-ink"
          aria-expanded={showOrgSelector}
        >
          Workspace: {currentOrg.name}
          <span className="text-ink-lighter text-xs" aria-hidden>
            ▾
          </span>
        </button>
        {showOrgSelector && (
          <div className="absolute top-full left-0 mt-1 w-80 bg-bg-elevated border border-line rounded-md shadow-lg z-50 p-2 max-h-96 overflow-y-auto">
            {mockChildOrgs.map((org) => (
              <button
                key={org.id}
                type="button"
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  org.id === currentOrg.id
                    ? "bg-brand-soft text-brand-ink"
                    : "hover:bg-bg-hover text-ink",
                )}
              >
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-ink-soft">{org.type}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-sm font-medium text-ink">Org Admin</p>
        <p className="text-xs text-ink-soft">Permission-aware shell</p>
      </div>
    </div>
  );
}

function OrgSidebar() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-3 border-b border-line">
        <h3 className="text-sm font-semibold text-ink">Organization</h3>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-1" aria-label="Org">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              currentPath === item.href || currentPath.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.locked ? "#" : item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                    isActive
                      ? "bg-brand-soft text-brand-ink font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                    item.locked && "opacity-50 pointer-events-none",
                  )}
                >
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.locked && (
                    <span className="text-[10px] text-ink-lighter">Deferred</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default function OrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={<OrgHeader />} sidebar={<OrgSidebar />} density="dense">
      {children}
    </AppShell>
  );
}
