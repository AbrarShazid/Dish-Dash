import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole = "";

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userRole === Roles.admin) {
    if (
      pathName.startsWith("/dashboard-provider") ||
      pathName.startsWith("/my-orders") ||
      pathName.startsWith("/orders")
    ) {
      return NextResponse.redirect(new URL("/dashboard-admin", request.url));
    }
  }

  if (userRole === Roles.provider) {
    if (
      pathName.startsWith("/dashboard-admin") ||
      pathName.startsWith("/my-orders")
    ) {
      return NextResponse.redirect(new URL("/dashboard-provider", request.url));
    }
  }

  if (userRole === Roles.customer) {
    if (
      pathName.startsWith("/dashboard-provider") ||
      pathName.startsWith("/orders") ||
      pathName.startsWith("/dashboard-admin")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard-provider",
    "/dashboard-provider/:path*",
    "/dashboard-admin",
    "/dashboard-admin/:path*",
    "/orders",
    "/orders/:path*",
    "/my-orders",
    "/my-orders/:path*",
  ],
};
