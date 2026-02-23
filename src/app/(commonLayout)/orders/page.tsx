import { providerService } from "@/services/provider.service";
import { orderStatus } from "@/constants/orderStatus";
import Link from "next/link";

function getStatusColor(status: string) {
  switch (status) {
    case orderStatus.placed:
      return "bg-yellow-100 text-yellow-700";
    case orderStatus.preparing:
      return "bg-blue-100 text-blue-700";
    case orderStatus.ready:
      return "bg-purple-100 text-purple-700";
    case orderStatus.delivered:
      return "bg-green-100 text-green-700";
    case orderStatus.cancelled:
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function ProviderOrder() {
  const { data, error } = await providerService.getProviderOrder();

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
          {error.message}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No orders found</p>
          <p className="text-gray-400 text-sm mt-2">
            When customers place orders, they will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="text-sm text-gray-500">
          Total: {data.length} orders
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((order: any) => (
          <div
            key={order.orderId}
            className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold text-gray-900">
                  Order #{order.orderId.slice(0, 8)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {order.customerName}
              </p>
              <p>
                <span className="font-medium">Total:</span> ${order.totalAmount}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {order.deliveryAddress}
              </p>
              {order.items && (
                <p>
                  <span className="font-medium">Items:</span>{" "}
                  {order.items.length} item(s)
                </p>
              )}
            </div>

            {/* Single button to go to order details page for status update */}
            <Link
              href={`/orders/${order.orderId}`}
              className="inline-block w-full mt-4 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg text-center hover:bg-gray-800 transition"
            >
              Update Status →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}