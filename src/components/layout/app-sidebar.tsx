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
      url: "/dashboard-admin",
      icon: LayoutDashboard,
    },
    {
      title: "All Orders",
      url: "/dashboard-admin/all-orders",
      icon: ListOrdered,
    },
    {
      title: "All User",
      url: "/dashboard-admin/all-user",
      icon: User2,
    },
    {
      title: "Manage Category",
      url: "/dashboard-admin/manage-category",
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
    <Sidebar   collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-white dark:bg-gray-900 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! "
            >
              <Link href="/" className="text-xl font-semibold hover:bg-orange-50   hover:dark:bg-gray-800">
               
                DishDash
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-gray-900 rounded-sm border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all ">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
