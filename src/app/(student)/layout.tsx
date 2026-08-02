"use client";

import React from "react";
import AppShell from "@/components/AppShell";
import { mockStudents } from "@/lib/mock-data";
import { isFeatureLocked } from "@/lib/permissions-mock";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/app/student/dashboard", label: "Dashboard" },
  { href: "/app/student/profile", label: "Profile" },
  { href: "/app/student/ai-consultation", label: "AI Consultation" },
  { href: "/app/student/roadmaps", label: "Roadmaps" },
  { href: "/app/student/my-posts", label: "My Posts" },
  { href: "/app/student/offers", label: "Offers" },
  { href: "/app/student/trial-access", label: "Trial Access" },
  { href: "/app/student/inbox", label: "Inbox" },
  { href: "/app/student/settings", label: "Settings" },
];

function StudentHeader() {
  const currentStudent = mockStudents[0];
  return (
    <div className="flex items-center justify-between flex-1 gap-4">
      <div>
        <p className="font-display text-lg font-semibold text-ink">Irukei</p>
        <p className="text-xs text-ink-soft">Personal · {currentStudent.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-ink">
            {currentStudent.creditsBalance} credits
          </p>
          <button type="button" className="text-xs text-brand hover:text-brand-ink">
            Recharge
          </button>
        </div>
        <div
          className="w-8 h-8 rounded-md bg-brand text-white flex items-center justify-center text-sm font-semibold"
          aria-hidden
        >
          {currentStudent.avatar}
        </div>
      </div>
    </div>
  );
}

function StudentSidebar() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-line">
        <h3 className="text-sm font-semibold text-ink">Student</h3>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2" aria-label="Student">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const key = item.label.toLowerCase().replace(/\s+/g, "-");
            const isLocked = isFeatureLocked(key);
            const isActive = currentPath === item.href || currentPath.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={isLocked ? "#" : item.href}
                  aria-disabled={isLocked}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-brand-soft text-brand-ink font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-bg-hover",
                    isLocked && "opacity-50 pointer-events-none",
                  )}
                >
                  <span className="flex-1">{item.label}</span>
                  {isLocked && (
                    <span className="text-xs text-ink-lighter">Locked</span>
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
