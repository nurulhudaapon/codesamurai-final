import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./routes";

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie") ?? undefined,
    },
  };
  const session = await getSession({ req: requestForNextAuth });

  if (!session && !request.nextUrl.pathname.includes(routes.auth.root())) {
    return NextResponse.redirect(new URL(routes.auth.login(), request.url));
  } else if (session && request.nextUrl.pathname.includes(routes.auth.root())) {
    return NextResponse.redirect(new URL(routes.main.monitor(), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
