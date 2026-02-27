"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/actions/order.action";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { orderStatus } from "@/constants/orderStatus";
import Link from "next/link";
import { Star } from "lucide-react";
import { createReview } from "@/actions/review.action";

interface Meals {
  mealName: string;
  quantity: number;
  price: string;
  mealId: string;
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
  items: (Meals & { orderItemId?: string })[] | null;
}

interface Props {
  order: OrderPayload;
}

const statusColors: Record<string, string> = {
  PREPARING: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  READY:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  DELIVERED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  PLACED:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};

// Only PLACED orders can be cancelled
const canCancelOrder = (currentStatus: string): boolean => {
  return currentStatus === orderStatus.placed;
};

// Review Modal Component
function ReviewModal({
  isOpen,
  onClose,
  mealId,
  mealName,
  orderItemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  mealId: string;
  mealName: string;
  orderItemId?: string;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    const toastId = toast.loading("Submitting review...");

    startTransition(async () => {
      try {
        const res = await createReview({
          mealId,
          rating,
          comment: comment.trim() || undefined,
        });

        if (res?.error) {
          toast.error(res.error.message || "Failed to submit review", {
            id: toastId,
          });
          return;
        }

        toast.success("Review submitted successfully!", {
          id: toastId,
        });

        router.refresh();
        onClose();
      } catch (err: any) {
        toast.error(err.message || "Failed to submit review", {
          id: toastId,
        });
      }
    });
  };

  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Review {mealName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Share your experience with this dish
        </p>

        {/* Rating Stars */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                } transition-colors`}
              />
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review (optional)"
          rows={4}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white mb-4"
        />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderCancelAndReview({ order }: Props) {
  const [isPending, startTransition] = useTransition();
  const [selectedMeal, setSelectedMeal] = useState<{
    mealId: string;
    mealName: string;
    orderItemId?: string;
  } | null>(null);
  const router = useRouter();

  const canCancel = canCancelOrder(order.orderStatus);

  const handleCancel = () => {
    const toastId = toast.loading("Cancelling order...");

    startTransition(async () => {
      try {
        const res = await updateOrderStatus(
          order.orderId,
          orderStatus.cancelled,
        );
        if (res?.error) {
          toast.error(res.error.message || "Failed to cancel", {
            id: toastId,
          });
          return;
        }

        toast.success("Order cancelled successfully", {
          id: toastId,
        });

        router.refresh();
      } catch (err: any) {
        toast.error(err.message || "Failed to cancel order", {
          id: toastId,
        });
      }
    });
  };

  const isOrderActive =
    order.orderStatus !== orderStatus.delivered &&
    order.orderStatus !== orderStatus.cancelled;

  const isDelivered = order.orderStatus === orderStatus.delivered;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 rounded-3xl">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          href="/my-orders"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ← Back to My Orders
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Order #{order.orderId.slice(0, 8)}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <span
              className={`px-4 py-2 text-sm font-medium rounded-full ${statusColors[order.orderStatus]}`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Order Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Delivery Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customer
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.customerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Delivery Address
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.orderDeliveryAddress}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Restaurant Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Restaurant
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.restaurantName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Amount
                </p>
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  ${order.orderAmount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
            Order Items
          </h2>
          <div className="space-y-4">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b dark:border-gray-800 last:border-0 gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between sm:justify-start sm:gap-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.mealName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white sm:hidden">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end sm:gap-4">
                  <p className="font-semibold text-gray-900 dark:text-white hidden sm:block">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>

                  {/* Review Button - Only for delivered orders */}
                  {isDelivered && (
                    <button
                      onClick={() => {
                        setSelectedMeal({
                          mealId: item.mealId,
                          mealName: item.mealName,
                          orderItemId: (item as any).orderItemId,
                        });
                      }}
                      className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      Write Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="mt-4 pt-4 border-t dark:border-gray-800 flex justify-between items-center">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              ${order.orderAmount}
            </span>
          </div>
        </div>

        {/* Cancel Action - Only shown if order can be cancelled */}
        {canCancel && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Cancel Order
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  You can cancel this order before the restaurant starts
                  preparing it.
                </p>
              </div>
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          </div>
        )}

        {/* Order Status Message for non-active orders */}
        {!isOrderActive && !isDelivered && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border dark:border-gray-800 p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              This order is {order.orderStatus.toLowerCase()} and cannot be
              modified.
            </p>
          </div>
        )}

        {/* Review Modal */}
        {selectedMeal && (
          <ReviewModal
            isOpen={!!selectedMeal}
            onClose={() => setSelectedMeal(null)}
            mealId={selectedMeal.mealId}
            mealName={selectedMeal.mealName}
            orderItemId={selectedMeal.orderItemId}
          />
        )}
      </div>
    </div>
  );
}
