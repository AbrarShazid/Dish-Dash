import { Calendar, Newspaper, Download, Award, Users, TrendingUp, Globe, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function PressPage() {
  const pressReleases = [
    {
      date: "March 15, 2026",
      title: "DishDash Expands to 10 New Cities Across Bangladesh",
      excerpt: "Leading food delivery platform DishDash announces major expansion, bringing services to 10 new cities including Rajshahi, Khulna, and Barisal.",
      category: "Expansion",
      image: "🏙️",
      link: "/press/expansion-2026",
    },
    {
      date: "February 28, 2026",
      title: "DishDash Launches 'Super DishDash' Subscription Service",
      excerpt: "New subscription model offers unlimited free delivery and exclusive discounts for loyal customers across Bangladesh.",
      category: "Product Launch",
      image: "⭐",
      link: "/press/super-DishDash-launch",
    },
    {
      date: "January 10, 2026",
      title: "DishDash Raises $50M in Series B Funding",
      excerpt: "Investment led by Sequoia Capital to fuel growth and technology development in the Bangladeshi food tech sector.",
      category: "Funding",
      image: "💰",
      link: "/press/funding-2026",
    },
    {
      date: "December 5, 2025",
      title: "DishDash Partners with 500+ New Restaurants",
      excerpt: "Major partnership expansion brings diverse culinary options to DishDash users across all service areas.",
      category: "Partnership",
      image: "🤝",
      link: "/press/restaurant-partners",
    },
    {
      date: "November 20, 2025",
      title: "DishDash Wins 'Best Food Delivery App' Award",
      category: "Award",
      excerpt: "Recognized at the Bangladesh Digital Innovation Awards for excellence in user experience and service quality.",
      image: "🏆",
      link: "/press/award-2025",
    },
    {
      date: "October 8, 2025",
      title: "DishDash Launches Eco-Friendly Packaging Initiative",
      excerpt: "New sustainability program introduces biodegradable packaging options for partner restaurants.",
      category: "Sustainability",
      image: "🌱",
      link: "/press/eco-friendly",
    },
  ];


  const coverage = [
    {
      outlet: "The Daily Star",
      title: "How DishDash is Revolutionizing Food Delivery in Bangladesh",
      date: "February 1, 2026",
      image: "📰",
      link: "#",
    },
    {
      outlet: "Dhaka Tribune",
      title: "Food Tech Boom: DishDash Leads the Charge",
      date: "January 15, 2026",
      image: "📱",
      link: "#",
    },
    {
      outlet: "Business Standard",
      title: "DishDash's Journey to Becoming Bangladesh's Top Food App",
      date: "December 10, 2025",
      image: "💼",
      link: "#",
    },
  ];

  const leadership = [
    {
      name: "Abrar Shazid",
      position: "CEO & Co-founder",
      bio: "Former tech executive with 15+ years in e-commerce and logistics.",
      image: "👨‍💼",
    },
    {
      name: "Fatima Khan",
      position: "COO",
      bio: "Operations expert with experience scaling delivery networks across South Asia.",
      image: "👩‍💼",
    },
    {
      name: "Shahid Hasan",
      position: "CTO",
      bio: "Tech leader specializing in scalable platforms and AI-driven solutions.",
      image: "👨‍💻",
    },
    {
      name: "Nusrat Jahan",
      position: "CMO",
      bio: "Marketing strategist with a track record of building beloved consumer brands.",
      image: "👩‍🎤",
    },
  ];

  const stats = [
    { label: "Active Users", value: "5M+", icon: Users },
    { label: "Restaurant Partners", value: "10,000+", icon: Award },
    { label: "Cities Covered", value: "50+", icon: Globe },
    { label: "Monthly Orders", value: "2M+", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">📰</div>
          <div className="absolute bottom-10 right-10 text-8xl">🎙️</div>
        </div>
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            Press & Media
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            DishDash in the News
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Latest updates, press releases, and media resources from Bangladesh's leading food delivery platform.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-3">
                  <stat.icon className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-amber-600">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Latest Press Releases</h2>
            <Button variant="outline" className="gap-2">
              <Newspaper className="h-4 w-4" />
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressReleases.map((release) => (
              <Link href={release.link} key={release.title}>
                <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all p-6 h-full flex flex-col">
                  <div className="text-4xl mb-4">{release.image}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {release.category}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {release.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-600 transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
                    {release.excerpt}
                  </p>
                  <span className="text-amber-600 text-sm font-medium group-hover:gap-2 transition-all inline-flex items-center gap-1">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* In the News */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">In the News</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {coverage.map((item) => (
              <div key={item.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-3">{item.image}</div>
                <p className="text-sm text-gray-500 mb-2">{item.outlet} • {item.date}</p>
                <h3 className="font-semibold mb-4">{item.title}</h3>
                <Link href={item.link} className="text-amber-600 text-sm hover:underline">
                  Read Article →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Leadership Team</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            Meet the people behind DishDash's success
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person) => (
              <div key={person.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                <div className="text-5xl mb-4">{person.image}</div>
                <h3 className="font-semibold text-lg">{person.name}</h3>
                <p className="text-amber-600 text-sm mb-3">{person.position}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <Mic className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Media Inquiries</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For press-related questions, interview requests, or additional information
            </p>
            <div className="space-y-2">
              <p className="font-medium">Sarah Rahman</p>
              <p className="text-gray-600 dark:text-gray-400">Head of Communications</p>
              <p className="text-amber-600">press@dishdash.com</p>
              <p className="text-gray-600 dark:text-gray-400">+880-1904382308</p>
            </div>
            <Button className="mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              Contact Press Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}