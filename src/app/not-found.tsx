import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, ChefHat } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex  items-center justify-center px-4  bg-gray-50 dark:bg-gray-800">
      <div className="text-center max-w-2xl mx-auto">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="text-8xl mb-4 animate-bounce">🍳</div>
          <div className="absolute -top-4 -right-4">
            <ChefHat className="h-12 w-12 text-amber-600 opacity-50" />
          </div>
        </div>

        {/* Error Code */}
        <div className="text-6xl font-bold text-amber-600 dark:text-amber-500 mb-2">
          404
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold mb-3  text-gray-800 dark:text-gray-50">
          This page is still cooking
        </h2>

        <p className="text-gray-800 dark:text-gray-200 text-lg mb-8">
          Our chefs are working hard to prepare this page. In the meantime, why
          not explore our delicious menu?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/meals">Browse Meals</Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="gap-2 bg-linear-to-r from-amber-600 to-orange-600"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
