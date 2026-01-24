import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages protégées
const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const url = req.nextUrl.clone();

  // Si route protégée et pas de token → redirige vers login
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Si page login/signup et utilisateur déjà connecté → redirige dashboard
  if ((req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/signup") && token) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Appliquer middleware sur toutes les pages
export const config = {
  matcher: ["/", "/signup", "/dashboard/:path*"],
};
