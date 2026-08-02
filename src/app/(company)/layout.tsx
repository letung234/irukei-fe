"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import Button from "@/components/ui/Button";
import { mockCompanies } from "@/lib/mock-data";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/company/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/company/marketplace", label: "Marketplace", icon: "🛍️" },
  { href: "/company/leads", label: "Leads", icon: "👥" },
  { href: "/company/offers", label: "Offers", icon: "💼" },
  { href: "/company/trial-students", label: "Trials", icon: "🎯" },
  { href: "/company/services", label: "Services", icon: "🔧" },
  { href: "/company/profile", label: "Profile", icon: "🏢" },
  { href: "/company/settings", label: "Settings", icon: "⚙️" },
];

function CompanyHeader() {
  const [showOrgSelector, setShowOrgSelector] = useState(false);
  const currentCompany = mockCompanies[0];

  return (
    <div className="flex items-center justify-between flex-1">
      <div className="relative">
        <button
          onClick={() => setShowOrgSelector(!showOrgSelector)}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-bg-muted hover:bg-bg-hover transition-colors"
        >
          <span className="text-sm font-medium text-ink">
            {currentCompany.name}
          </span>
          <span className="text-xs">▼</span>
        </button>
        {showOrgSelector && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-bg-elevated border border-line rounded-md shadow-lg z-50 p-2">
            {mockCompanies.map((co) => (
              <button
                key={co.id}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  co.id === currentCompany.id
                    ? "bg-brand-soft text-brand"
                    : "hover:bg-bg-hover text-ink",
                )}
              >
                {co.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-ink">Company Account</p>
          <p className="text-xs text-ink-soft">{currentCompany.city}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-semibold">
          {currentCompany.avatar}
        </div>
      </div>
    </div>
  );
}

function CompanySidebar() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-line">
        <h3 className="font-semibold text-ink">Navigation</h3>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath.includes(
              item.href.split("/").pop() || ""
            );
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-brand-soft text-brand font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line p-4">
        <Button size="md" variant="danger" fullWidth>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      header={<CompanyHeader />}
      sidebar={<CompanySidebar />}
      density="dense"
    >
      {children}
    </AppShell>
  );
}
