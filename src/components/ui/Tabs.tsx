"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
}

/**
 * Tabs
 * Tab list with panels.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      defaultTabId,
      onTabChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [activeTabId, setActiveTabId] = useState(
      defaultTabId || tabs[0]?.id || "",
    );

    const handleTabChange = (tabId: string) => {
      setActiveTabId(tabId);
      onTabChange?.(tabId);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* Tab List */}
        <div
          className="flex border-b border-line"
          role="tablist"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
                activeTabId === tab.id
                  ? "text-brand border-b-2 border-brand"
                  : "text-ink-soft hover:text-ink",
              )}
              role="tab"
              aria-selected={activeTabId === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTabId !== tab.id}
            className="py-4"
          >
            {activeTabId === tab.id && tab.content}
          </div>
        ))}
      </div>
    );
  },
);

Tabs.displayName = "Tabs";
export default Tabs;
