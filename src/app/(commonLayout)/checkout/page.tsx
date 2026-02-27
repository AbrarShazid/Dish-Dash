"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Store } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createOrder } from "@/actions/order.action";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    providerName,
    getCartTotal,
    getCheckoutData,
    clearCart,
    isLoading,
  } = useCart();

  const [address, setAddress] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/meals");
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    setIsPlacing(true);

    const checkoutData = getCheckoutData();

    try {
      const payload = {
        deliveryAddress: address,
        providerId: checkoutData?.providerId,
        items: checkoutData?.items,
      };

      const { data, error } = await createOrder(payload);
      if (error || !data) {
        toast.error(error?.message || "Failed to place order");
        setIsPlacing(false);
        return;
      }

      clearCart();
      toast.success("Order placed successfully!");
      router.push("/my-orders");
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 rounded-xl">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Checkout
            </h1>

            <Card className="p-6 space-y-6">
              {/* Provider Info */}
              {providerName && (
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm">
                    Order from{" "}
                    <span className="font-semibold">{providerName}</span>
                  </span>
                </div>
              )}

              {/* Delivery Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold">Order Summary</h3>
                {items.map((item) => (
                  <div
                    key={item.mealId}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.mealName} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Total */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Total</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-orange-600 dark:text-orange-400">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Cash on delivery only</p>
              </div>

              <Button
                className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-black"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isPlacing || !address.trim()}
              >
                {isPlacing ? "Placing Order..." : "Place Order"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
