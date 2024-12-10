import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const authCookieValue = request.cookies.get("admin-auth")?.value;
  const hasAuthCookie = authCookieValue !== undefined;

  const isAuthenticated = hasAuthCookie && authCookieValue === "true";

  if (isAdminRoute && !hasAuthCookie) {
    return NextResponse.next();
  }

  if (isAdminRoute && hasAuthCookie && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Aplica o middleware apenas às rotas de admin
};
