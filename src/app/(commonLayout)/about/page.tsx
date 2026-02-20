import {
  Users,
  Award,
  Clock,
  Heart,
  ChefHat,
  Truck,
  Leaf,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  const stats = [
    { value: "10,000+", label: "Restaurants", icon: ChefHat },
    { value: "5M+", label: "Happy Customers", icon: Users },
    { value: "50+", label: "Cities", icon: Award },
    { value: "30 min", label: "Avg. Delivery", icon: Clock },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We partner with only the best restaurants to ensure every meal meets our high standards.",
      icon: Star,
    },
    {
      title: "Fast Delivery",
      description:
        "Our super-fast delivery ensures your food arrives hot and fresh at your doorstep.",
      icon: Truck,
    },
    {
      title: "Fresh Ingredients",
      description:
        "We prioritize freshness in every order, from restaurant to your table.",
      icon: Leaf,
    },
    {
      title: "Customer Love",
      description:
        "Your satisfaction is our priority. We go above and beyond for every customer.",
      icon: Heart,
    },
  ];

  const services = [
    {
      title: "Super-Fast Delivery",
      description:
        "Get your favorite meals delivered to your doorstep in 30 minutes or less.",
      icon: Truck,
      color: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Food Pick-up",
      description:
        "Order ahead and skip the line with our convenient pick-up service.",
      icon: Clock,
      color: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Dine-in Experience",
      description:
        "Enjoy exclusive deals and reservations at partner restaurants.",
      icon: Users,
      color: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Flowers Delivery",
      description:
        "Send love with our flower delivery service for special occasions.",
      icon: Heart,
      color: "bg-pink-100 dark:bg-pink-900/20",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl opacity-55">🍽️</div>
          <div className="absolute bottom-20 right-10 text-8xl opacity-55">
            🥘
          </div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            About DishDash
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Bangladesh's leading food delivery app connecting you with the best
            restaurants and culinary experiences across the nation.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="lg:py-16 py-4 ">
        <div className=" mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Founded in 2020, DishDash began with a simple mission: to bring
                the diverse and rich culinary traditions of Bangladesh to every
                doorstep. What started as a small delivery service in Dhaka has
                now grown into the nation's most trusted food delivery platform.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Today, we partner with over 10,000 restaurants across 50+
                cities, serving millions of happy customers. Our commitment to
                quality, speed, and customer satisfaction has made us the go-to
                choice for food lovers across Bangladesh.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/providers"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Join As A Provider
                </Link>
                <Link href={"/contact"} className="border-2 p-2 rounded-md border-[#f2550083]">Contact Us</Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src="/about_us.png" alt="" className="object-cover" />
              {/* Placeholder for actual image */}
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex p-3 bg-white dark:bg-gray-800 rounded-full shadow-md mb-4">
                  <stat.icon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We offer a variety of services to make your food experience
            delightful and convenient
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}
                >
                  <service.icon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to explore delicious food?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join millions of food lovers who trust DishDash for their daily
              meals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/meals"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-2 rounded-md"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
