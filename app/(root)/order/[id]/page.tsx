import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import OrderDetailsTable from "./order-details-table";
import { OrderItem, ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Order Details",
};

type DBOrderItem = {
  name: string;
  slug: string;
  orderId: string;
  productId: string;
  qty: number;
  image: string;
  price: string;
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  // Redirect the user if they don't own the order
  if (order.userId !== session?.user.id && session?.user.role !== "admin") {
    return redirect("/unauthorized");
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        itemsPrice: Number(order.itemsPrice),
        shippingPrice: Number(order.shippingPrice),
        taxPrice: Number(order.taxPrice),
        totalPrice: Number(order.totalPrice),
        orderitems: order.orderitems.map((item: DBOrderItem) => ({
          ...item,
          price: Number(item.price),
        })),
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID! || "sb"}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
