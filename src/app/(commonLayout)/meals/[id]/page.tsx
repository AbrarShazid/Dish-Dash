import MaelDetailsClient from "@/components/modules/allMealsPage/mealDetailClient";
import { menuService } from "@/services/menu.service";

import Link from "next/link";

export default async function ItemDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await menuService.getMenuById(id);
  const item = data?.data;

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center rounded-xl">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Item not found</p>
          <Link
            href="/meals"
            className="text-orange-600 hover:underline mt-2 block"
          >
            Back to meals
          </Link>
        </div>
      </div>
    );
  }

  return <MaelDetailsClient item={item}></MaelDetailsClient>;
}
