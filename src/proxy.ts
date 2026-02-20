import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole = Roles.public;

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
      pathName.startsWith("/dashboard") ||
      pathName.startsWith("/my-order") ||
      pathName.startsWith("/order")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (userRole === Roles.provider) {
    if (
      pathName.startsWith("/admin-dashboard") ||
      pathName.startsWith("/my-order")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (userRole === Roles.customer) {
    if (
      pathName.startsWith("/dashboard") ||
      pathName.startsWith("/order") ||
      pathName.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/order",
    "/order/:path*",
    "/my-order",
    "/my-order/:path*",
  ],
};



// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "./services/user.service";
// import { Roles } from "./constants/roles";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const { data } = await userService.getSession();

//   const isAuthenticated = !!data;
//   const userRole = data?.user?.role;

//   // 1️⃣ If NOT logged in → redirect to login with callback
//   if (!isAuthenticated) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // 2️⃣ Protect Admin Routes
//   if (pathname.startsWith("/admin-dashboard")) {
//     if (userRole !== Roles.admin) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // 3️⃣ Protect Provider Routes
//   if (pathname.startsWith("/dashboard")) {
//     if (userRole !== Roles.provider) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // 4️⃣ Protect Customer Routes
//   if (
//     pathname.startsWith("/my-order") ||
//     pathname.startsWith("/order")
//   ) {
//     if (userRole !== Roles.customer) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   return NextResponse.next();
// }
