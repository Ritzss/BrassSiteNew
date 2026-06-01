import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(
  request: NextRequest
) {

  const user =
    request.cookies.get("user");

  if (
    request.nextUrl.pathname.startsWith("/admin")
  ) {

    if (!user) {

      return NextResponse.redirect(
        new URL("/auth", request.url)
      );

    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
