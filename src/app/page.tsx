import { redirect } from "next/navigation";
import { PATHS } from "@/constants/paths";

/**
 * Root page — redirect to dashboard.
 * Middleware will redirect to /login if unauthenticated.
 */
export default function RootPage() {
  redirect(PATHS.DASHBOARD);
}
