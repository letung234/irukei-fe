"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

interface AppShellProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  density?: "comfortable" | "dense";
}

/**
 * AppShell
 * Main layout wrapper combining header, sidebar, and main content.
 * Supports density modes for different app types.
 */
export const AppShell: React.FC<AppShellProps> = ({
  header,
  sidebar,
  children,
  density = "comfortable",
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      data-density={density}
      className="flex h-screen bg-bg text-ink"
    >
      {/* Sidebar */}
      <aside
        className={cn(
          "flex-shrink-0 bg-bg-elevated border-r border-line transition-all",
          "hidden md:flex md:flex-col md:w-64",
          "fixed md:relative z-40 h-full w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {sidebar}
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 bg-bg-elevated border-b border-line sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-ink-soft hover:text-ink transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex-1 md:flex-none">{header}</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full">{children}</div>
        </main>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-overlay-dark z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppShell;
