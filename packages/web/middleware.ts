import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./routes";
import { SessionData } from "./types/auth";
import { navigations } from "./routes/navigation";

export default withAuth(function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie") ?? undefined,
    },
  };

  // @ts-ignore
  const session = request?.nextauth?.token as SessionData;

  if (!session && !request.nextUrl.pathname.includes(routes.auth.root())) {
    return NextResponse.redirect(new URL(routes.auth.login(), request.url));
  } else if (session && request.nextUrl.pathname.includes(routes.auth.root())) {
    return NextResponse.redirect(new URL(routes.main.monitor(), request.url));
  }

  const currentNavigation = navigations.find((n) =>
    request.nextUrl.pathname.includes(n.path)
  );

  if (currentNavigation) {
    const isPermitted = currentNavigation?.require_permissions.some((p) =>
      session.permission?.includes(p)
    ) || !currentNavigation?.require_permissions.length

    if (!isPermitted) {
      return NextResponse.redirect(
        new URL(routes.status.unauthorized(), request.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
