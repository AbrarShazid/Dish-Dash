"use client";
import { NavMain } from "@/components/layout/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  ListOrdered,
  TagsIcon,
  User2,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "All Orders",
      url: "#",
      icon: ListOrdered,
    },
    {
      title: "All User",
      url: "#",
      icon: User2,
    },
    {
      title: "Manage Category",
      url: "#",
      icon: TagsIcon,
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/"className="text-xl font-semibold">
               
                DishDash
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
