
import { menuService } from "@/services/menu.service";

import MenuItemCard from "./itemCard";
import Link from "next/link";


export default async function MenuItemForHome() {
  const { data, error } = await menuService.getAllMenuItem({
    limit: 4,
  });

  return (
    <section className="max-w-7xl mx-auto  py-12">
      {/* Header  */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className=" text-3xl font-bold text-gray-900 dark:text-white    mb-2">
            Popular Items
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Most ordered dishes right now
          </p>
        </div>
        <Link
          href="/meals"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
        >
          View all
          <span className="text-lg">→</span>
        </Link>
      </div>

      {/* Error or Empty  */}
      {error ? (
        <div className="text-center py-12">
          <p className="text-sm text-red-600 dark:text-red-400">
            {error.message}
          </p>
        </div>
      ) : !data?.data?.length ? (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No menu items available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {data.data.map((item: any) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  
  );
}
