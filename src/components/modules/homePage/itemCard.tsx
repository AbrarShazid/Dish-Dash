"use client";
import { useCart } from "@/context/cartContext";
import { ShoppingCart, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MenuItemCard({ item }: { item: any }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      mealId: item.id,
      mealName: item.name,
      price: parseFloat(item.price),
      imageUrl: item.imageUrl,
      providerId: item.providerId,
      providerName: item.restaurantName,
    });
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all p-3">
      {/* Image placeholder */}
      <div className="aspect-square bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg mb-3 flex items-center justify-center">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            quality={50}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-3xl opacity-30">🍽️</span>
        )}
      </div>

      {/* Category tag */}
      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {item.categoryName}
      </span>

      {/* Item name and price */}
      <div className="flex items-start justify-between gap-2 mt-1">
        <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
          {item.name}
        </h3>
        <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
          ${item.price}
        </span>
      </div>

      {/* Restaurant name */}
      <div className="flex items-center gap-1 mt-2">
        <Store className="w-3 h-3 text-gray-400" />
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {item.restaurantName}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
        <Link
          href={`/meals/${item.id}`}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Details
        </Link>
        <button
          onClick={handleAddToCart}
          className="ml-auto flex items-center gap-1 text-xs font-medium text-white bg-black dark:bg-white dark:text-black px-3 py-1.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition"
        >
          <ShoppingCart className="w-3 h-3" />
          Add
        </button>
      </div>
    </div>
  );
}
