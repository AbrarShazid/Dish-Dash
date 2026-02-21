import Link from "next/link";
import { providerService } from "@/services/provider.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Provider {
  providerId: string;
  restaurantName: string;
  description: string;
  image: string | null;
  isOpen: boolean;
  createdAt: string;
  restauranOwner: string;
}

export default async function AllProvidersPage() {
  const { data, error } = await providerService.getAllProvider();

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      {/* Page Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">All Restaurants</h1>
        <p className="text-muted-foreground">
          Discover amazing food providers near you
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((provider: Provider) => (
          <Card
            key={provider.providerId}
            className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="h-48 w-full bg-gray-200 dark:bg-gray-800">
              {provider.image ? (
                <img
                  src={provider.image}
                  alt={provider.restaurantName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>

            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <h2 className="text-xl font-semibold">
                  {provider.restaurantName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Owner: {provider.restauranOwner}
                </p>
              </div>

              <Badge variant={provider.isOpen ? "default" : "destructive"}>
                {provider.isOpen ? "Open" : "Closed"}
              </Badge>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {provider.description}
              </p>

              <div className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/providers/${provider.providerId}`}>
                    View Menu
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
