import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Provider } from "@/types";
import { Clock, ShoppingBag, Store, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RestaurantCard({ provider }: { provider: Provider }) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shrink-0">
        {provider.image ? (
          <Image
            fill
            unoptimized
            src={provider.image}
            alt={provider.restaurantName}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Store className="w-16 h-16 text-gray-400 dark:text-gray-600" />
          </div>
        )}

        {/* Join Date */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            <span>
              Since{" "}
              {new Date(provider.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col h-full">
        {/* Restaurant Info - stays at top */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {provider.restaurantName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            by {provider.restauranOwner}
          </p>
        </div>

        {/* Description - flex-1 pushes button down */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1 mt-2">
          {provider.description || "No description available"}
        </p>

        {/* Stats - stays above button */}
        <div className="flex items-center gap-4 pt-2 mt-auto">
          <div className="flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {provider.totalItem} items
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {provider.totalOrderServed} orders
            </span>
          </div>
        </div>

        {/* Action Button - always at bottom */}
        <Button
          asChild
          className="w-full mt-4 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white"
        >
          <Link href={`/providers/${provider.providerId}`}>View Menu</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
