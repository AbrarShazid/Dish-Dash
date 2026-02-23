// components/home/HeroSection.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="block">Discover & Order</span>
              <span className="block text-orange-600 dark:text-orange-400">
                Delicious Meals
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Explore hundreds of dishes from top restaurants in your area. Fast
              delivery, easy ordering.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/meals"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Browse Meals
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/providers"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                Restaurants
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  500+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Restaurants
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  10k+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  30min
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Avg. Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid with Overlays */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-4">
              {/* First column */}
              <div className="space-y-4">
                <div className="relative rounded-2xl aspect-square overflow-hidden group">
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <Image
                    src="/images/home_1.webp"
                    alt="Delicious burger"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    quality={80}
                  />
                </div>
                <div className="relative rounded-2xl aspect-square overflow-hidden group">
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <Image
                    src="/images/home_2.webp"
                    alt="Tasty pizza"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    quality={80}
                  />
                </div>
              </div>

              {/* Second column with offset */}
              <div className="space-y-4 mt-8">
                <div className="relative rounded-2xl aspect-square overflow-hidden group">
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <Image
                    src="/images/home_3.webp"
                    alt="Fresh salad"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    quality={80}
                  />
                </div>
                <div className="relative rounded-2xl aspect-square overflow-hidden group">
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <Image
                    src="/images/home_4.webp"
                    alt="Japanese sushi"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    quality={80}
                  />
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xl">
                    ✓
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    On orders over BDT 500
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}