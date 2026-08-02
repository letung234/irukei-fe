"use client";

import React from "react";
import AppShell from "@/components/AppShell";
import { mockStudents } from "@/lib/mock-data";
import { isFeatureLocked } from "@/lib/permissions-mock";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/student/profile", label: "Profile", icon: "👤" },
  { href: "/student/ai-consultation", label: "AI Consultation", icon: "✨" },
  { href: "/student/roadmaps", label: "Roadmaps", icon: "🗺️" },
  { href: "/student/my-posts", label: "My Posts", icon: "📝" },
  { href: "/student/offers", label: "Offers", icon: "💼" },
  { href: "/student/trial-access", label: "Trial Access", icon: "🎯" },
  { href: "/student/inbox", label: "Inbox", icon: "📬" },
  { href: "/student/settings", label: "Settings", icon: "⚙️" },
];

function StudentHeader() {
  const currentStudent = mockStudents[0];
  return (
    <div className="flex items-center justify-between flex-1">
      <div>
        <h2 className="text-lg font-semibold text-ink">Personal</h2>
        <p className="text-xs text-ink-soft">{currentStudent.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-ink">{currentStudent.creditsBalance} credits</p>
          <button className="text-xs text-brand hover:text-brand-ink">+ Recharge</button>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-semibold">
          {currentStudent.avatar}
        </div>
      </div>
    </div>
  );
}

function StudentSidebar() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-line">
        <h3 className="font-semibold text-ink">Navigation</h3>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isLocked = isFeatureLocked(item.label.toLowerCase().replace(" ", "-"));
            const isActive = currentPath.includes(item.href.split("/").pop() || "");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors relative",
                    isActive
                      ? "bg-brand-soft text-brand font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                    isLocked && "opacity-50 cursor-not-allowed pointer-events-none",
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {isLocked && <span className="text-xs">🔒</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-line p-4">
        <button className="w-full px-4 py-2 text-sm rounded-md bg-danger text-white hover:bg-danger-ink transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      header={<StudentHeader />}
      sidebar={<StudentSidebar />}
      density="comfortable"
    >
      {children}
    </AppShell>
  );
}
