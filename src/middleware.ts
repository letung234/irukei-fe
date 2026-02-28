import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEYS, PUBLIC_ROUTES, TWO_FA_ROUTES } from "@/constants";

/**
 * Next.js Middleware — Route Protection
 *
 * Handles three route tiers:
 *  1. Public routes (login, forgot-password, reset-password)
 *  2. 2FA routes (verify-2fa, setup-2fa) — special access rules
 *  3. Protected routes — require valid access token
 *
 * Mirrors irukei's twoFAMiddleware.ts + main middleware.ts pattern.
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

  const accessToken = request.cookies.get(TOKEN_KEYS.ACCESS_TOKEN)?.value;
  const isAuthenticated = Boolean(accessToken);

  // ── 2FA Routes ──────────────────────────────────────────────────────────────

  if (pathname === TWO_FA_ROUTES.VERIFY) {
    // /verify-2fa: accessible only if NOT fully authenticated AND has temp 2FA credential cookie
    // Mirrors irukei's verifyTwoFARedirectTo logic
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    const twoFaCredential = request.cookies.get(
      TOKEN_KEYS.TWO_FA_CREDENTIAL,
    )?.value;
    if (!twoFaCredential) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === TWO_FA_ROUTES.SETUP) {
    // /setup-2fa: requires authentication (user is logged in but 2FA not set up yet)
    // Mirrors irukei's twoFAMiddleware SETUP_TWO_FA logic
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // ── Public Routes ────────────────────────────────────────────────────────────

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Authenticated user trying to access auth pages → redirect to dashboard
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Unauthenticated user trying to access protected page → redirect to login
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
