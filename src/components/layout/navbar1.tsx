"use client";

import { Menu } from "lucide-react";
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
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
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
}

const Navbar = ({
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
  className,
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-transparent py-4",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {logo.title}
            </span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
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
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative"
                  >
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
                    <nav className="flex flex-col space-y-4">
                      {menu.map((item) => (
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
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
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