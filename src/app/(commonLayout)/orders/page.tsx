import { providerService } from "@/services/provider.service";
import Link from "next/link";

function getStatusColor(status: string) {
  switch (status) {
    case "PLACED":
      return "bg-yellow-100 text-yellow-700";
    case "PREPARING":
      return "bg-blue-100 text-blue-700";
    case "READY":
      return "bg-purple-100 text-purple-700";
    case "DELIVERED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function ProviderOrder() {
  const { data, error } = await providerService.getProviderOrder();

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-gray-500">No orders found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((order: any) => (
          <div
            key={order.orderId}
            className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold">
                Order #{order.orderId.slice(0, 8)}
              </p>

              <span
                className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <p>Customer: {order.customerName}</p>
              <p>Total: ${order.totalAmount}</p>
              <p>Address: {order.deliveryAddress}</p>
            </div>

            <Link
              href={`/orders/${order.orderId}`}
              className="inline-block mt-4 text-sm font-medium text-black underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}