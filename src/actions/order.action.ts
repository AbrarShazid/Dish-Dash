"use server";

import { orderService } from "@/services/order.service";

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { error } = await orderService.updateOrderStatus(orderId, status);

    if (error) return { error };
    return { success: true };
  } catch (err: any) {
    return { error: { message: "Something went wrong!" } };
  }
};
