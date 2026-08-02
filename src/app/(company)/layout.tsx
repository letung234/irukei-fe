"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import { mockCompanies } from "@/lib/mock-data";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/app/company/dashboard", label: "Dashboard" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/app/company/leads", label: "Leads" },
  { href: "/app/company/offers", label: "Offers" },
  { href: "/app/company/trial-students", label: "Trial Students" },
  { href: "/app/company/services", label: "Services" },
  { href: "/app/company/profile", label: "Profile" },
  { href: "/app/company/mail", label: "Mail", locked: true },
  { href: "/app/company/settings", label: "Settings" },
];

function CompanyHeader() {
  const [showOrgSelector, setShowOrgSelector] = useState(false);
  const currentCompany = mockCompanies[0];

  return (
    <div className="flex items-center justify-between flex-1 gap-4">
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowOrgSelector(!showOrgSelector)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-muted hover:bg-bg-hover transition-colors text-sm font-medium text-ink"
          aria-expanded={showOrgSelector}
          aria-haspopup="listbox"
        >
          Workspace: {currentCompany.name}
          <span className="text-ink-lighter text-xs" aria-hidden>
            ▾
          </span>
        </button>
        {showOrgSelector && (
          <div
            className="absolute top-full left-0 mt-1 w-64 bg-bg-elevated border border-line rounded-md shadow-lg z-50 p-2"
            role="listbox"
          >
            {mockCompanies.map((co) => (
              <button
                key={co.id}
                type="button"
                role="option"
                aria-selected={co.id === currentCompany.id}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  co.id === currentCompany.id
                    ? "bg-brand-soft text-brand-ink"
                    : "hover:bg-bg-hover text-ink",
                )}
              >
                {co.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-ink">Company</p>
          <p className="text-xs text-ink-soft">{currentCompany.city}</p>
        </div>
        <div className="w-8 h-8 rounded-md bg-brand text-white flex items-center justify-center text-sm font-semibold">
          {currentCompany.avatar}
        </div>
      </div>
    </div>
  );
}

function CompanySidebar() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-line">
        <h3 className="text-sm font-semibold text-ink">Company</h3>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2" aria-label="Company">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              currentPath === item.href || currentPath.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.locked ? "#" : item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-brand-soft text-brand-ink font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                    item.locked && "opacity-50 pointer-events-none",
                  )}
                >
                  <span className="flex-1">{item.label}</span>
                  {item.locked && (
                    <span className="text-xs text-ink-lighter">No access</span>
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
