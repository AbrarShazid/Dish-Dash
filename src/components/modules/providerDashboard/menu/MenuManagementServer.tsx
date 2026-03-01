import { menuService } from "@/services/menu.service";
import { MenuManagement } from "./MenuManagement";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, MenuSquare } from "lucide-react";
import { categoryService } from "@/services/category.service";

export default async function MenuManagementServer() {
  const { data, error } = await menuService.getRestaurantMenu();
  const { data: categoryData, error: categoryError } =
    await categoryService.getAllCategory();

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 text-center bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {error.message}
          </p>
          <Button asChild>
            <Link href="/">Go Back</Link>
          </Button>
        </Card>
      </div>
    );
  }
  if (categoryError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 text-center bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {categoryError.message}
          </p>
          <Button asChild>
            <Link href="/">Go Back</Link>
          </Button>
        </Card>
      </div>
    );
  }
  //menu data
  if (!data || data.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-12 text-center">
          <MenuSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            No Menu found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Menu Item will appear here once you add!
          </p>
        </Card>
      </div>
    );
  }
  //category data
  if (!categoryData || categoryData.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-12 text-center">
          <MenuSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            No Category found
          </h2>
        </Card>
      </div>
    );
  }

  return (
    <MenuManagement
      menuItems={data.menu}
      categoryData={categoryData}
    ></MenuManagement>
  );
}
