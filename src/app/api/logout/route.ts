import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}