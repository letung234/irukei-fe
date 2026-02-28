import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEYS, PUBLIC_ROUTES } from "@/constants";

/**
 * Next.js Middleware — Route Protection
 *
 * Runs on the Edge runtime before every page render.
 * Mirrors irukei's src/middleware.ts pattern:
 *  - If the route is public (login, forgot-password, reset-password) → allow
 *  - If the user has a valid access token cookie → allow
 *  - Otherwise → redirect to /login
 *
 * NOTE: JWT signature is NOT verified here (Edge runtime limitations).
 *       The BE validates the token on every API call.
 *       For production, use jose to verify the token on the Edge.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const accessToken = request.cookies.get(TOKEN_KEYS.ACCESS_TOKEN)?.value;

  // Authenticated user trying to access auth pages → redirect to dashboard
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Unauthenticated user trying to access protected page → redirect to login
  if (!isPublicRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
