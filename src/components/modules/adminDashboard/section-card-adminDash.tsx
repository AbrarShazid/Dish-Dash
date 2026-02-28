import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { analyticsService } from "@/services/analytics.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function SectionCardAdminDash() {
  const { data, error } = await analyticsService.getAdminAnalytics();

if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {error.message}
          </p>
          <Button asChild>
            <Link href="/dashboard/admin">Go Back</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* TOTAL USER */}
      <Card className="@container/card bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalUser}
          </CardTitle>
          <CardAction />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Registered platform users
          </div>
          <div className="text-muted-foreground">
            All-time customer accounts created
          </div>
        </CardFooter>
      </Card>

      {/* TOTAL RESTAURANT */}
      <Card className="@container/card bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
        <CardHeader>
          <CardDescription>Total Restaurants</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalRestaurant}
          </CardTitle>
          <CardAction />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Onboarded food providers</div>
          <div className="text-muted-foreground">
            Restaurants registered in the system
          </div>
        </CardFooter>
      </Card>

      {/* TOTAL ITEMS */}
      <Card className="@container/card bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
        <CardHeader>
          <CardDescription>Total Menu Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalItem}
          </CardTitle>
          <CardAction />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Meals listed on platform</div>
          <div className="text-muted-foreground">
            Available items across all restaurants
          </div>
        </CardFooter>
      </Card>

      {/* TOTAL ORDERS */}
      <Card className="@container/card bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalOrders}
          </CardTitle>
          <CardAction />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Orders placed successfully
          </div>
          <div className="text-muted-foreground">
            Completed and processing orders combined
          </div>
        </CardFooter>
      </Card>

      {/* TOTAL REVENUE */}
      <Card className="@container/card bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $ {data.totalRevenue}
          </CardTitle>
          <CardAction />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Revenue generated from orders
          </div>
          <div className="text-muted-foreground">
            Gross earnings across all restaurants
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
