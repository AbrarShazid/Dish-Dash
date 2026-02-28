import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";
import { userStatus } from "./constants/userStatus";

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

  if (data.user.status === userStatus.SUSPEND) {
    const url = new URL("/suspended", request.url);
    return NextResponse.redirect(url);
  }

  if (userRole === Roles.admin) {
    if (
      pathName.startsWith("/dashboard-provider") ||
      pathName.startsWith("/my-orders") ||
      pathName.startsWith("/orders") ||
      pathName.startsWith("/cart") ||
      pathName.startsWith("/checkout") ||
      pathName.startsWith("/become-provider")
    ) {
      return NextResponse.redirect(new URL("/dashboard-admin", request.url));
    }
  }

  if (userRole === Roles.provider) {
    if (
      pathName.startsWith("/dashboard-admin") ||
      pathName.startsWith("/my-orders") ||
      pathName.startsWith("/cart") ||
      pathName.startsWith("/checkout") ||
      pathName.startsWith("/become-provider")
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
    "/cart",
    "/checkout",
    "/dashboard-provider",
    "/dashboard-provider/:path*",
    "/dashboard-admin",
    "/dashboard-admin/:path*",
    "/orders",
    "/orders/:path*",
    "/my-orders",
    "/my-orders/:path*",
    "/become-provider"
  ],
};