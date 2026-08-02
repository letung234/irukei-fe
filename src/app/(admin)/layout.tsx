"use client";

import React from "react";
import AppShell from "@/components/AppShell";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/root-orgs", label: "Root Orgs" },
  { href: "/admin/permissions-dictionary", label: "Permissions Dictionary" },
  { href: "/admin/plans", label: "Plans" },
  { href: "/admin/moderation", label: "Moderation" },
  { href: "/admin/billing-monitor", label: "Billing Monitor" },
  { href: "/admin/audit", label: "Audit" },
  { href: "/admin/system-health", label: "System Health" },
];

function AdminHeader() {
  return (
    <div className="flex items-center justify-between flex-1">
      <div>
        <h2 className="text-lg font-semibold text-ink">System Admin</h2>
        <p className="text-xs text-ink-soft">Platform operations</p>
      </div>
      <div className="w-8 h-8 rounded-md bg-danger text-white flex items-center justify-center text-sm font-semibold">
        SA
      </div>
    </div>
  );
}

function AdminSidebar() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-3 border-b border-line">
        <h3 className="font-semibold text-ink text-sm">Admin</h3>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-1" aria-label="Admin">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              currentPath === item.href || currentPath.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                    isActive
                      ? "bg-danger-soft text-danger-ink font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                  )}
                >
                  <span className="flex-1 truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={<AdminHeader />} sidebar={<AdminSidebar />} density="dense">
      {children}
    </AppShell>
  );
}
