import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers.get("host")!;

  // Strip port for localhost development
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
      : hostname.split(":")[0];

  // If the host is admin.coexportid.com or admin.localhost
  if (currentHost === "admin.coexportid.com" || currentHost === "admin.localhost") {
    // Check for admin_token cookie
    const hasToken = req.cookies.has("admin_token");
    
    // If no token and not already on the login page, redirect to login
    if (!hasToken && url.pathname !== "/login") {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Rewrite to the /(erp) route
    if (!url.pathname.startsWith("/erp")) {
      url.pathname = `/erp${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}