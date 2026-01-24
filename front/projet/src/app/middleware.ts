import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("token")?.value;

  // Routes protégées
  const protectedPaths = ["/connectedPage", "/dashboard"];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!tokenCookie) {
      // Pas de token → redirection vers /
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/connectedPage/:path*", "/dashboard/:path*"],
};
