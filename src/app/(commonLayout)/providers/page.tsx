import RestaurantCard from "@/components/modules/restaurantPage/restaurantCard";
import { providerService } from "@/services/provider.service";
import { Provider } from "@/types";

export default async function AllProvidersPage() {
  const { data, error } = await providerService.getAllProvider();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center rounded-xl">
        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
          <p className="text-red-500 dark:text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

if (data.length === 0) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-10">
        
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
            🍽️
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          No Restaurants Open
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          There are currently no restaurants available for ordering.
          Please check back later.
        </p>

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
