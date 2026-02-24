import Link from "next/link";
import { providerService } from "@/services/provider.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mealItem } from "@/types";
import MenuItemCard from "@/components/modules/homePage/itemCard";

export default async function ProviderWithMenu({
  params,
}: {
  params: Promise<{ providerId: string }>;
}) {
  const { providerId } = await params;

  const { data, error } = await providerService.getProviderWithMenu(providerId);

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
            <h1 className="text-4xl font-bold mb-2">{data.restaurantName}</h1>
            <p className="text-muted-foreground mb-3">{data.description}</p>
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.menu.map((item: mealItem) => (
            <MenuItemCard key={item.id} item={item}></MenuItemCard>
          ))}
        </div>
      </div>
    </div>
  );
}
