"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/actions/order.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { orderStatus } from "@/constants/orderStatus";

interface Meals {
  mealName: string;
  quantity: number;
  price: string;
}

interface OrderPayload {
  orderId: string;
  orderStatus: string;
  orderAmount: string;
  orderDeliveryAddress: string;
  createdAt: Date;
  updatedAt: Date;
  restaurantName: string;
  customerName: string;
  items: Meals[] | null;
}

interface Props {
  order: OrderPayload;
}

const statusColors: Record<string, string> = {
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  PLACED: "bg-yellow-100 text-yellow-800",
};


const getNextPossibleStatuses = (currentStatus: string): string[] => {
  switch (currentStatus) {
    case orderStatus.placed:
      return [orderStatus.preparing, orderStatus.cancelled];
    case orderStatus.preparing:
      return [orderStatus.ready]; 
    case orderStatus.ready:
      return [orderStatus.delivered]; 
    case orderStatus.delivered:
    case orderStatus.cancelled:
      return []; 
    default:
      return [];
  }
};

export default function OrderStatusUpdate({ order }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const possibleNextStatuses = getNextPossibleStatuses(order.orderStatus);

  const handleUpdate = (status: string) => {
    const toastId = toast.loading(`Updating order status to ${status}...`);

    startTransition(async () => {
      try {
        const res = await updateOrderStatus(order.orderId, status);
        if (res?.error) {
          toast.error(res.error.message || "Failed to update", {
            id: toastId,
          });
          return;
        }

        toast.success(`Order marked as ${status}`, {
          id: toastId,
        });

        router.refresh();
      } catch (err: any) {
      
        toast.error(err.message || "Failed to update status", {
          id: toastId,
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Order #{order.orderId}</h1>

        <span
          className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${
            statusColors[order.orderStatus]
          }`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Order Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 shadow-sm space-y-2">
          <h2 className="font-semibold text-lg">Customer Info</h2>
          <p>
            <strong>Name:</strong> {order.customerName}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.orderDeliveryAddress}
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm space-y-2">
          <h2 className="font-semibold text-lg">Restaurant Info</h2>
          <p>
            <strong>Restaurant:</strong> {order.restaurantName}
          </p>
          <p>
            <strong>Total:</strong> ${order.orderAmount}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="border rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Items</h2>

        {order.items?.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <div>
              <p className="font-medium">{item.mealName}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${item.price}</p>
          </div>
        ))}
      </div>

      {/* Status Actions - Only show if there are possible next statuses */}
      {possibleNextStatuses.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Update Status</h2>

          <div className="flex flex-wrap gap-3">
            {possibleNextStatuses.map((status) => (
              <button
                key={status}
                disabled={isPending}
                onClick={() => handleUpdate(status)}
                className={`px-4 py-2 rounded text-white transition ${
                  status === "CANCELLED"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-black hover:bg-gray-800"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPending ? "Updating..." : `Mark as ${status}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show message when order is in final state */}
      {(order.orderStatus === orderStatus.delivered ||
        order.orderStatus === orderStatus.cancelled) && (
        <div className="bg-gray-50 border rounded-xl p-5 text-center text-gray-600">
          This order is {order.orderStatus.toLowerCase()} and cannot be
          modified.
        </div>
      )}
    </div>
  );
}
