import OrderStatusUpdate from "@/components/modules/order/orderStatusUpdate";
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

  return <OrderStatusUpdate order={data} />;
}
