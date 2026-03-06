import { providerService } from "@/services/provider.service";
import { mealItem } from "@/types";
import MenuItemCard from "@/components/modules/homePage/itemCard";
import { ErrorState } from "@/components/layout/ErrorState";
import { Clock, Store, User } from "lucide-react";

export default async function ProviderWithMenu({
  params,
}: {
  params: Promise<{ providerId: string }>;
}) {
  const { providerId } = await params;

  const { data, error } = await providerService.getProviderWithMenu(providerId);

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Restaurant Header  */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground">
                  {data.restaurantName}
                </h1>
                {data.description && (
                  <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    {data.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{data.restaurantOwner}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span
                    className={
                      data.isOpen
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {data.isOpen ? "Open Now" : "Closed"}
                  </span>
                </div>
              </div>
            </div>

            {/*  status indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  data.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {data.isOpen ? "Accepting Orders" : "Currently Closed"}
              </span>
            </div>
          </div>
        </div>

        {/* Menu  */}
        <div className="space-y-8">
          {/* Section header  */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-medium text-foreground">Menu</h2>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">
              {data.menu.length} {data.menu.length === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Menu  */}
          {data.menu.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.menu.map((item: mealItem) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Store className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">
                No menu items available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
