import { menuService } from "@/services/menu.service";
import { MenuManagement } from "./MenuManagement";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuSquare } from "lucide-react";
import { categoryService } from "@/services/category.service";
import Link from "next/link";
import { ErrorState } from "@/components/layout/ErrorState";
import { EmptyState } from "@/components/layout/EmptyState";

export default async function MenuManagementServer() {
  const { data, error } = await menuService.getRestaurantMenu();
  const { data: categoryData, error: categoryError } =
    await categoryService.getAllCategory();

  if (error) return <ErrorState message={error.message} />;
  if (categoryError) return <ErrorState message={categoryError.message} />;
  if (!data?.menu?.length)
    return (
      <EmptyState
        title="No Menu found"
        message="Menu Item will appear here once you add!"
      />
    );
  if (!categoryData?.length) return <EmptyState title="No Category found" />;

  return (
    <MenuManagement
      menuItems={data.menu}
      categoryData={categoryData}
    ></MenuManagement>
  );
}
