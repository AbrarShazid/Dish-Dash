import { orderService } from "@/services/order.service";
import { orderStatus } from "@/constants/orderStatus";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function MyOrder() {
  const { data, error } = await orderService.getMyOrder();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/50 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
              Something went wrong
            </h2>
            <p className="text-red-600 dark:text-red-300">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 ">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-12 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              No orders yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Time to explore some delicious meals!
            </p>
            <Link
              href="/restaurants"
              className="inline-block px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition"
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-gray-50 dark:bg-gray-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Orders
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {data.length} {data.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {data.map((order: any) => {
            const isActive =
              order.status !== orderStatus.delivered &&
              order.status !== orderStatus.cancelled;
            const canCancel = order.status === orderStatus.placed;

            return (
              <Link href={`/my-orders/${order.orderId}`} key={order.orderId}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Order #{order.orderId.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {order.status}
                    </span>
                  </div>

                  {/* Restaurant & Items */}
                  <div className="mb-3">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {order.restaurantName}
                    </p>
                    {order.items && order.items.length > 0 && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {order.items
                          .map(
                            (item: any) => `${item.quantity}x ${item.mealName}`,
                          )
                          .join(", ")}
                      </p>
                    )}
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${order.totalAmount}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-37.5">
                        📍 {order.deliveryAddress}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-medium ${
                        canCancel
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {canCancel ? "Cancel" : "Details"} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
