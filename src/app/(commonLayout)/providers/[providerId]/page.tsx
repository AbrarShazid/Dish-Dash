import Link from "next/link";
import { providerService } from "@/services/provider.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ProviderWithMenu({
  params,
}: {
  params: Promise<{ providerId: string }>;
}) {
  const { providerId } = await params;

  const { data, error } =
    await providerService.getProviderWithMenu(providerId);

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      {/* 🔥 Restaurant Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {data.restaurantName}
            </h1>
            <p className="text-muted-foreground mb-3">
              {data.description}
            </p>
            <p className="text-sm text-muted-foreground">
              Owner: {data.restaurantOwner}
            </p>
          </div>

          <Badge variant={data.isOpen ? "default" : "destructive"}>
            {data.isOpen ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </div>

      {/* 🔥 Menu Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Menu</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.menu.map((item: any) => (
            <Card
              key={item.mealId}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="h-40 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground">
                    No Image
                  </span>
                )}
              </div>

              <CardContent className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-2">
                  {item.description || "No description available"}
                </p>

                <p className="font-bold text-amber-600 mb-4">
                  ৳ {item.price}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex gap-3">
                  <Button
                    className="flex-1"
                    disabled={!data.isOpen}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link
                      href={`/meals/${item.mealId}`}
                    >
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}