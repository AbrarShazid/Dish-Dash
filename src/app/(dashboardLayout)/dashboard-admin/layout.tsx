import { AppSidebar } from "@/components/layout/app-sidebar";


import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutAdminDash({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-white dark:bg-gray-900  border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset  className="bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
        <SiteHeader  />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
