import { orderService } from "@/services/order.service";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MapPin,
  Store,
  User,
  Eye,
  ChevronRight,
  Package,
} from "lucide-react";
import Link from "next/link";


function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AllOrders() {
  const { data, error } = await orderService.getAllOrder();

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center">
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

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            No orders yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Orders will appear here once customers place them
          </p>
        </Card>
      </div>
    );
  }

  // Group orders by status for better organization
  const groupedOrders = data.reduce((acc: any, order: any) => {
    if (!acc[order.orderStatus]) {
      acc[order.orderStatus] = [];
    }
    acc[order.orderStatus].push(order);
    return acc;
  }, {});

  const statusOrder = [
    "PLACED",
    "PREPARING",
    "READY",
    "DELIVERED",
    "CANCELLED",
  ];

  return (
    <div className="space-y-8 md:mx-6 mx-4 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Orders
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Total {data.length} orders across all restaurants
          </p>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statusOrder.map((status) => {
          const count = groupedOrders[status]?.length || 0;
          return (
            <Card
              key={status}
              className="border-0 shadow-sm bg-white dark:bg-gray-900"
            >
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {status}
                </p>
                <p className={`text-2xl font-bold `}>{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.map((order: any) => (
          <Card
            key={order.orderId}
            className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Order #{order.orderId.slice(0, 8)}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <CalendarDays className="w-4 h-4" />
                    {formatDate(order.createdAt)}
                  </div>
                </div>
                <Badge className={` border`}>{order.orderStatus}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-4">
              {/* Customer & Restaurant */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    <span>Customer</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white ml-6">
                    {order.customerName}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Store className="w-4 h-4" />
                    <span>Restaurant</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white ml-6">
                    {order.restaurantName}
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Delivery Address</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6">
                  {order.orderDeliveryAddress}
                </p>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  ${order.orderAmount}
                </span>
              </div>
            </CardContent>

            <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4 ">
              <Button
                asChild
                variant="ghost"
                className="w-full hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Link
                  href={`/dashboard-admin/all-orders/${order.orderId}`}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
