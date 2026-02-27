
import OrderStatusUpdate from "@/components/modules/order/orderStatusUpdate";

import { orderService } from "@/services/order.service";

export default async function OrderDetails({
  params,
}: {
  params: { orderID: string };
}) {
  const { orderID } = await params;
  const { data, error } = await orderService.getOrderDetails(orderID);
  if (error || !data) {
    return <div>Order not found</div>;
  }
  return (
    <div>
      <OrderStatusUpdate order={data} />
    </div>
  );
}
