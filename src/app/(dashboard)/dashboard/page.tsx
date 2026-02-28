import type { Metadata } from "next";
import Link from "next/link";
import { PATHS } from "@/constants/paths";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * DashboardPage
 * Landing page after successful login.
 * Displays user info + navigation cards for future learning modules.
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to Irukei — your irukei learning space.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={PATHS.CHANGE_PASSWORD}
          className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-400 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-gray-800 group-hover:text-brand-600">
            Change Password
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your account password securely.
          </p>
        </Link>

        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 opacity-60">
          <h3 className="font-semibold text-gray-500">Users & Profiles</h3>
          <p className="mt-1 text-sm text-gray-400">
            Coming soon — next learning ticket.
          </p>
        </div>

        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 opacity-60">
          <h3 className="font-semibold text-gray-500">Organisation</h3>
          <p className="mt-1 text-sm text-gray-400">
            Coming soon — multi-tenant system.
          </p>
        </div>

        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 opacity-60">
          <h3 className="font-semibold text-gray-500">RBAC / Policies</h3>
          <p className="mt-1 text-sm text-gray-400">
            Coming soon — role-based access.
          </p>
        </div>
      </div>
    </div>
  );
}
