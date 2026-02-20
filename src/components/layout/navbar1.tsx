"use client";

import { Menu, ShoppingCart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Roles } from "@/constants/roles";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface User {
  name: string;
  role: string;
  email: string;
  image: string;
}

interface NavbarProps {
  user: User | null;
  className?: string;
  logo?: {
    url: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  cartItemCount?: number;
}

const Navbar = ({
  user,
  logo = {
    url: "/",
    alt: "logo",
    title: "DishDash",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Meals",
      url: "/meals",
    },
    {
      title: "Providers",
      url: "/providers",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  cartItemCount = 0,
  className,
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get menu items based on user role
  const getMenuItems = () => {
    if (!user) {
      // Default menu for logged out users
      return [
        { title: "Home", url: "/" },
        { title: "Meals", url: "/meals" },
        { title: "Providers", url: "/providers" },
      ];
    }

    switch (user.role) {
      case Roles.provider:
        return [
          { title: "Home", url: "/" },
          { title: "Meals", url: "/meals" },
          { title: "Providers", url: "/providers" },
          { title: "Orders", url: "/orders" },
          { title: "Dashboard", url: "/dashboard" },
        ];
      case Roles.admin:
        return [
          { title: "Home", url: "/" },
          { title: "Meals", url: "/meals" },
          { title: "Providers", url: "/providers" },
          { title: "Dashboard", url: "/dashboard" },
        ];
      case Roles.customer:
      default:
        return [
          { title: "Home", url: "/" },
          { title: "Meals", url: "/meals" },
          { title: "Providers", url: "/providers" },
          { title: "My Orders", url: "/my-orders" },
          { title: "Become a Provider", url: "/become-provider" },
        ];
    }
  };

  const menuItems = getMenuItems();

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if cart should be shown
  const showCart = () => {
    if (!user) return true; // Show for logged out users
    return user.role === Roles.customer; // Show only for customers
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <Link
            href={logo.url}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {logo.title}
            </span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menuItems.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Cart, Theme Toggle, and User Menu/Auth */}
          <div className="flex items-center gap-3">
            {/* Cart Icon - Show for customers and logged out users */}
            {showCart() && (
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            <ThemeToggle />

            {user ? (
              // User is logged in - show avatar with dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile/update"
                      className="w-full cursor-pointer"
                    >
                      Update Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={async () => {
                      await authClient.signOut();
                      router.push("/");
                      router.refresh();
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // User is not logged in - show login/signup buttons
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hover:bg-amber-100 dark:hover:bg-amber-900/30"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <Link
              href={logo.url}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Cart Icon for mobile */}
              {showCart() && (
                <Link href="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}

              <ThemeToggle />

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent className="w-full sm:w-[400px] p-0">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle>
                      <Link
                        href={logo.url}
                        className="flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col p-6">
                    {/* User info for mobile if logged in */}
                    {user && (
                      <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.image || ""} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    )}

                    <nav className="flex flex-col space-y-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="text-lg font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors block py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </nav>

                    {user ? (
                      // User menu items for mobile when logged in
                      <div className="flex flex-col gap-3 mt-8 pt-6 border-t">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/profile">My Profile</Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/profile/update">Update Profile</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={async () => {
                            setIsOpen(false);

                            await authClient.signOut();
                            router.push("/");
                            router.refresh();
                          }}
                        >
                          Log out
                        </Button>
                      </div>
                    ) : (
                      // Auth buttons for mobile when logged out
                      <div className="flex flex-col gap-3 mt-8 pt-6 border-t">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className="relative inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-amber-600 after:to-orange-600 hover:after:w-full after:transition-all after:duration-300"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export { Navbar };
