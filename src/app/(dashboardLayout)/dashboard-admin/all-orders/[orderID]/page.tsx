import { orderService } from "@/services/order.service";

interface Meals {
  mealName: string;
  quantity: number;
  price: string;
}

const statusColors: Record<string, string> = {
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  PLACED: "bg-yellow-100 text-yellow-800",
};

export default async function OrderDetails({
  params,
}: {
  params: { orderID: string };
}) {
  const { orderID } = await params;
  const { data, error } = await orderService.getOrderDetails(orderID);
  if (error || !data) {
    return (
      <div className="text-center dark:text-gray-50 text-gray-800">
        Order not found
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Order #{data.orderId}</h1>

        <span
          className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${
            statusColors[data.orderStatus]
          }`}
        >
          {data.orderStatus}
        </span>
      </div>

      {/* Order Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 shadow-sm space-y-2">
          <h2 className="font-semibold text-lg">Customer Info</h2>
          <p>
            <strong>Name:</strong> {data.customerName}
          </p>
          <p>
            <strong>Delivery Address:</strong> {data.orderDeliveryAddress}
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm space-y-2">
          <h2 className="font-semibold text-lg">Restaurant Info</h2>
          <p>
            <strong>Restaurant:</strong> {data.restaurantName}
          </p>
          <p>
            <strong>Total:</strong> ${data.orderAmount}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="border rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Items</h2>

        {data.items?.map((item: Meals, index: any) => (
          <div key={index} className="flex justify-between border-b py-2">
            <div>
              <p className="font-medium">{item.mealName}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${item.price}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border rounded-xl p-5 text-center text-gray-600">
        This order is {data.orderStatus.toLowerCase()} and cannot be modified by
        admin.
      </div>
    </div>
  );
}
