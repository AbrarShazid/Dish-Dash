
import OrderCancelAndReview from "@/components/modules/order/orderCancelAndReview";
import { orderService } from "@/services/order.service";

export default async function OrderDetails({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = await params;

  const { data, error } = await orderService.getOrderDetails(orderId);

  if (error || !data) {
    return <div>Order not found</div>;
  }

  return <OrderCancelAndReview order={data} />;
}
