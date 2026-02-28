"use client";

import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import { useState } from "react";

/**
 * DashboardLayout
 * Protected area layout with a top navigation bar.
 * Shows user info + logout, mirrors irukei's main app shell concept.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-brand-600">Irukei</span>
            <span className="text-sm text-gray-400">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <span className="ml-2 text-gray-400">{user.email}</span>
              </div>
            )}
            <Button
              variant="secondary"
              size="sm"
              isLoading={isLoggingOut}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
