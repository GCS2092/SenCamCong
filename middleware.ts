import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isSessionValid } from "@/lib/adminAuth";

// Protège toutes les routes /admin/*, sauf la page de login elle-même
// (sinon on redirige en boucle infinie vers /admin/login).
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const secret = process.env.ADMIN_SESSION_SECRET;
    const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    const valid = secret ? await isSessionValid(secret, cookie) : false;

    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};