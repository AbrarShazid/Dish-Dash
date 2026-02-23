import Link from "next/link";
import {
  Beef,
  Pizza,
  Sandwich,
  Soup,
  Fish,
  Cake,
  Coffee,
  Salad,
} from "lucide-react";

const categories = [
  {
    name: "Biryani",
    icon: Beef,
    count: 24,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    name: "Kacchi",
    icon: Soup,
    count: 18,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    name: "Burgers",
    icon: Sandwich,
    count: 32,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    name: "Pizza",
    icon: Pizza,
    count: 27,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    name: "Seafood",
    icon: Fish,
    count: 15,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Desserts",
    icon: Cake,
    count: 21,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore dishes by your favorite cuisine
            </p>
          </div>
          <Link
            href="/meals"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            Browse By Category
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
          {categories.map((category, index) => {
            const Icon = category.icon;

            // Dark mode variants
            const darkBgColor =
              category.bgColor.replace("bg-", "dark:bg-") + "/20";
            const darkTextColor = category.color.replace("text-", "dark:text-");

            return (
              <Link
                key={index}
                href={`/meals?category=${category.name.toLowerCase()}`}
                className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md transition-all"
              >
                <div
                  className={`w-16 h-16 ${category.bgColor} ${darkBgColor} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon
                    className={`w-8 h-8 ${category.color} ${darkTextColor}`}
                  />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm text-center">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {category.count} items
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
