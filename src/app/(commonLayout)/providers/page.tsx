import RestaurantCard from "@/components/modules/restaurantPage/restaurantCard";
import { providerService } from "@/services/provider.service";
import { Provider } from "@/types";

export default async function AllProvidersPage() {
  const { data, error } = await providerService.getAllProvider();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
          <p className="text-red-500 dark:text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Restaurants
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover amazing food providers near you and explore their delicious
            menus
          </p>
        </div>

        {/* Restaurants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          {data?.map((provider: Provider) => (
            <RestaurantCard key={provider.providerId} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
}
