import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname !== pathname.toLowerCase()) {
    const lowercaseUrl = request.nextUrl.clone()
    lowercaseUrl.pathname = pathname.toLowerCase()
    return NextResponse.redirect(lowercaseUrl, 301)
  }

  if (pathname === "/yourface.online/blog") {
    return NextResponse.redirect(new URL(`/blog${search}`, request.url), 301)
  }

  if (pathname.startsWith("/yourface.online/blog/")) {
    const suffix = pathname.slice("/yourface.online/blog".length)
    return NextResponse.redirect(new URL(`/blog${suffix}${search}`, request.url), 301)
  }

  if (pathname === "/admin" || (pathname.startsWith("/admin/") && !pathname.startsWith("/admin/login"))) {
    const adminSession = request.cookies.get("admin-session")
    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
