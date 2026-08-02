"use client";

import React from "react";
import AppShell from "@/components/AppShell";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/root-orgs", label: "Root Orgs", icon: "🌍" },
  { href: "/admin/permissions-dictionary", label: "Permissions", icon: "🔐" },
  { href: "/admin/plans", label: "Plans", icon: "📋" },
  { href: "/admin/moderation", label: "Moderation", icon: "🛑" },
  { href: "/admin/billing-monitor", label: "Billing", icon: "💳" },
  { href: "/admin/audit", label: "Audit Log", icon: "📋" },
  { href: "/admin/system-health", label: "System Health", icon: "🏥" },
];

function AdminHeader() {
  return (
    <div className="flex items-center justify-between flex-1">
      <div>
        <h2 className="text-lg font-semibold text-ink">System Admin</h2>
        <p className="text-xs text-ink-soft">Master Control Panel</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-ink">Administrator</p>
          <p className="text-xs text-ink-soft">Full Access</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-danger text-white flex items-center justify-center text-sm font-semibold">
          SA
        </div>
      </div>
    </div>
  );
}

function AdminSidebar() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-3 border-b border-line">
        <h3 className="font-semibold text-ink text-sm">System Admin</h3>
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
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                    isActive
                      ? "bg-danger-soft text-danger font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                  )}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      header={<AdminHeader />}
      sidebar={<AdminSidebar />}
      density="dense"
    >
      {children}
    </AppShell>
  );
}
