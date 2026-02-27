
"use client"
import {
  Star,
  Store,
  Tag,
  ShoppingCart,
  ChevronLeft,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

export default function MaelDetailsClient({ item }: any) {

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

    
  const avgRating = item.reviews?.length
    ? (
        item.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        item.reviews.length
      ).toFixed(1)
    : "No ratings";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 rounded-xl ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/meals"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to meals
        </Link>

        {/* Main content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl opacity-30">🍽️</span>
                  </div>
                )}
              </div>

              {/* Availability badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                    item.isAvailable
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Currently Unavailable"}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.name}
                </h1>
                {item.description && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between py-4 border-y border-gray-100 dark:border-gray-800">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Price
                  </span>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    ${item.price}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Rating
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(Number(avgRating) || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {avgRating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({item.reviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Category and Provider */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Tag className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Category
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {item.categoryName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Store className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Restaurant
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.providerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Orders
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.totalOrders} orders
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white"
                  disabled={!item.isAvailable}
                    onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <Link href={`/providers/${item.providerId}`} className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Store className="w-5 h-5 mr-2" />
                    View Restaurant
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Reviews Section */}

          {item.reviews && item.reviews.length > 0 && (
            <div className="border-t border-gray-100 dark:border-gray-800 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Customer Reviews
              </h2>
              <div className="space-y-4">
                {item.reviews.map((review: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        {review.userImage ? (
                          <img
                            src={review.userImage}
                            alt={review.userName}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-orange-100 dark:bg-orange-900/30">
                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                              {review.userName?.charAt(0) || "U"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {review.userName || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Comment */}
                    {review.comment && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        "{review.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
