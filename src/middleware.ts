import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Cookie } from "undici-types";

export const config = {
  matcher: [
    "/home/:path*",
    "/cards/:path*",
    "/shops/:path*",
    "/cart/:path*",
    "/",
    "/account/:path*",
    "/payments/:path*",
    "/orders/:path*",
    // "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const cookieToken: Cookie | undefined = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const publicPaths: string[] = [
    "/login",
    "/register",
    "/trusted",
    "/verification",
  ];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);

  if (!cookieToken) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
