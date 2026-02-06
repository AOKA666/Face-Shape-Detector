import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname !== pathname.toLowerCase()) {
    const lowercaseUrl = request.nextUrl.clone()
    lowercaseUrl.pathname = pathname.toLowerCase()
    return NextResponse.redirect(lowercaseUrl, 301)
  }

  // Only check admin routes, not the login page
  if (
    pathname === "/admin" ||
    (pathname.startsWith("/admin/") && !pathname.startsWith("/admin/login"))
  ) {
    // Check for admin session cookie
    const adminSession = request.cookies.get("admin-session")

    if (!adminSession || adminSession.value !== "authenticated") {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
