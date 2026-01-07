import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const guestRoutes = [
  "/login",
  "/reset-password",
  "/forgot-password",
  "/dashboard",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("cred-crm-ticket-tok")?.value;
  const { pathname } = request.nextUrl;

  const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));

  if (!token && !isGuestRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isGuestRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/kyci-dashboard/:path*",
    "/kyc-supervisor/:path*",
    "/kyc-approval-supervisor/:path*",
    "/physical-verification/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/login",
    "/reset-password",
    "/forgot-password",
  ],
};
