// components/home/HowItWorks.tsx
import { Search, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Search,
    title: "Browse Meals",
    description: "Explore hundreds of dishes from top restaurants in your area",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    icon: ShoppingCart,
    title: "Place Order",
    description: "Add items to cart and checkout with just a few clicks",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your food delivered hot and fresh to your doorstep",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 mt-4 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            How DishDash Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three simple steps to satisfy your cravings
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="relative flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-10 h-10 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: Add a subtle CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ready to start?{" "}
            <Link
              href="/meals"
              className="text-orange-600 dark:text-orange-400 font-medium hover:underline"
            >
              Browse meals now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
